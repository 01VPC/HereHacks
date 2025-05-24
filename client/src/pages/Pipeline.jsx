import React, { useState } from 'react';
import { 
  Upload, 
  Eye, 
  Tags, 
  Route, 
  CheckCircle, 
  Layers,
  Settings,
  Zap
} from 'lucide-react';

const Pipeline = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  
  const pipelineSteps = [
    {
      id: 1,
      title: 'Data Ingestion',
      description: 'Handle raw data from heterogeneous sources',
      icon: Upload,
      status: 'completed',
      details: 'Processing satellite imagery, GPS traces, and sensor data'
    },
    {
      id: 2,
      title: 'Feature Detection',
      description: 'Extract map features using AI models',
      icon: Eye,
      status: 'active',
      details: 'Identifying roads, buildings, signs, and POIs'
    },
    {
      id: 3,
      title: 'Semantic Enrichment',
      description: 'Add meaningful labels and classifications',
      icon: Tags,
      status: 'pending',
      details: 'Classifying road types and traffic rules'
    },
    {
      id: 4,
      title: 'Road Construction',
      description: 'Generate road graphs and connectivity',
      icon: Route,
      status: 'pending',
      details: 'Building lane graphs and turn restrictions'
    },
    {
      id: 5,
      title: 'Quality Check',
      description: 'Detect inconsistencies and suggest repairs',
      icon: CheckCircle,
      status: 'pending',
      details: 'Automated quality assurance and validation'
    },
    {
      id: 6,
      title: 'Map Generation',
      description: 'Convert to renderable map tiles',
      icon: Layers,
      status: 'pending',
      details: 'Creating final map visualization'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">AI Processing Pipeline</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Zap className="h-4 w-4" />
            <span>Start Pipeline</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Settings className="h-4 w-4" />
            <span>Configure</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          {pipelineSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setSelectedStep(index)}
                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                  selectedStep === index ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-full mb-2 ${
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{step.title}</span>
                <span className={`text-xs px-2 py-1 rounded-full mt-1 ${
                  step.status === 'completed' ? 'bg-green-100 text-green-800' :
                  step.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.status}
                </span>
              </button>
              {index < pipelineSteps.length - 1 && (
                <div className="w-8 h-px bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {pipelineSteps[selectedStep].title}
          </h3>
          <p className="text-gray-600 mb-4">{pipelineSteps[selectedStep].description}</p>
          <p className="text-sm text-gray-500">{pipelineSteps[selectedStep].details}</p>
          
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Logs
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Configure Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;