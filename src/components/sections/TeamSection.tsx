import React from "react";
import { Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "../../data";

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-surface-muted border-t border-gray-200 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
            Our Visionaries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Meet The Team Behind SAFAL AI
          </h2>
          <p className="text-gray-600 font-normal text-sm sm:text-base">
            Pioneers, educators, and architects building high-impact artificial intelligence infrastructure for Nepalese communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              id={`member-card-${member.id}`}
              className="bg-white border border-gray-200/80 rounded-3xl p-8 flex flex-col items-center justify-between text-center relative overflow-hidden group transition-all duration-300 hover:border-brand/40 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-6 flex flex-col items-center relative z-10 w-full animate-none">
                <div className="relative">
                  <div className="absolute inset-x-0 inset-y-0 rounded-full bg-gradient-to-tr from-brand to-emerald-400 p-[2px] animate-none group-hover:rotate-45 transition-transform duration-500">
                    <div className="h-full w-full rounded-full bg-white" />
                  </div>
                  {member.profileImage ? (
                    <img
                      src={member.profileImage}
                      alt={member.name}
                      className="relative h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`relative h-24 w-24 rounded-full bg-gradient-to-br ${member.avatarBg} p-[3px] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105`}>
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-brand text-xl font-display font-extrabold tracking-wider">
                          {member.avatarInitials}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight transition-colors group-hover:text-brand">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-brand font-semibold uppercase tracking-wider">
                    {member.position}
                  </p>
                </div>

                <p className="text-gray-655 font-normal text-xs leading-relaxed max-w-[240px] mx-auto min-h-[4.5rem]">
                  {member.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-150 w-full flex flex-col items-center gap-2.5 relative z-10">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-xl bg-gray-50 hover:bg-[#0A66FF] border border-gray-200 hover:border-transparent text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={`mailto:${member.email}`}
                  className="text-[11px] font-mono text-gray-500 hover:text-brand transition-colors"
                >
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
