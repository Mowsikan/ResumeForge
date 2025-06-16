import { ResumeData } from "@/pages/Builder";

interface ResumeTemplateProps {
  data: ResumeData;
  templateId: string;
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

      {/* Rest of the sections... */}
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

      {/* Rest of the sections with creative styling... */}
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

      {/* Rest of the sections with executive styling... */}
    </div>
  </div>
);

// Minimal Template
const MinimalTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white shadow-lg mx-auto" style={{ width: '8.5in', minHeight: '11in' }}>
    <div className="p-12 space-y-8">
      {/* Header with minimal styling */}
      <div className="text-left pb-4">
        <h1 className="text-2xl font-light text-gray-900 mb-4">{data.fullName}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.location}</div>
        </div>
      </div>

      {/* Summary with minimal styling */}
      {data.summary && (
        <div>
          <h2 className="text-sm font-normal text-gray-900 mb-2 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
        </div>
      )}

      {/* Rest of the sections with minimal styling... */}
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

      {/* Rest of the sections with tech styling... */}
    </div>
  </div>
);

export const ResumeTemplate = ({ data, templateId }: ResumeTemplateProps) => {
  switch (templateId) {
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'technical':
      return <TechnicalTemplate data={data} />;
    default:
      return <ModernTemplate data={data} />;
  }
};
