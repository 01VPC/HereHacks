import React, { useState } from 'react';
import { 
  Upload, 
  Database, 
  GitCompare, 
  CheckCircle, 
  Code,
  FileText,
  ArrowRight,
  Check,
  Clock,
  AlertCircle,
  StepBackIcon
} from 'lucide-react';

const Pipeline = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  
  const pipelineSteps = [
    {
      id: 1,
      title: 'Data Ingestion',
      description: 'Upload and process raw data files',
      icon: Upload,
      status: 'completed',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      details: 'Upload your source data files in JSON or GeoJSON format. The system will automatically process the content for further analysis.',
      fileKey: 'dataIngestion'
    },
    {
      id: 2,
      title: 'Base Map Data',
      description: 'Upload reference mapping data',
      icon: Database,
      status: 'active',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      details: 'Upload your base map reference files in PDF format. This data will serve as the foundation for comparison and validation.',
      uploadRequired: true,
      fileKey: 'baseMapData'
    },
    {
      id: 3,
      title: 'Compare Data',
      description: 'Analyze differences and similarities',
      icon: GitCompare,
      status: 'pending',
      color: 'from-emerald-400 to-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600',
      details: 'The system will automatically compare the ingested data with the base map data, identifying discrepancies and matching elements.',
      uploadRequired: false
    },
    {
      id: 4,
      title: 'Quality Check',
      description: 'Validate data integrity and accuracy',
      icon: CheckCircle,
      status: 'pending',
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      details: 'Comprehensive quality assurance process to ensure data accuracy, completeness, and consistency across all processed elements.',
      uploadRequired: false
    },
    {
      id: 5,
      title: 'Final Code',
      description: 'Generate final output and code',
      icon: Code,
      status: 'pending',
      color: 'from-cyan-400 to-cyan-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-600',
      details: 'Generate the final processed code and output files based on the validated and compared data from previous steps.',
      uploadRequired: false
    }
  ];

  const handleFileUpload = (stepKey, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [stepKey]: file
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-white" />;
      case 'active':
        return <Clock className="h-4 w-4 text-white" />;
      default:
        return <AlertCircle className="h-4 w-4 text-white" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'active':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Data Processing Pipeline
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transform your data through our intelligent processing workflow
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8 overflow-x-auto">
              {pipelineSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => setSelectedStep(index)}
                    className={`relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      selectedStep === index 
                        ? `${step.bgColor} ${step.borderColor} border-2 shadow-lg` 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`relative p-4 rounded-xl mb-3 bg-gradient-to-r ${step.color} shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getStatusColor(step.status)} flex items-center justify-center`}>
                        {getStatusIcon(step.status)}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 text-center">{step.title}</span>
                    <span className={`text-xs px-3 py-1 rounded-full mt-2 font-medium ${
                      step.status === 'completed' ? 'bg-green-100 text-green-700' :
                      step.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.status}
                    </span>
                  </button>
                  {index < pipelineSteps.length - 1 && (
                    <div className="flex items-center mx-4">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Step Details */}
            <div className={`${pipelineSteps[selectedStep].bgColor} rounded-2xl p-8 ${pipelineSteps[selectedStep].borderColor} border-2`}>
              <div className="flex items-start space-x-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${pipelineSteps[selectedStep].color} shadow-lg flex-shrink-0`}>
                {(() => {
      const StepIcon = pipelineSteps[selectedStep].icon;
      return <StepIcon className="h-10 w-10 text-white" />;
    })()}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pipelineSteps[selectedStep].title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4">
                      {pipelineSteps[selectedStep].description}
                    </p>
                    <p className="text-gray-700">
                      {pipelineSteps[selectedStep].details}
                    </p>
                  </div>

                  {/* File Upload Section */}
                 {/* File Upload Section */}
{pipelineSteps[selectedStep].uploadRequired && (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <FileText className="h-5 w-5 mr-2" />
      Upload Data File
    </h4>
    
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">JSON or GeoJSON files only (MAX. 10MB)</p>
      </div>
      
      <input
        type="file"
        accept=".json,.geojson"
        onChange={(e) => handleFileUpload(pipelineSteps[selectedStep].fileKey, e.target.files[0])}
        className="hidden"
        id={`file-upload-${selectedStep}`}
      />
      <label
        htmlFor={`file-upload-${selectedStep}`}
        className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Choose File
      </label>
    </div>

    {uploadedFiles[pipelineSteps[selectedStep].fileKey] && (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
        <Check className="h-5 w-5 text-green-600" />
        <span className="text-green-700 font-medium">
          {uploadedFiles[pipelineSteps[selectedStep].fileKey].name}
        </span>
      </div>
    )}
  </div>
)}

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button className={`px-6 py-3 bg-gradient-to-r ${pipelineSteps[selectedStep].color} text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium`}>
                      {pipelineSteps[selectedStep].uploadRequired ? 'Process Files' : 'Start Processing'}
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                      View Details
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Pipeline;