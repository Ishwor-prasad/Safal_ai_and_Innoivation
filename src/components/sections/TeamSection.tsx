import React from "react";
import { Linkedin, Mail, Globe } from "lucide-react";
import { TEAM_MEMBERS } from "../../data";

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 sm:py-24 bg-surface-soft border-t border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="eyebrow eyebrow-center justify-center">Leadership</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            The team behind SAFAL AI
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Educators and engineers building AI that works for Nepali communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              id={`member-card-${member.id}`}
              className="card-elevated overflow-hidden flex flex-col group"
            >
              {member.profileImage ? (
                <div className="aspect-[4/5] overflow-hidden bg-surface-muted relative">
                  <img
                    src={member.profileImage}
                    alt={`${member.name}, ${member.position}`}
                    className="w-full h-full object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="aspect-[4/5] bg-dark-primary flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-white/80 tracking-wider">
                    {member.avatarInitials}
                  </span>
                </div>
              )}

              <div className="p-5 lg:p-6 flex flex-col flex-1">
                <h3 className="font-display text-base font-semibold text-gray-900 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-brand-dark mt-0.5">
                  {member.position}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed mt-3 mb-4">
                  {member.description}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  {member.website ? (
                    <a
                      href={member.website}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:text-brand-dark transition-colors"
                      title={`Visit ${member.name}'s website`}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  ) : member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#0A66FF] transition-colors"
                      title={`Connect with ${member.name} on LinkedIn`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  ) : <span />}
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-brand transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};