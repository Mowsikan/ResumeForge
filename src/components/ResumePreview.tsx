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
      case "professional":
        return {
          containerClass: "bg-white",
          headerClass: "bg-white text-left p-8 border-b-2 border-blue-600",
          sectionTitleClass: "text-lg font-bold text-blue-600 mb-3 uppercase tracking-wide",
          accentColor: "text-blue-600",
          skillClass: "bg-blue-50 text-blue-800",
          languageClass: "bg-blue-50 text-blue-800"
        };
      case "sidebar":
        return {
          containerClass: "bg-white flex",
          headerClass: "bg-blue-900 text-white p-6 w-1/3 min-h-full",
          sectionTitleClass: "text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-2",
          accentColor: "text-blue-900",
          skillClass: "bg-gray-100 text-gray-800",
          languageClass: "bg-gray-100 text-gray-800"
        };
      case "minimal":
        return {
          containerClass: "bg-white",
          headerClass: "text-center border-b-4 border-blue-600 pb-6",
          sectionTitleClass: "text-2xl font-bold text-blue-600 mb-4 uppercase",
          accentColor: "text-blue-600",
          skillClass: "text-gray-700 border border-gray-300",
          languageClass: "text-gray-700 border border-gray-300"
        };
      case "recruiter":
        return {
          containerClass: "bg-white",
          headerClass: "text-left pb-6 border-b-2 border-blue-600",
          sectionTitleClass: "text-lg font-bold text-blue-600 mb-3 uppercase tracking-wider",
          accentColor: "text-blue-600",
          skillClass: "text-gray-800",
          languageClass: "text-gray-800"
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

  // Sidebar template has different layout
  if (template === "sidebar") {
    return (
      <div className="shadow-lg mx-auto bg-white" style={{ width: '8.5in', minHeight: '11in' }}>
        <div className="flex min-h-full">
          {/* Left Sidebar */}
          <div className="bg-blue-900 text-white p-6 w-1/3">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-900">
                  {data.fullName?.split(' ').map(n => n[0]).join('') || 'JS'}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{data.fullName}</h1>
              <p className="text-blue-200 text-sm">{data.experience[0]?.position || 'Professional'}</p>
            </div>

            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-blue-200">• Personal Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>
                  <span>{data.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>
                  <span>{data.phone}</span>
                </div>
                {data.linkedin && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>
                    <span>{data.linkedin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-blue-200">• Skills</h3>
                <div className="space-y-2">
                  {data.skills.slice(0, 8).map((skill, index) => (
                    <div key={index} className="text-sm">{skill}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Software */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-blue-200">• Software</h3>
              <div className="space-y-2 text-sm">
                <div>Microsoft Project</div>
                <div>MS Windows Server</div>
                <div>Linux/Unix</div>
              </div>
            </div>

            {/* Languages */}
            {data.languages.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-200">• Languages</h3>
                <div className="space-y-2 text-sm">
                  {data.languages.map((language, index) => (
                    <div key={index}>{language}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="flex-1 p-8">
            {/* Summary */}
            {data.summary && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4">• Experience</h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    exp.position && (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                            <p className="text-blue-900 font-medium italic">{exp.company}</p>
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
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4">• Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    edu.degree && (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-blue-900 italic">{edu.school}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-600 text-sm">{edu.year}</span>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-900 mb-4">• Certificates</h2>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    cert.name && (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">{cert.name}</h3>
                          </div>
                          <span className="text-gray-600 text-sm">{cert.year}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Professional template (Blue header, two-column layout inspired by Zoe Thompson)
  if (template === "professional") {
    return (
      <div className="shadow-lg mx-auto bg-white" style={{ width: '8.5in', minHeight: '11in' }}>
        <div className="flex min-h-full">
          {/* Left Column */}
          <div className="w-2/3 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
              <p className="text-lg text-blue-600 mb-4">{data.experience[0]?.position || 'Professional'}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>{data.phone}</span>
                <span>{data.email}</span>
                {data.linkedin && <span>{data.linkedin}</span>}
                <span>{data.location}</span>
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <div className="mb-8">
                <h2 className={styles.sectionTitleClass}>SUMMARY</h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Key Skills */}
            {data.skills.length > 0 && (
              <div className="mb-8">
                <h2 className={styles.sectionTitleClass}>KEY SKILLS</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Core Competencies</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {data.skills.slice(0, 6).map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-8">
                <h2 className={styles.sectionTitleClass}>EXPERIENCE</h2>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    exp.position && (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
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
            {data.education.length > 0 && (
              <div>
                <h2 className={styles.sectionTitleClass}>EDUCATION</h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    edu.degree && (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-blue-600">{edu.school}</p>
                          </div>
                          <span className="text-gray-600 text-sm">{edu.year}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Dark Blue */}
          <div className="w-1/3 bg-slate-700 text-white p-6">
            <h2 className="text-lg font-bold mb-6 text-white border-b border-slate-500 pb-2">KEY ACHIEVEMENTS</h2>
            
            <div className="space-y-6">
              {data.achievements && data.achievements.length > 0 ? (
                data.achievements.map((achievement, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">★</span>
                      <h3 className="font-bold text-sm">{achievement.title}</h3>
                    </div>
                    <p className="text-xs text-slate-300">{achievement.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">★</span>
                      <h3 className="font-bold text-sm">Excellence Award</h3>
                    </div>
                    <p className="text-xs text-slate-300">Recognized for outstanding leadership in organizational transformation.</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">★</span>
                      <h3 className="font-bold text-sm">Process Improvement</h3>
                    </div>
                    <p className="text-xs text-slate-300">Led initiatives resulting in significant efficiency improvements.</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">★</span>
                      <h3 className="font-bold text-sm">Team Leadership</h3>
                    </div>
                    <p className="text-xs text-slate-300">Successfully managed cross-functional teams and projects.</p>
                  </div>
                </>
              )}
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-500 pb-2">SKILLS</h2>
                <div className="space-y-2">
                  {data.skills.slice(0, 8).map((skill, index) => (
                    <div key={index} className="text-sm text-slate-300">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-500 pb-2">COURSES</h2>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    cert.name && (
                      <div key={index}>
                        <h3 className="font-bold text-sm text-white">{cert.name}</h3>
                        <p className="text-xs text-slate-300">{cert.issuer}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-500 pb-2">LANGUAGES</h2>
                <div className="space-y-2">
                  {data.languages.map((language, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-white">{language}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Recruiter template (inspired by Julia Reyes)
  if (template === "recruiter") {
    return (
      <div className="shadow-lg mx-auto bg-white" style={{ width: '8.5in', minHeight: '11in' }}>
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-left pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">{data.fullName}</h1>
            <p className="text-lg text-gray-700 font-medium">{data.experience[0]?.position || 'RECRUITER'}</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Profile */}
              {data.summary && (
                <div>
                  <h2 className={styles.sectionTitleClass}>PROFILE</h2>
                  <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
                </div>
              )}

              {/* Experience */}
              {data.experience.length > 0 && (
                <div>
                  <h2 className={styles.sectionTitleClass}>EXPERIENCE</h2>
                  <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                      exp.position && (
                        <div key={index}>
                          <div className="mb-3">
                            <h3 className="font-bold text-gray-900">{exp.position} | {exp.company}</h3>
                            <p className="text-sm text-gray-600">{exp.duration}</p>
                          </div>
                          {exp.description && (
                            <div className="text-sm text-gray-700">
                              <ul className="list-disc list-inside space-y-1">
                                <li>{exp.description}</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact */}
              <div>
                <h3 className="font-bold text-blue-900 mb-3">CONTACT</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>{data.phone}</div>
                  <div>{data.email}</div>
                  <div>{data.location}</div>
                  {data.linkedin && <div>LinkedIn | Portfolio</div>}
                </div>
              </div>

              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  <h3 className="font-bold text-blue-900 mb-3">EDUCATION</h3>
                  <div className="space-y-3">
                    {data.education.map((edu, index) => (
                      edu.degree && (
                        <div key={index} className="text-sm">
                          <div className="font-semibold text-gray-900">{edu.school}</div>
                          <div className="text-gray-700">{edu.degree}</div>
                          <div className="text-gray-600">{edu.year}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h3 className="font-bold text-blue-900 mb-3">SKILLS</h3>
                  <div className="space-y-1">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="text-sm text-gray-700">• {skill}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <div>
                  <h3 className="font-bold text-blue-900 mb-3">CERTIFICATIONS</h3>
                  <div className="space-y-3">
                    {data.certifications.map((cert, index) => (
                      cert.name && (
                        <div key={index} className="text-sm">
                          <div className="font-semibold text-gray-900">{cert.name}</div>
                          <div className="text-gray-600">{cert.year}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default templates (modern, creative, executive, technical, minimal)
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

        {/* Key Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <div>
            <h2 className={styles.sectionTitleClass}>
              Key Achievements
            </h2>
            <div className="space-y-3">
              {data.achievements.map((achievement, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-700 text-sm">{achievement.description}</p>
                </div>
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
