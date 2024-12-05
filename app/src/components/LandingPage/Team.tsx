import React from 'react';
import { useTranslation } from 'react-i18next';

type TeamMember = {
  name: string;
  image: string;
  linkedin: string;
  bio: string;
};

const Team = () => {
  const { t } = useTranslation();

  // Fetch team data with type assertion
  const teamTitle: string = t('team.title');
  const teamMembers: TeamMember[] = t('team.members', { returnObjects: true }) as TeamMember[];

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-wide mb-8">{teamTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative group">
              {/* Picture with circular shape and hover effect */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-40 h-40 rounded-full overflow-hidden mx-auto mt-4 mb-4 border-4 border-primary group-hover:scale-105 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Bio: Displayed directly on top of the image in a circular box on hover */}
              <div className="absolute inset-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 bg-black bg-opacity-70">
                <p className="text-white text-xs text-center">{member.bio}</p>
              </div>

              {/* Name as plain text but clickable */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {member.name}
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;