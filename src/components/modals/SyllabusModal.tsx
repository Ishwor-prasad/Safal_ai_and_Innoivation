import React from "react";
import { X, Check } from "lucide-react";
import { TrainingProgram } from "../../types";

interface SyllabusModalProps {
  selectedSyllabusProg: TrainingProgram | null;
  setSelectedSyllabusProg: (prog: TrainingProgram | null) => void;
  setConsultSector: (sector: string) => void;
  setConsultMessage: (msg: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  selectedSyllabusProg,
  setSelectedSyllabusProg,
  setConsultSector,
  setConsultMessage,
  setConsultModalOpen
}) => {
  if (!selectedSyllabusProg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl relative max-h-[85vh] overflow-y-auto flex flex-col justify-between">
        <button
          onClick={() => setSelectedSyllabusProg(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        >
          <X className="h-6 w-6" />
        </button>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-medium text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded">
              {selectedSyllabusProg.duration}
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
              Accredited Program Outline
            </span>
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white mb-2 tracking-tight">
            {selectedSyllabusProg.title}
          </h3>
          <p className="text-xs text-slate-300 mb-6 font-mono">Target: {selectedSyllabusProg.target}</p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono font-semibold uppercase text-emerald-400 block">Syllabus Overview &amp; Modules:</span>
            <ul className="space-y-3.5 text-sm text-slate-200 font-normal">
              {selectedSyllabusProg.syllabus.map((syl: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>{syl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              const prog = selectedSyllabusProg;
              setSelectedSyllabusProg(null);
              setConsultSector("Education");
              setConsultMessage(`I'm highly interested in registering for the "${prog.title}" AI Learning Program. Please provide schedule details.`);
              setConsultModalOpen(true);
            }}
            className="flex-1 bg-white hover:bg-gray-100 text-black font-semibold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer border-none shadow-md uppercase tracking-wider text-center"
          >
            Request Enrollment Info
          </button>
          <button
            onClick={() => setSelectedSyllabusProg(null)}
            className="bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer border border-white/10 uppercase tracking-wider text-center"
          >
            Close Outline
          </button>
        </div>
      </div>
    </div>
  );
};
