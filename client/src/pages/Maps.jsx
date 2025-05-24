import React from 'react';
import { 
  Download, 
  Settings,
  Layers,
  MapPin,
  Route,
  TrendingUp,
  Map
} from 'lucide-react';

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

export default Maps;