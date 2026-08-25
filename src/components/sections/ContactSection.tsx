import React from "react";
import { Mail, Phone, MapPin, Facebook, CheckCircle2, Send } from "lucide-react";

interface ContactSectionProps {
  contactName: string;
  setContactName: (val: string) => void;
  contactOrg: string;
  setContactOrg: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  contactPhone: string;
  setContactPhone: (val: string) => void;
  contactMessage: string;
  setContactMessage: (val: string) => void;
  contactSubmitting: boolean;
  contactSuccessMsg: string | null;
  setContactSuccessMsg: (msg: string | null) => void;
  handleContactSubmit: (e: React.FormEvent) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactName,
  setContactName,
  contactOrg,
  setContactOrg,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  contactMessage,
  setContactMessage,
  contactSubmitting,
  contactSuccessMsg,
  setContactSuccessMsg,
  handleContactSubmit
}) => {
  const inputClass =
    "w-full bg-white border border-gray-200 rounded-lg px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-colors placeholder:text-gray-400";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1.5";

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-t border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* Info column */}
          <div className="xl:col-span-5 space-y-9">
            <div className="space-y-4">
              <span className="eyebrow">Contact</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Let's talk about your project
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Whether it's AI training for your team, a custom automation, or a partnership — we usually reply within one working day.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-brand-muted border border-brand-border text-brand flex items-center justify-center rounded-lg shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Email</span>
                  <a href="mailto:info@safalai.com.np" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                    info@safalai.com.np
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-brand-muted border border-brand-border text-brand flex items-center justify-center rounded-lg shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Phone</span>
                  <a href="tel:+9779869627250" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                    +977 986-9627250
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-brand-muted border border-brand-border text-brand flex items-center justify-center rounded-lg shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Office</span>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    Level 3, Star Complex, Putalisadak, Kathmandu
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-medium text-gray-500 block mb-3">Follow us</span>
              <div className="flex gap-2.5" id="social-links-grid">
                {[
                  { href: "https://www.facebook.com/profile.php?id=100083926890788", Icon: Facebook, label: "Facebook" }
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="h-10 w-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="xl:col-span-7 bg-surface-soft rounded-xl p-6 sm:p-8 lg:p-10 border border-gray-200 w-full">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Send us a message
            </h3>

            {contactSuccessMsg ? (
              <div className="bg-brand-muted border border-brand-border p-6 rounded-xl space-y-3" id="contact-success-box">
                <CheckCircle2 className="h-8 w-8 text-brand" />
                <h4 className="font-display text-base font-semibold text-gray-900">Message sent</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {contactSuccessMsg}
                </p>
                <button
                  onClick={() => setContactSuccessMsg(null)}
                  className="text-xs font-semibold text-brand hover:text-brand-dark underline cursor-pointer mt-1 block bg-transparent border-none"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Binod Acharya"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="contact-org">Organization</label>
                    <input
                      id="contact-org"
                      type="text"
                      required
                      value={contactOrg}
                      onChange={(e) => setContactOrg(e.target.value)}
                      placeholder="e.g. Elite Academy"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@organization.org"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="contact-phone">Phone (optional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="contact-msg">How can we help?</label>
                  <textarea
                    id="contact-msg"
                    rows={5}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us briefly about your team and what you'd like to achieve."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full sm:w-auto bg-brand hover:bg-brand-dark disabled:bg-gray-300 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <span>{contactSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
