import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Filter,
  Satellite,
  Navigation,
  Camera,
  Database,
  Activity,
  Map,
  Download,
  RefreshCw,
  MapPin,
  Layers,
  Zap,
  Globe,
  Crosshair,
  Route,
  Car,
  Building
} from 'lucide-react';

const DataSources = () => {
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [showGeoJson, setShowGeoJson] = useState(false);
  const [configuredSources, setConfiguredSources] = useState([]);
  const [configuringSource, setConfiguringSource] = useState(null);

  const dataSources = [
    { name: 'Open Street Maps', type: 'Vector Tiles', status: 'Active', lastUpdate: '2 min ago', icon: Map, color: 'blue', coverage: '99.8%' },
    { name: 'JustDial Data', type: 'POI Data', status: 'Inactive', lastUpdate: '2 hours ago', icon: Building, color: 'purple', coverage: '92.1%' },
    { name: 'Wikipedia', type: 'Navigation', status: 'Active', lastUpdate: '10 min ago', icon: Route, color: 'teal', coverage: '98.9%' },
    { name: 'HERE Satellite', type: 'Imagery', status: 'Active', lastUpdate: '5 min ago', icon: Satellite, color: 'green', coverage: '95.2%' },
    { name: 'Traffic Cameras', type: 'Real-time Video', status: 'Active', lastUpdate: '1 min ago', icon: Camera, color: 'orange', coverage: '87.5%' },
    { name: 'Fleet Tracking', type: 'Vehicle IoT', status: 'Active', lastUpdate: '30 sec ago', icon: Car, color: 'cyan', coverage: '96.7%' },
    
  ];

  // Mock GeoJSON data that would be fetched from data folder
  const mockGeoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "HERE Office Berlin",
          category: "office",
          rating: 4.8
        },
        geometry: {
          type: "Point",
          coordinates: [13.4050, 52.5200]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Brandenburg Gate",
          category: "landmark",
          description: "Historical monument"
        },
        geometry: {
          type: "Point",
          coordinates: [13.3777, 52.5163]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Traffic Analysis Zone",
          category: "traffic",
          status: "active"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [13.3500, 52.5000],
            [13.4000, 52.5000],
            [13.4000, 52.5300],
            [13.3500, 52.5300],
            [13.3500, 52.5000]
          ]]
        }
      }
    ]
  };

  const handleConfigure = async (sourceName) => {
    setConfiguringSource(sourceName);
    
    // Simulate configuration process
    setTimeout(() => {
      setConfiguringSource(null);
      setConfiguredSources(prev => [...prev, sourceName]);
    }, 10000);
  };

  const handleAddSource = async () => {
    setIsAddingSource(true);
    
    // Simulate adding new source
    setTimeout(() => {
      setIsAddingSource(false);
      setShowGeoJson(true);
    }, 2000);
  };

  const downloadPDF = () => {
    // Create a simple PDF-like content (in real app, use jsPDF or similar)
    const geoJsonString = JSON.stringify(mockGeoJsonData, null, 2);
    const blob = new Blob([geoJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'here-geojson-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Crosshair className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );

  // Animated map grid background
  const MapGrid = () => (
    <div className="fixed inset-0 opacity-5 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* HERE-style animated background */}
      <MapGrid />
      
      {/* Floating map elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-500 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-indigo-500 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-blue-600 rounded-full animate-ping opacity-50"></div>
        
        {/* Subtle route lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <path d="M 100 200 Q 300 100 500 300 T 800 400" stroke="#3b82f6" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M 200 500 Q 400 300 600 600 T 900 500" stroke="#06b6d4" strokeWidth="1.5" fill="none" className="animate-pulse" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* HERE-style Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
              <div className="relative bg-white rounded-full p-4 shadow-lg border border-blue-100">
                <Globe className="h-12 w-12 text-blue-600 animate-spin-slow" />
              </div>
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-5xl font-light text-gray-800 mb-2">
                HERE <span className="font-semibold text-blue-600">Location Intelligence</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 font-light">
            Powering location-aware applications with real-time geospatial data
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-light text-gray-800 flex items-center">
              <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                <Layers className="h-8 w-8 text-blue-600" />
              </div>
              Data Layer Management
            </h2>
            <div className="flex space-x-4">
              <button 
                onClick={handleAddSource}
                disabled={isAddingSource}
                className="flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 font-medium"
              >
                {isAddingSource ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                <span>{isAddingSource ? 'Connecting...' : 'Add Data Source'}</span>
              </button>
              <button className="flex items-center space-x-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium">
                <Filter className="h-5 w-5" />
                <span>Filter Layers</span>
              </button>
            </div>
          </div>

          {/* Loading State for Add Source */}
          {isAddingSource && (
            <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-8 mb-8">
              <h3 className="text-2xl font-light text-gray-800 mb-4 text-center flex items-center justify-center">
                <Crosshair className="h-6 w-6 text-blue-600 mr-3 animate-spin" />
                Establishing Connection...
              </h3>
              <LoadingSpinner />
              <p className="text-center text-gray-600 mt-4 font-light">
                Validating data source authenticity and coverage
              </p>
            </div>
          )}

          {/* Data Sources Grid - HERE Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dataSources.map((source, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-blue-200 p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 bg-gradient-to-br from-${source.color}-500 to-${source.color}-600 rounded-xl shadow-lg`}>
                          <source.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{source.name}</h3>
                          <p className="text-gray-500 text-sm font-light">{source.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${source.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          source.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {source.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 bg-blue-50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 font-light">Last Update</span>
                        <p className="text-gray-800 font-medium">{source.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 font-light">Coverage</span>
                        <p className="text-blue-600 font-semibold flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {source.coverage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-light">Data Quality</span>
                        <span className="text-green-600 font-semibold flex items-center">
                          <Zap className="h-4 w-4 mr-1" />
                          95%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-[95%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button 
                        onClick={() => handleConfigure(source.name)}
                        disabled={configuringSource !== null && configuringSource !== source.name}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300 text-sm font-medium disabled:opacity-50"
                      >
                        {configuringSource === source.name ? (
                          <div className="flex items-center justify-center">
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Configuring
                          </div>
                        ) : 'Configure'}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:shadow-lg transition-all duration-300 text-sm font-medium">
                        View Layer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GeoJSON Results */}
          {showGeoJson && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-light text-gray-800 flex items-center">
                  <div className="bg-blue-100 p-2 rounded-xl mr-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  Generated Location Data
                </h3>
                <button 
                  onClick={downloadPDF}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <Download className="h-5 w-5" />
                  <span>Export GeoJSON</span>
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-300 max-h-96 overflow-y-auto mb-6">
                <pre className="text-green-400 text-sm font-mono leading-relaxed">
                  {JSON.stringify(mockGeoJsonData, null, 2)}
                </pre>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-700 font-medium">Features Mapped</h4>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{mockGeoJsonData.features.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Location points processed</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-700 font-medium">Active Sources</h4>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{dataSources.filter(s => s.status === 'Active').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Real-time data streams</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-700 font-medium">Accuracy Score</h4>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Crosshair className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">98.5%</p>
                  <p className="text-sm text-gray-500 mt-1">Location precision</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HERE-style footer */}
        <div className="text-center py-8">
          <p className="text-gray-500 font-light">
            Powered by HERE Location Services • Real-time global coverage
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DataSources;