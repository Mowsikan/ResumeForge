
import { ResumeData } from "@/pages/Builder";

interface ResumePreviewProps {
  data: ResumeData;
  templateId?: string;
}

// Modern Template (default)
const ModernTemplate = ({ data }: { data: ResumeData }) => (
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

// Creative Template
const CreativeTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg mx-auto" style={{ width: '8.5in', minHeight: '11in' }}>
    <div className="p-8 space-y-6">
      {/* Header with creative styling */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Summary with creative styling */}
      {data.summary && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded mr-2"></div>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Skills with creative styling */}
      {data.skills.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded mr-2"></div>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Executive Template
const ExecutiveTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white shadow-lg mx-auto border-t-4 border-gray-800" style={{ width: '8.5in', minHeight: '11in' }}>
    <div className="p-8 space-y-6">
      {/* Header with executive styling */}
      <div className="border-b-2 border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-wide">{data.fullName}</h1>
        <div className="text-gray-600 space-y-1">
          <div>{data.email} | {data.phone}</div>
          <div>{data.location}</div>
        </div>
      </div>

      {/* Summary with executive styling */}
      {data.summary && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}
    </div>
  </div>
);

// Technical Template
const TechnicalTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-gray-900 text-white shadow-lg mx-auto" style={{ width: '8.5in', minHeight: '11in' }}>
    <div className="p-8 space-y-6">
      {/* Header with tech styling */}
      <div className="border-b border-green-400 pb-6">
        <h1 className="text-3xl font-mono font-bold text-green-400 mb-2">{data.fullName}</h1>
        <div className="text-gray-300 font-mono text-sm">
          <div>{'>'} {data.email}</div>
          <div>{'>'} {data.phone}</div>
          <div>{'>'} {data.location}</div>
        </div>
      </div>

      {/* Summary with tech styling */}
      {data.summary && (
        <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
          <h2 className="text-lg font-mono font-bold text-green-400 mb-3">
            // Professional Summary
          </h2>
          <p className="text-gray-200 leading-relaxed font-mono text-sm">{data.summary}</p>
        </div>
      )}

      {/* Skills with tech styling */}
      {data.skills.length > 0 && (
        <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
          <h2 className="text-lg font-mono font-bold text-green-400 mb-3">
            // Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-400 text-gray-900 rounded text-xs font-mono font-bold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const ResumePreview = ({ data, templateId = "modern" }: ResumePreviewProps) => {
  switch (templateId) {
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'technical':
      return <TechnicalTemplate data={data} />;
    default:
      return <ModernTemplate data={data} />;
  }
};
