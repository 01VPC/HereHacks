import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Upload, 
  Cpu, 
  Eye, 
  Tags, 
  Route, 
  CheckCircle, 
  Layers,
  Settings,
  Bell,
  User,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Camera,
  Satellite,
  Navigation,
  Database,
  Activity,
  BarChart3,
  FileText,
  Clock,
  Zap,
  Shield
} from 'lucide-react';

// Header Component
const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Map className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">AI MapGen</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <span className="px-2 py-1 bg-blue-500 text-xs text-white rounded-full">Beta</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { key: 'pipeline', label: 'Pipeline', icon: Cpu },
              { key: 'data', label: 'Data Sources', icon: Database },
              { key: 'maps', label: 'Maps', icon: Map },
              { key: 'quality', label: 'Quality', icon: Shield }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-blue-100 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 text-blue-100 hover:text-white">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = () => {
  const stats = [
    { title: 'Data Sources Active', value: '24', icon: Database, color: 'bg-green-500' },
    { title: 'Processing Jobs', value: '12', icon: Cpu, color: 'bg-blue-500' },
    { title: 'Map Updates Today', value: '156', icon: RefreshCw, color: 'bg-purple-500' },
    { title: 'Quality Score', value: '94%', icon: Shield, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Satellite imagery processed', time: '2 min ago', status: 'success' },
              { action: 'Feature extraction completed', time: '5 min ago', status: 'success' },
              { action: 'Quality check failed', time: '12 min ago', status: 'error' },
              { action: 'New GPS traces ingested', time: '18 min ago', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Pipeline</h3>
          <div className="space-y-3">
            {[
              { stage: 'Data Ingestion', progress: 100, status: 'complete' },
              { stage: 'Feature Detection', progress: 75, status: 'active' },
              { stage: 'Semantic Enrichment', progress: 45, status: 'active' },
              { stage: 'Quality Check', progress: 0, status: 'pending' }
            ].map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-sm text-gray-500">{stage.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      stage.status === 'complete' ? 'bg-green-500' : 
                      stage.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${stage.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pipeline Component
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

      {/* Pipeline Visualization */}
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

        {/* Selected Step Details */}
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

// Data Sources Component
const DataSources = () => {
  const dataSources = [
    { name: 'Satellite Imagery', type: 'Image', status: 'Active', lastUpdate: '2 min ago', icon: Satellite },
    { name: 'GPS Traces', type: 'Trajectory', status: 'Active', lastUpdate: '5 min ago', icon: Navigation },
    { name: 'Traffic Cameras', type: 'Video', status: 'Active', lastUpdate: '1 min ago', icon: Camera },
    { name: 'LiDAR Data', type: '3D Point Cloud', status: 'Inactive', lastUpdate: '2 hours ago', icon: Database },
    { name: 'Mobile Sensors', type: 'IoT', status: 'Active', lastUpdate: '30 sec ago', icon: Activity },
    { name: 'Open Street Map', type: 'Vector', status: 'Active', lastUpdate: '10 min ago', icon: Map }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="h-4 w-4" />
            <span>Add Source</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map((source, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <source.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{source.name}</h3>
                  <p className="text-sm text-gray-500">{source.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                source.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {source.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Update:</span>
                <span className="text-gray-900">{source.lastUpdate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data Quality:</span>
                <span className="text-green-600">95%</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Configure
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                View Data
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Data</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your files here, or click to browse</p>
          <p className="text-sm text-gray-500">Supports: Images, GPS traces, LiDAR files, Video feeds</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
};

// Maps Component
const Maps = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Generated Maps</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Map Viewer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Interactive Map View</h3>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Satellite View</option>
                <option>Street View</option>
                <option>Hybrid View</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Layers className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Interactive Map Display</p>
            <p className="text-sm text-gray-500">Real-time map updates from AI processing pipeline</p>
          </div>
        </div>
      </div>

      {/* Map Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Points of Interest</h3>
              <p className="text-2xl font-bold text-blue-600">2,847</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Route className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Road Segments</h3>
              <p className="text-2xl font-bold text-green-600">12,456</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Accuracy Score</h3>
              <p className="text-2xl font-bold text-purple-600">96.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quality Check Component
const QualityCheck = () => {
  const qualityIssues = [
    { type: 'Missing Road Connection', severity: 'High', location: 'Downtown Area', count: 3 },
    { type: 'Incorrect POI Classification', severity: 'Medium', location: 'Shopping District', count: 7 },
    { type: 'Outdated Building Data', severity: 'Low', location: 'Residential Zone', count: 12 },
    { type: 'Traffic Rule Mismatch', severity: 'High', location: 'Highway Junction', count: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quality Assurance</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <CheckCircle className="h-4 w-4" />
            <span>Run Quality Check</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <FileText className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Quality Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Overall Score</h3>
              <p className="text-2xl font-bold text-green-600">94.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Critical Issues</h3>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pending Reviews</h3>
              <p className="text-2xl font-bold text-yellow-600">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Auto-Fixed</h3>
              <p className="text-2xl font-bold text-blue-600">128</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detected Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qualityIssues.map((issue, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {issue.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.severity === 'High' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Fix</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <Pipeline />;
      case 'data':
        return <DataSources />;
      case 'maps':
        return <Maps />;
      case 'quality':
        return <QualityCheck />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;