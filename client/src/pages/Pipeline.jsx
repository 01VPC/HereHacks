import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  GitCompare, 
  CheckCircle, 
  Code, 
  Play,
  Settings,
  Filter,
  Download
} from 'lucide-react';

const Pipeline = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({
    dataIngestion: null,
    baseMapData: null
  });

  const pipelineSteps = [
    {
      id: 1,
      title: 'Data Ingestion',
      description: 'Upload and process raw data files',
      icon: Upload,
      status: 'active',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      details: 'Upload PDF files containing raw geospatial data',
      hasUpload: true,
      uploadKey: 'dataIngestion'
    },
    {
      id: 2,
      title: 'Base Map Data',
      description: 'Import reference map data',
      icon: FileText,
      status: 'pending',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      details: 'Upload PDF files with base map information',
      hasUpload: true,
      uploadKey: 'baseMapData'
    },
    {
      id: 3,
      title: 'Compare Data',
      description: 'Analyze differences between datasets',
      icon: GitCompare,
      status: 'pending',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      details: 'Intelligent comparison and conflict detection'
    },
    {
      id: 4,
      title: 'Quality Check',
      description: 'Validate data integrity and accuracy',
      icon: CheckCircle,
      status: 'pending',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      details: 'Automated quality assurance and validation'
    },
    {
      id: 5,
      title: 'Final Code',
      description: 'Generate output and export results',
      icon: Code,
      status: 'pending',
      color: 'from-teal-400 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      details: 'Export processed data and generate code'
    }
  ];

  const handleFileUpload = (stepKey, event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFiles(prev => ({
        ...prev,
        [stepKey]: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      active: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Active' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Pending' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Data Processing Intelligence
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced pipeline for geospatial data analysis and comparison
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Settings className="h-4 w-4 text-white" />
              </div>
              Pipeline Management
            </h2>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
                <Play className="h-4 w-4" />
                <span>Start Pipeline</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
                <Filter className="h-4 w-4" />
                <span>Configure</span>
              </button>
            </div>
          </div>

          {/* Pipeline Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.id}
                onClick={() => setSelectedStep(index)}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedStep === index ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                }`}
              >
                <div className={`${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-6 h-full`}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      {getStatusBadge(step.status)}
                    </div>
                    
                    {/* Coverage/Quality Metrics */}
                    <div className="w-full space-y-2 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>Progress</span>
                        <span>{step.status === 'completed' ? '100%' : step.status === 'active' ? '45%' : '0%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${step.color}`}
                          style={{ 
                            width: step.status === 'completed' ? '100%' : step.status === 'active' ? '45%' : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Step Details */}
          <div className="flex items-center mb-6">
  <div className={`w-12 h-12 bg-gradient-to-r ${pipelineSteps[selectedStep].color} rounded-xl flex items-center justify-center mr-4`}>
    {React.createElement(pipelineSteps[selectedStep].icon, { className: "h-6 w-6 text-white" })}
  </div>
  <div>
    <h3 className="text-2xl font-bold text-gray-900">
      {pipelineSteps[selectedStep].title}
    </h3>
    <p className="text-gray-600">{pipelineSteps[selectedStep].description}</p>
  </div>

            
            <p className="text-gray-700 mb-6">{pipelineSteps[selectedStep].details}</p>
            
            {/* File Upload Section */}
            {pipelineSteps[selectedStep].hasUpload && (
              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload PDF File</h4>
                  <p className="text-gray-600 mb-4">Select a PDF file to process</p>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(pipelineSteps[selectedStep].uploadKey, e)}
                    className="hidden"
                    id={`file-upload-${selectedStep}`}
                  />
                  <label
                    htmlFor={`file-upload-${selectedStep}`}
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${pipelineSteps[selectedStep].color} text-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200`}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose PDF File
                  </label>
                  
                  {uploadedFiles[pipelineSteps[selectedStep].uploadKey] && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✓ {uploadedFiles[pipelineSteps[selectedStep].uploadKey].name} uploaded successfully
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className={`px-6 py-3 bg-gradient-to-r ${pipelineSteps[selectedStep].color} text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center`}>
                <Play className="h-4 w-4 mr-2" />
                Execute Step
              </button>
              <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </button>
              <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                View Output
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;