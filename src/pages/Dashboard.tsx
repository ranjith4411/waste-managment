import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Recycle, Users, Building2, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock statistics data
  const stats = {
    totalWaste: '1,250 kg',
    recycledWaste: '850 kg',
    activeCollectors: 24,
    activeGenerators: 156,
    recyclingRate: '68%',
  };

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, <span className="text-green-600">{user?.username}</span>!
        </h1>
        <p className="mt-2 text-gray-600">
          You are logged in as a <span className="font-medium capitalize">{user?.role}</span>. 
          Choose one of our services below to get started.
        </p>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Trash2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Waste Collected</p>
            <p className="text-xl font-bold">{stats.totalWaste}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Recycle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Waste Recycled</p>
            <p className="text-xl font-bold">{stats.recycledWaste}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Recycling Rate</p>
            <p className="text-xl font-bold">{stats.recyclingRate}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Collectors</p>
            <p className="text-xl font-bold">{stats.activeCollectors}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Building2 className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Generators</p>
            <p className="text-xl font-bold">{stats.activeGenerators}</p>
          </div>
        </div>
      </div>

      {/* Services section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 p-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Trash2 className="h-5 w-5 mr-2" />
                Waste Disposal
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Connect waste generators with collectors. Submit your waste details or find available waste to collect.
              </p>
              <Link
                to="/waste-disposal"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Go to Waste Disposal
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 p-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Recycle className="h-5 w-5 mr-2" />
                Waste Recycle
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Register recyclable waste or find available recyclable materials from different communities.
              </p>
              <Link
                to="/waste-recycle"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Waste Recycle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;