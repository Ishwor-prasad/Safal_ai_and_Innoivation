-- SAFAL AI Platform - Initial Supabase Production Database Schema & RLS Policies
-- Date: 2026-07-26

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. CONSULTATION BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    organization TEXT NOT NULL,
    sector TEXT NOT NULL CHECK (sector IN ('Education', 'Enterprise', 'Government', 'NGO/INGO')),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    automation_status TEXT NOT NULL DEFAULT 'pending' CHECK (automation_status IN ('pending', 'triggered', 'processed', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_email ON public.consultation_bookings(email);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_created_at ON public.consultation_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_status ON public.consultation_bookings(status);

-- RLS Policies
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for consultation bookings" 
    ON public.consultation_bookings 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff select consultation bookings" 
    ON public.consultation_bookings 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Allow authenticated staff update consultation bookings" 
    ON public.consultation_bookings 
    FOR UPDATE 
    TO authenticated 
    USING (true);

-- ============================================================================
-- 2. CONTACT INQUIRIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    automation_status TEXT NOT NULL DEFAULT 'pending' CHECK (automation_status IN ('pending', 'triggered', 'processed', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON public.contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries(created_at DESC);

-- RLS Policies
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for contact inquiries" 
    ON public.contact_inquiries 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff select contact inquiries" 
    ON public.contact_inquiries 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- ============================================================================
-- 3. COURSE ENROLLMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    selected_batch_id TEXT,
    preferred_schedule TEXT,
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'confirmed', 'completed', 'dropped')),
    automation_status TEXT NOT NULL DEFAULT 'pending' CHECK (automation_status IN ('pending', 'triggered', 'processed', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_course_enrollments_email ON public.course_enrollments(email);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON public.course_enrollments(course_id);

-- RLS Policies
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for course enrollments" 
    ON public.course_enrollments 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff select course enrollments" 
    ON public.course_enrollments 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- ============================================================================
-- 4. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- RLS Policies
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for newsletter subscribers" 
    ON public.newsletter_subscribers 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff select newsletter subscribers" 
    ON public.newsletter_subscribers 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- ============================================================================
-- 5. TEACHER AI LOGS TABLE (ANALYTICS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.teacher_ai_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    grade TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    language TEXT DEFAULT 'English',
    focus_area TEXT,
    is_simulated BOOLEAN DEFAULT false,
    generated_doc TEXT
);

-- RLS Policies
ALTER TABLE public.teacher_ai_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for teacher ai logs" 
    ON public.teacher_ai_logs 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- ============================================================================
-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trigger_update_consultation_bookings_updated_at
BEFORE UPDATE ON public.consultation_bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_contact_inquiries_updated_at
BEFORE UPDATE ON public.contact_inquiries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_course_enrollments_updated_at
BEFORE UPDATE ON public.course_enrollments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
