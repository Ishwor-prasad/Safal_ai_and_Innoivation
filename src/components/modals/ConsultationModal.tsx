import React from "react";
import { X, Calendar, CheckCircle2 } from "lucide-react";

interface ConsultationModalProps {
  consultModalOpen: boolean;
  setConsultModalOpen: (open: boolean) => void;
  consultName: string;
  setConsultName: (val: string) => void;
  consultEmail: string;
  setConsultEmail: (val: string) => void;
  consultOrg: string;
  setConsultOrg: (val: string) => void;
  consultPhone: string;
  setConsultPhone: (val: string) => void;
  consultSector: string;
  setConsultSector: (val: string) => void;
  consultMessage: string;
  setConsultMessage: (val: string) => void;
  consultSubmitting: boolean;
  consultSuccessMsg: string | null;
  setConsultSuccessMsg: (msg: string | null) => void;
  handleBookConsultation: (e: React.FormEvent) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  consultModalOpen,
  setConsultModalOpen,
  consultName,
  setConsultName,
  consultEmail,
  setConsultEmail,
  consultOrg,
  setConsultOrg,
  consultPhone,
  setConsultPhone,
  consultSector,
  setConsultSector,
  consultMessage,
  setConsultMessage,
  consultSubmitting,
  consultSuccessMsg,
  setConsultSuccessMsg,
  handleBookConsultation
}) => {
  if (!consultModalOpen) return null;

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="consultation-modal-card"
        className="w-full max-w-lg bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 flex flex-col max-h-[90vh]"
      >
        <div className="bg-[#0F172A] p-6 text-white relative border-b border-slate-800">
          <button
            id="close-consult-modal"
            onClick={() => setConsultModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer border-none"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider w-fit uppercase text-emerald-400 mb-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Strategic Booking Queue</span>
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-1">
            Book Consultation
          </h3>
          <p className="text-slate-300 text-xs font-light">
            Secure a structured 30-minute integration review call with SAFAL educational and automation leads.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {consultSuccessMsg ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 space-y-3" id="modal-success-box">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              <h4 className="font-display text-base font-bold text-white">Consultation Interest Logged</h4>
              <p className="text-xs font-light text-slate-200 leading-relaxed">
                {consultSuccessMsg}
              </p>
              <button
                onClick={() => {
                  setConsultSuccessMsg(null);
                  setConsultModalOpen(false);
                }}
                className="w-full bg-brand hover:bg-brand-light text-white py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold pointer-events-auto cursor-pointer border-none"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookConsultation} className="space-y-4" id="consultation-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-name">
                    Your Full Name
                  </label>
                  <input
                    id="consult-name"
                    type="text"
                    required
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g., Sunil Sharma"
                    className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-email">
                    Your Professional Email
                  </label>
                  <input
                    id="consult-email"
                    type="email"
                    required
                    value={consultEmail}
                    onChange={(e) => setConsultEmail(e.target.value)}
                    placeholder="sunil@academy.edu.np"
                    className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-org">
                    Organization / Authority
                  </label>
                  <input
                    id="consult-org"
                    type="text"
                    required
                    value={consultOrg}
                    onChange={(e) => setConsultOrg(e.target.value)}
                    placeholder="e.g. Lalitpur Ward office, Zenith School"
                    className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-phone">
                    Phone Contact Coordinate
                  </label>
                  <input
                    id="consult-phone"
                    type="text"
                    required
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value)}
                    placeholder="+977-9800000000"
                    className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-sector-select">
                  Primary sector focus
                </label>
                <select
                  id="consult-sector-select"
                  value={consultSector}
                  onChange={(e) => setConsultSector(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 text-xs text-white cursor-pointer [&>option]:bg-[#0F172A] [&>option]:text-white"
                >
                  <option value="Education">Academic Integration (Schools &amp; Colleges)</option>
                  <option value="Enterprise">Enterprise Workspace (SMEs, Startups)</option>
                  <option value="Government">Public Civil Administration (Municipalities)</option>
                  <option value="NGO/INGO">Non-profit/INGOs Community Development</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-msg">
                  What target challenge is your team targeting?
                </label>
                <textarea
                  id="consult-msg"
                  rows={4}
                  value={consultMessage}
                  onChange={(e) => setConsultMessage(e.target.value)}
                  placeholder="Briefly share any special workflows or curricula goals you intend to transform."
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={consultSubmitting}
                className="w-full bg-brand hover:bg-brand-dark disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <span>Request Placement Slot</span>
                <Calendar className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
