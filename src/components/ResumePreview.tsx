import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const ModernTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px]">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-gray-600">{data.email} | {data.phone}</p>
        <p className="text-gray-600">{data.location}</p>
        {data.website && <a href={data.website} className="text-blue-500">{data.website}</a>}
        {(data.linkedin || data.github) && (
          <div className="mt-2">
            {data.linkedin && <a href={data.linkedin} className="text-blue-500 mr-2">LinkedIn</a>}
            {data.github && <a href={data.github} className="text-blue-500">GitHub</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <p className="text-gray-600">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school} | {edu.year}</p>
              {edu.grade && <p className="text-gray-600">Grade: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const ProfessionalTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        {/* Left side - Contact and Skills */}
        <div className="md:w-1/3 bg-gray-100 p-8">
          <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Contact</div>
          <p className="text-gray-600 mb-2">{data.email}</p>
          <p className="text-gray-600 mb-2">{data.phone}</p>
          <p className="text-gray-600 mb-2">{data.location}</p>
          {data.website && <a href={data.website} className="text-blue-500 mb-2 block">{data.website}</a>}
          {data.linkedin && <a href={data.linkedin} className="text-blue-500 mb-2 block">LinkedIn</a>}
          {data.github && <a href={data.github} className="text-blue-500 mb-2 block">GitHub</a>}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div className="mt-6">
              <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Skills</div>
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold inline-block mr-2 mb-2">
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Main Content */}
        <div className="md:w-2/3 p-8">
          <div className="text-3xl font-bold text-gray-800 mb-2">{data.fullName}</div>
          <div className="text-gray-700 italic mb-6">{data.summary}</div>

          {/* Achievements Section */}
          {data.achievements.length > 0 && (
            <div className="mb-6">
              <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Key Achievements</div>
              <ul className="list-disc list-inside text-gray-700">
                {data.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Experience</div>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="text-lg font-semibold text-gray-800">{exp.position}</div>
                  <div className="text-gray-600">{exp.company} | {exp.duration}</div>
                  <div className="text-gray-700 mt-1">{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div>
              <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Education</div>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="text-lg font-semibold text-gray-800">{edu.degree}</div>
                  <div className="text-gray-600">{edu.school} | {edu.year}</div>
                  {edu.grade && <div className="text-gray-600">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SidebarTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
      {/* Sidebar - Contact and Skills */}
      <div className="md:w-1/3 bg-gray-800 text-white p-8">
        <div className="uppercase text-sm font-bold tracking-wider mb-4">Contact</div>
        <p className="mb-2">{data.email}</p>
        <p className="mb-2">{data.phone}</p>
        <p className="mb-2">{data.location}</p>
        {data.website && <a href={data.website} className="text-blue-300 mb-2 block">{data.website}</a>}
        {data.linkedin && <a href={data.linkedin} className="text-blue-300 mb-2 block">LinkedIn</a>}
        {data.github && <a href={data.github} className="text-blue-300 mb-2 block">GitHub</a>}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div className="mt-6">
            <div className="uppercase text-sm font-bold tracking-wider mb-4">Skills</div>
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-blue-800 bg-opacity-50 rounded-full px-3 py-1 text-sm font-semibold inline-block mr-2 mb-2">
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:w-2/3 p-8">
        <div className="text-3xl font-bold text-gray-800 mb-2">{data.fullName}</div>
        <div className="text-gray-700 italic mb-6">{data.summary}</div>

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Experience</div>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="text-lg font-semibold text-gray-800">{exp.position}</div>
                <div className="text-gray-600">{exp.company} | {exp.duration}</div>
                <div className="text-gray-700 mt-1">{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <div>
            <div className="uppercase text-sm font-bold text-gray-700 tracking-wider mb-4">Education</div>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="text-lg font-semibold text-gray-800">{edu.degree}</div>
                <div className="text-gray-600">{edu.school} | {edu.year}</div>
                {edu.grade && <div className="text-gray-600">Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const RecruiterTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px]">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-gray-600">{data.email} | {data.phone}</p>
        <p className="text-gray-600">{data.location}</p>
        {data.website && <a href={data.website} className="text-blue-500">{data.website}</a>}
        {(data.linkedin || data.github) && (
          <div className="mt-2">
            {data.linkedin && <a href={data.linkedin} className="text-blue-500 mr-2">LinkedIn</a>}
            {data.github && <a href={data.github} className="text-blue-500">GitHub</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <p className="text-gray-600">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school} | {edu.year}</p>
              {edu.grade && <p className="text-gray-600">Grade: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const CreativeTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px]">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
          <div>
            <p>{data.location}</p>
            {data.website && <p>{data.website}</p>}
          </div>
        </div>
        {(data.linkedin || data.github) && (
          <div className="mt-3 text-sm">
            {data.linkedin && <span className="mr-4">{data.linkedin}</span>}
            {data.github && <span>{data.github}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-200 pb-1">Creative Profile</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-200 pb-1">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                  {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-200 pb-1">Creative Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                  <p className="text-purple-600 text-sm font-medium">Tech: {project.technologies}</p>
                  {project.link && <p className="text-pink-600 text-sm">{project.link}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-700 mb-3">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm text-gray-800">{edu.degree}</h3>
                  <p className="text-purple-600 text-sm">{edu.school}</p>
                  <p className="text-gray-600 text-xs">{edu.year} {edu.grade && `• ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-700 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-700 mb-3">Languages</h2>
              {data.languages.map((language, index) => (
                <p key={index} className="text-gray-700 text-sm mb-1">{language}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ExecutiveTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px]">
      {/* Elegant header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        <h1 className="text-5xl font-serif text-gray-800 mb-3">{data.fullName}</h1>
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
        {data.website && (
          <p className="text-sm text-gray-600 mt-2">{data.website}</p>
        )}
      </div>

      {/* Executive Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-gray-800 mb-4 text-center">Executive Summary</h2>
          <p className="text-gray-700 text-center italic leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Key Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-gray-800 mb-4 text-center">Key Achievements</h2>
          <div className="space-y-2">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-800 mr-3">▪</span>
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-gray-800 mb-4 text-center">Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500 text-right">{exp.duration}</p>
              </div>
              {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education & Qualifications */}
      <div className="grid grid-cols-2 gap-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-serif text-gray-800 mb-4">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-gray-500 text-sm">{edu.year} {edu.grade && `• ${edu.grade}`}</p>
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-serif text-gray-800 mb-4">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">{cert.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const MinimalTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px]">
      {/* Clean header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">{data.fullName}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{data.email} • {data.phone} • {data.location}</p>
          {data.website && <p>{data.website}</p>}
          {(data.linkedin || data.github) && (
            <p>
              {data.linkedin && <span className="mr-4">{data.linkedin}</span>}
              {data.github && <span>{data.github}</span>}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
              <p className="text-gray-600">{edu.school}</p>
              {edu.grade && <p className="text-gray-500 text-sm">{edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
          <p className="text-gray-700">{data.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );

  const TechnicalTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg min-h-[800px] font-mono">
      {/* Header with code-like styling */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 font-mono">
        <div className="text-xs text-gray-500 mb-2">~/resume $</div>
        <h1 className="text-2xl font-bold mb-2">{data.fullName}</h1>
        <div className="text-sm space-y-1">
          <p><span className="text-blue-400">email:</span> {data.email}</p>
          <p><span className="text-blue-400">phone:</span> {data.phone}</p>
          <p><span className="text-blue-400">location:</span> {data.location}</p>
          {data.github && <p><span className="text-blue-400">github:</span> {data.github}</p>}
          {data.linkedin && <p><span className="text-blue-400">linkedin:</span> {data.linkedin}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// About</h2>
          <p className="text-gray-700 bg-gray-50 p-3 rounded border-l-4 border-violet-500">{data.summary}</p>
        </div>
      )}

      {/* Technical Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// Technical Skills</h2>
          <div className="bg-gray-50 p-4 rounded">
            <div className="grid grid-cols-3 gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-sm font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded border-l-4 border-violet-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-violet-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-gray-700 text-sm font-sans">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
              <p className="text-gray-700 text-sm mb-2 font-sans">{project.description}</p>
              <div className="text-xs">
                <p className="text-green-600 mb-1"><span className="text-gray-600">Tech Stack:</span> {project.technologies}</p>
                {project.link && <p className="text-blue-600"><span className="text-gray-600">Demo:</span> {project.link}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 bg-gray-50 p-3 rounded">
              <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-violet-600">{edu.school}</p>
              <p className="text-gray-500 text-sm">{edu.year} {edu.grade && `• ${edu.grade}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case "professional":
        return <ProfessionalTemplate />;
      case "sidebar":
        return <SidebarTemplate />;
      case "recruiter":
        return <RecruiterTemplate />;
      case "creative":
        return <CreativeTemplate />;
      case "executive":
        return <ExecutiveTemplate />;
      case "minimal":
        return <MinimalTemplate />;
      case "technical":
        return <TechnicalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return renderTemplate();
};
