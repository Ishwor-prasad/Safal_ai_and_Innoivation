-- SAFAL AI Platform - Encrypted Digital Certificates
-- Date: 2026-09-20
--
-- The repo and the Supabase anon key are public, so every stored row is
-- AES-GCM encrypted client-side before it ever touches the database.
-- ciphertext (base64url) + random salt + IV are stored here; the keys are
-- derived in the browser and never leave it.

-- ============================================================================
-- 1. CERTIFICATE BATCHES (admin "sheets" encrypted with an admin passphrase)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.certificate_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    admin_payload TEXT NOT NULL,
    salt TEXT NOT NULL,
    iv TEXT NOT NULL,
    cert_count INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_certificate_batches_created_at
    ON public.certificate_batches(created_at DESC);

ALTER TABLE public.certificate_batches ENABLE ROW LEVEL SECURITY;

-- Anyone may fetch rows (all payloads are encrypted with the admin passphrase).
CREATE POLICY "Allow public select certificate batches"
    ON public.certificate_batches
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Admin publishes through the browser using the anon key.
CREATE POLICY "Allow public insert certificate batches"
    ON public.certificate_batches
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated manage certificate batches"
    ON public.certificate_batches
    FOR UPDATE
    TO authenticated
    USING (true);

-- ============================================================================
-- 2. CERTIFICATES (one row per trainee, encrypted with that trainee's code)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    batch_id UUID REFERENCES public.certificate_batches(id) ON DELETE CASCADE,
    code_hash TEXT NOT NULL UNIQUE,
    payload TEXT NOT NULL,
    salt TEXT NOT NULL,
    iv TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_certificates_code_hash ON public.certificates(code_hash);
CREATE INDEX IF NOT EXISTS idx_certificates_batch_id ON public.certificates(batch_id);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Verification lookups happen with the public anon key; rows only reveal a
-- SHA-256 hash of the code plus ciphertext, so nothing is readable.
CREATE POLICY "Allow public select certificates"
    ON public.certificates
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public insert certificates"
    ON public.certificates
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated manage certificates"
    ON public.certificates
    FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete certificates"
    ON public.certificates
    FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- 3. AUTOMATIC UPDATED_AT TRIGGER FOR BATCHES
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trigger_update_certificate_batches_updated_at
BEFORE UPDATE ON public.certificate_batches
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();