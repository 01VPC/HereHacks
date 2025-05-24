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
  Globe
} from 'lucide-react';

const DataSources = () => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [showGeoJson, setShowGeoJson] = useState(false);
  const [configuredSources, setConfiguredSources] = useState([]);

  const dataSources = [
    { name: 'Open Street Maps', type: 'Image', status: 'Active', lastUpdate: '2 min ago', icon: Satellite, color: 'blue' },
    { name: 'Map Satellite Imagery', type: 'Trajectory', status: 'Active', lastUpdate: '5 min ago', icon: Navigation, color: 'green' },
    { name: 'Traffic Cameras', type: 'Video', status: 'Active', lastUpdate: '1 min ago', icon: Camera, color: 'purple' },
    { name: 'JustDial Data', type: '3D Point Cloud', status: 'Inactive', lastUpdate: '2 hours ago', icon: Database, color: 'orange' },
    { name: '3rd Party API', type: 'IoT', status: 'Active', lastUpdate: '30 sec ago', icon: Activity, color: 'red' },
    { name: 'Wikipedia', type: 'Vector', status: 'Active', lastUpdate: '10 min ago', icon: Map, color: 'indigo' }
  ];

  // Mock GeoJSON data that would be fetched from data folder
  const mockGeoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "JustDial Restaurant",
          category: "restaurant",
          rating: 4.5
        },
        geometry: {
          type: "Point",
          coordinates: [77.2090, 28.6139]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Wikipedia Location",
          category: "landmark",
          description: "Historical monument"
        },
        geometry: {
          type: "Point",
          coordinates: [77.2300, 28.6200]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Traffic Camera Zone",
          category: "traffic",
          status: "active"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [77.2000, 28.6000],
            [77.2100, 28.6000],
            [77.2100, 28.6100],
            [77.2000, 28.6100],
            [77.2000, 28.6000]
          ]]
        }
      }
    ]
  };

  const handleConfigure = async (sourceName) => {
    setIsConfiguring(true);
    
    // Simulate configuration process
    setTimeout(() => {
      setIsConfiguring(false);
      setConfiguredSources(prev => [...prev, sourceName]);
      setShowGeoJson(true);
    }, 2000);
  };

  const handleAddSource = async () => {
    setIsAddingSource(true);
    
    // Simulate adding new source
    setTimeout(() => {
      setIsAddingSource(false);
    }, 2000);
  };

  const downloadPDF = () => {
    // Create a simple PDF-like content (in real app, use jsPDF or similar)
    const geoJsonString = JSON.stringify(mockGeoJsonData, null, 2);
    const blob = new Blob([geoJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'geojson-data.json';
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
          <RefreshCw className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-cyan-400 mr-4 animate-spin-slow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GeoSpatial Data Hub
            </h1>
          </div>
          <p className="text-xl text-gray-300">Real-time mapping intelligence at your fingertips</p>
        </div>

        {/* Control Panel */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Layers className="h-8 w-8 text-cyan-400 mr-3" />
              Active Data Streams
            </h2>
            <div className="flex space-x-4">
              <button 
                onClick={handleAddSource}
                disabled={isAddingSource}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {isAddingSource ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                <span>{isAddingSource ? 'Adding...' : 'Add Source'}</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Data Sources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dataSources.map((source, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 bg-gradient-to-br from-${source.color}-400 to-${source.color}-600 rounded-xl shadow-lg`}>
                        <source.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{source.name}</h3>
                        <p className="text-gray-400">{source.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${source.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        source.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {source.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Update:</span>
                      <span className="text-white">{source.lastUpdate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Data Quality:</span>
                      <span className="text-green-400 flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        95%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full w-[95%]"></div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleConfigure(source.name)}
                      disabled={isConfiguring}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm font-medium disabled:opacity-50"
                    >
                      {isConfiguring ? 'Configuring...' : 'Configure'}
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium">
                      View Data
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {(isConfiguring || isAddingSource) && (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                {isConfiguring ? 'Processing Data Sources...' : 'Adding New Source...'}
              </h3>
              <LoadingSpinner />
              <p className="text-center text-gray-400 mt-4">
                {isConfiguring ? 'Fetching data from configured sources' : 'Validating new data source'}
              </p>
            </div>
          )}

          {/* GeoJSON Results */}
          {showGeoJson && (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center">
                  <MapPin className="h-6 w-6 text-cyan-400 mr-2" />
                  Generated GeoJSON Data
                </h3>
                <button 
                  onClick={downloadPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Download JSON</span>
                </button>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 max-h-96 overflow-y-auto">
                <pre className="text-green-400 text-sm font-mono">
                  {JSON.stringify(mockGeoJsonData, null, 2)}
                </pre>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                  <h4 className="text-white font-medium mb-2">Features Found</h4>
                  <p className="text-2xl font-bold text-cyan-400">{mockGeoJsonData.features.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-500/30">
                  <h4 className="text-white font-medium mb-2">Data Sources</h4>
                  <p className="text-2xl font-bold text-green-400">{configuredSources.length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                  <h4 className="text-white font-medium mb-2">Quality Score</h4>
                  <p className="text-2xl font-bold text-purple-400">98.5%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DataSources;