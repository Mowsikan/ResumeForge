
import { ResumeData } from "@/pages/Builder";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <div className="bg-white shadow-lg mx-auto" style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
            <span>•</span>
            <span>{data.location}</span>
          </div>
          {(data.website || data.linkedin || data.github) && (
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 mt-2">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && data.experience.some(exp => exp.position || exp.company) && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                (exp.position || exp.company) && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                (edu.degree || edu.school) && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600">{edu.school}</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                cert.name && (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-blue-600">{cert.issuer}</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
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
                          <p className="text-blue-600 text-sm">{project.link}</p>
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
