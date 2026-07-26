import React from "react";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Youtube, CheckCircle2, Send } from "lucide-react";

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
  return (
    <section id="contact" className="py-24 bg-surface-soft border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-8 items-start">

          <div className="xl:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="section-badge">
                Let's Collaborate
              </span>
              <h2 className="font-display text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mt-3">
                Get In Touch
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Interested in AI training, AI solutions, partnerships or consulting? Contact our team.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand font-mono">
                Direct Team Contacts
              </h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs">Uday Ram Jaishi</h4>
                    <p className="text-[10px] text-gray-600">Chief Executive Officer (CEO)</p>
                  </div>
                  <a href="mailto:uday@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                    uday@safalai.org
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs">Ishwor Dhungana</h4>
                    <p className="text-[10px] text-gray-600">Lead AI Trainer</p>
                  </div>
                  <a href="mailto:ishwor@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                    ishwor@safalai.org
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs">Kamram Muazzam</h4>
                    <p className="text-[10px] text-gray-600">AI Solution Engineer</p>
                  </div>
                  <a href="mailto:kamram@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                    kamram@safalai.org
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4" id="contact-info-list font-sans">
              <div className="flex gap-3.5 items-start">
                <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Email Address</span>
                  <a href="mailto:info@safalai.com.np" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                    info@safalai.com.np
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Phone Number</span>
                  <a href="tel:+9779869627250" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                    +977 986-9627250
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Office Location</span>
                  <p className="text-sm font-semibold text-gray-900 leading-normal">
                    Level 3, Star Complex, Putalisadak, Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-150">
              <span className="text-xs font-mono text-gray-600 block uppercase font-semibold">Connect &amp; Follow Us</span>
              <div className="flex gap-3" id="social-links-grid">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white hover:bg-[#0A66FF] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100083926890788"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white hover:bg-[#1877F2] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                  title="Facebook"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white hover:bg-[#E4405F] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                  title="Instagram"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white hover:bg-[#FF0000] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                  title="YouTube"
                >
                  <Youtube className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="xl:col-span-7 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Submit an Inquiry Blueprint
            </h3>

            {contactSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-2xl text-emerald-800 space-y-3" id="contact-success-box">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <h4 className="font-display text-base font-bold">Inquiry Record Generated Successfully</h4>
                <p className="text-sm font-light text-emerald-700 leading-relaxed">
                  {contactSuccessMsg}
                </p>
                <button
                  onClick={() => setContactSuccessMsg(null)}
                  className="text-xs font-mono text-emerald-600 underline font-semibold mt-2 block pointer-events-auto cursor-pointer bg-transparent border-none"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-name">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Binod Acharya"
                      className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-org">
                      Organization
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      required
                      value={contactOrg}
                      onChange={(e) => setContactOrg(e.target.value)}
                      placeholder="e.g., CDC Board, Elite Academy"
                      className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@organization.org"
                      className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-phone">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +977 9851000000"
                      className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-msg">
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={5}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Detail what localized AI models, capacity training bootcamps, or workflow automation integrations your administration is researching."
                    className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full bg-brand hover:bg-brand-light disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <span>Send Inquiry</span>
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
