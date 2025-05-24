import React from 'react';
import { 
  Database, 
  Cpu, 
  RefreshCw, 
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';

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

export default Dashboard;