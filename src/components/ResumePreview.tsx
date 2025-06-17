
import { ResumeData } from "@/pages/Builder";

interface ResumePreviewProps {
  data: ResumeData;
  templateId?: string;
}

export const ResumePreview = ({ data, templateId = "modern" }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case "creative":
        return {
          containerClass: "bg-gradient-to-br from-purple-50 to-pink-50",
          headerClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8",
          sectionHeaderClass: "text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-500 pb-1",
          textClass: "text-gray-800",
          skillClass: "px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium",
          languageClass: "px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
        };
      case "executive":
        return {
          containerClass: "bg-slate-50",
          headerClass: "bg-slate-800 text-white p-8",
          sectionHeaderClass: "text-xl font-bold text-slate-800 mb-3 border-b-2 border-slate-600 pb-1",
          textClass: "text-slate-700",
          skillClass: "px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium",
          languageClass: "px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-sm font-medium"
        };
      case "minimal":
        return {
          containerClass: "bg-white",
          headerClass: "text-center border-b-2 border-gray-300 pb-6",
          sectionHeaderClass: "text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1",
          textClass: "text-gray-600",
          skillClass: "px-2 py-1 border border-gray-300 text-gray-700 rounded text-sm",
          languageClass: "px-2 py-1 border border-gray-300 text-gray-700 rounded text-sm"
        };
      case "technical":
        return {
          containerClass: "bg-gray-900 text-white",
          headerClass: "bg-blue-900 text-white p-8",
          sectionHeaderClass: "text-xl font-bold text-blue-400 mb-3 border-b-2 border-blue-500 pb-1",
          textClass: "text-gray-200",
          skillClass: "px-3 py-1 bg-blue-800 text-blue-100 rounded text-sm font-mono",
          languageClass: "px-3 py-1 bg-green-800 text-green-100 rounded text-sm font-mono"
        };
      default: // modern
        return {
          containerClass: "bg-white",
          headerClass: "text-center border-b pb-6",
          sectionHeaderClass: "text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1",
          textClass: "text-gray-700",
          skillClass: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium",
          languageClass: "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
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
          <div className="flex flex-wrap justify-center gap-4">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
            <span>•</span>
            <span>{data.location}</span>
          </div>
          {(data.website || data.linkedin || data.github) && (
            <div className="flex flex-wrap justify-center gap-4 mt-2">
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
            <h2 className={styles.sectionHeaderClass}>
              Professional Summary
            </h2>
            <p className={`${styles.textClass} leading-relaxed`}>{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && data.experience.some(exp => exp.position || exp.company) && (
          <div>
            <h2 className={styles.sectionHeaderClass}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                (exp.position || exp.company) && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold ${templateId === 'technical' ? 'text-white' : 'text-gray-900'}`}>{exp.position}</h3>
                        <p className={`${templateId === 'technical' ? 'text-blue-400' : 'text-blue-600'} font-medium`}>{exp.company}</p>
                      </div>
                      <span className={`${styles.textClass} text-sm`}>{exp.duration}</span>
                    </div>
                    {exp.description && (
                      <p className={`${styles.textClass} text-sm`}>{exp.description}</p>
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
            <h2 className={styles.sectionHeaderClass}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                (edu.degree || edu.school) && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${templateId === 'technical' ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h3>
                      <p className={`${templateId === 'technical' ? 'text-blue-400' : 'text-blue-600'}`}>{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <span className={`${styles.textClass} text-sm`}>{edu.year}</span>
                      {edu.grade && <div className={`${styles.textClass} text-sm`}>{edu.grade}</div>}
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
            <h2 className={styles.sectionHeaderClass}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className={styles.skillClass}
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
            <h2 className={styles.sectionHeaderClass}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language, index) => (
                <span
                  key={index}
                  className={styles.languageClass}
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
            <h2 className={styles.sectionHeaderClass}>
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                cert.name && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${templateId === 'technical' ? 'text-white' : 'text-gray-900'}`}>{cert.name}</h3>
                      <p className={`${templateId === 'technical' ? 'text-blue-400' : 'text-blue-600'}`}>{cert.issuer}</p>
                    </div>
                    <span className={`${styles.textClass} text-sm`}>{cert.year}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && data.projects.some(project => project.name) && (
          <div>
            <h2 className={styles.sectionHeaderClass}>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                project.name && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold ${templateId === 'technical' ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                        {project.link && (
                          <p className={`${templateId === 'technical' ? 'text-blue-400' : 'text-blue-600'} text-sm`}>{project.link}</p>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className={`${styles.textClass} text-sm mb-2`}>{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className={`${styles.textClass} text-sm`}><strong>Technologies:</strong> {project.technologies}</p>
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
