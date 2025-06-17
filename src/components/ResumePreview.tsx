
import { ResumeData } from "@/pages/Builder";

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
}

export const ResumePreview = ({ data, template = "modern" }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    switch (template) {
      case "creative":
        return {
          containerClass: "bg-gradient-to-br from-purple-50 to-pink-50",
          headerClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center",
          sectionTitleClass: "text-xl font-bold text-purple-600 mb-4 border-b-2 border-purple-300 pb-2",
          accentColor: "text-purple-600",
          skillClass: "bg-purple-100 text-purple-800",
          languageClass: "bg-pink-100 text-pink-800"
        };
      case "executive":
        return {
          containerClass: "bg-gray-50",
          headerClass: "bg-gray-800 text-white p-8 text-center",
          sectionTitleClass: "text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2",
          accentColor: "text-gray-700",
          skillClass: "bg-gray-200 text-gray-800",
          languageClass: "bg-gray-300 text-gray-800"
        };
      case "technical":
        return {
          containerClass: "bg-slate-50",
          headerClass: "bg-slate-700 text-white p-8 text-center border-l-4 border-blue-500",
          sectionTitleClass: "text-xl font-bold text-slate-700 mb-4 border-b border-blue-500 pb-2 font-mono",
          accentColor: "text-blue-600",
          skillClass: "bg-blue-100 text-blue-800 font-mono",
          languageClass: "bg-slate-100 text-slate-800"
        };
      default: // modern
        return {
          containerClass: "bg-white",
          headerClass: "text-center border-b pb-6",
          sectionTitleClass: "text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1",
          accentColor: "text-blue-600",
          skillClass: "bg-blue-100 text-blue-800",
          languageClass: "bg-green-100 text-green-800"
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`shadow-lg mx-auto ${styles.containerClass}`} style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className={styles.headerClass}>
          <h1 className="text-3xl font-bold mb-2">{data.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
            <span>•</span>
            <span>{data.location}</span>
          </div>
          {(data.website || data.linkedin || data.github) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90 mt-2">
              {data.website && <span>{data.website}</span>}
              {data.website && (data.linkedin || data.github) && <span>•</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
              {data.linkedin && data.github && <span>•</span>}
              {data.github && <span>{data.github}</span>}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && data.experience.some(exp => exp.position || exp.company) && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                (exp.position || exp.company) && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className={`font-medium ${styles.accentColor}`}>{exp.company}</p>
                      </div>
                      <span className="text-gray-600 text-sm">{exp.duration}</span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education.some(edu => edu.degree || edu.school) && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                (edu.degree || edu.school) && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className={styles.accentColor}>{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm">{edu.year}</span>
                      {edu.grade && <div className="text-gray-600 text-sm">{edu.grade}</div>}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 ${styles.skillClass} rounded-full text-sm font-medium`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 ${styles.languageClass} rounded-full text-sm font-medium`}
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && data.certifications.some(cert => cert.name) && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                cert.name && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className={styles.accentColor}>{cert.issuer}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{cert.year}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && data.projects.some(project => project.name) && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                project.name && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        {project.link && (
                          <p className={`text-sm ${styles.accentColor}`}>{project.link}</p>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-gray-600 text-sm"><strong>Technologies:</strong> {project.technologies}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
