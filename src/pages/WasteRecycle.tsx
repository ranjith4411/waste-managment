import React, { useState, useEffect } from 'react';
import { Recycle, Search, Building2, Users, Factory, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Types
interface RecycleSubmission {
  id: string;
  name: string;
  contact: string;
  community: string;
  wasteType: string;
  address: string;
  quantity: number;
  createdAt: Date;
  userId: string;
}

interface WasteCluster {
  id: string;
  wasteType: string;
  totalQuantity: number;
  locations: number;
  communities: string[];
}

const wasteTypes = [
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Organic',
  'Electronic',
  'Textile'
];

const communityTypes = [
  'Household',
  'Office',
  'School',
  'Hospital',
  'Restaurant',
  'Market',
  'Industry',
  'Public Space'
];

// Mock data
const mockRecycleSubmissions: RecycleSubmission[] = [
  {
    id: '1',
    name: 'Green Community Center',
    contact: '555-123-4567',
    community: 'Public Space',
    wasteType: 'Plastic',
    address: '123 Eco Park, Green City',
    quantity: 45,
    createdAt: new Date(2023, 5, 15),
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Tech Solutions Inc.',
    contact: '555-987-6543',
    community: 'Office',
    wasteType: 'Paper',
    address: '456 Business Ave, Eco City',
    quantity: 30,
    createdAt: new Date(2023, 5, 16),
    userId: 'user2'
  },
  {
    id: '3',
    name: 'Green Leaf Hospital',
    contact: '555-456-7890',
    community: 'Hospital',
    wasteType: 'Organic',
    address: '789 Health Blvd, Green Town',
    quantity: 60,
    createdAt: new Date(2023, 5, 17),
    userId: 'user3'
  },
  {
    id: '4',
    name: 'Eco School',
    contact: '555-789-0123',
    community: 'School',
    wasteType: 'Metal',
    address: '101 Education St, Eco City',
    quantity: 25,
    createdAt: new Date(2023, 5, 18),
    userId: 'user4'
  },
  {
    id: '5',
    name: 'Fresh Market',
    contact: '555-234-5678',
    community: 'Market',
    wasteType: 'Glass',
    address: '202 Commerce Rd, Green Town',
    quantity: 40,
    createdAt: new Date(2023, 5, 19),
    userId: 'user5'
  }
];

// Generate waste clusters from submissions
const generateWasteClusters = (submissions: RecycleSubmission[]): WasteCluster[] => {
  const clusterMap = new Map<string, WasteCluster>();
  
  submissions.forEach(sub => {
    if (!clusterMap.has(sub.wasteType)) {
      clusterMap.set(sub.wasteType, {
        id: Math.random().toString(36).substring(2, 9),
        wasteType: sub.wasteType,
        totalQuantity: 0,
        locations: 0,
        communities: []
      });
    }
    
    const cluster = clusterMap.get(sub.wasteType)!;
    cluster.totalQuantity += sub.quantity;
    cluster.locations += 1;
    if (!cluster.communities.includes(sub.community)) {
      cluster.communities.push(sub.community);
    }
  });
  
  return Array.from(clusterMap.values());
};

const WasteRecycle: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<RecycleSubmission[]>(mockRecycleSubmissions);
  const [filteredSubmissions, setFilteredSubmissions] = useState<RecycleSubmission[]>([]);
  const [wasteClusters, setWasteClusters] = useState<WasteCluster[]>([]);
  
  // Search filters
  const [searchWasteType, setSearchWasteType] = useState('');
  const [searchCommunity, setSearchCommunity] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [community, setCommunity] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate waste clusters when submissions change
  useEffect(() => {
    setWasteClusters(generateWasteClusters(submissions));
  }, [submissions]);

  // Filter submissions when search criteria change
  useEffect(() => {
    let filtered = [...submissions];
    
    if (searchWasteType) {
      filtered = filtered.filter(sub => sub.wasteType === searchWasteType);
    }
    
    if (searchCommunity) {
      filtered = filtered.filter(sub => sub.community === searchCommunity);
    }
    
    setFilteredSubmissions(filtered);
  }, [searchWasteType, searchCommunity, submissions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !contact || !community || !wasteType || !address || !quantity) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSubmission: RecycleSubmission = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        contact,
        community,
        wasteType,
        address,
        quantity: parseFloat(quantity),
        createdAt: new Date(),
        userId: user?.id || 'unknown'
      };
      
      setSubmissions([newSubmission, ...submissions]);
      
      // Reset form
      setName('');
      setContact('');
      setCommunity('');
      setWasteType('');
      setAddress('');
      setQuantity('');
      
      setIsSubmitting(false);
      toast.success('Recyclable waste registered successfully!');
    }, 1000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Search results updated');
  };

  const handleSelectCluster = (cluster: WasteCluster) => {
    toast.success(`You've selected to process ${cluster.wasteType} waste cluster. Generators will be notified.`);
  };

  const handleContactClick = (submission: RecycleSubmission) => {
    toast.success(`Contacting ${submission.name} at ${submission.contact}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Recycle className="h-6 w-6 mr-2 text-blue-600" />
          Waste Recycle Service
        </h1>
        <p className="mt-2 text-gray-600">
          Register recyclable waste or find available recyclable materials from different communities.
        </p>
      </div>

      {user?.role === 'generator' || user?.role === 'collector' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register Recyclable Waste</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your name or organization"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact Information
                  </label>
                  <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Phone or email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="community" className="block text-sm font-medium text-gray-700">
                    Community
                  </label>
                  <select
                    id="community"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select community type</option>
                    {communityTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                    Waste Type
                  </label>
                  <select
                    id="wasteType"
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select waste type</option>
                    {wasteTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Collection address"
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Estimated weight in kg"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Register Recyclable Waste'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Find Recyclable Waste</h2>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end mb-6">
              <div className="flex-grow">
                <label htmlFor="searchWasteType" className="block text-sm font-medium text-gray-700">
                  Waste Type
                </label>
                <select
                  id="searchWasteType"
                  value={searchWasteType}
                  onChange={(e) => setSearchWasteType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All waste types</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-grow">
                <label htmlFor="searchCommunity" className="block text-sm font-medium text-gray-700">
                  Community
                </label>
                <select
                  id="searchCommunity"
                  value={searchCommunity}
                  onChange={(e) => setSearchCommunity(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All communities</option>
                  {communityTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </form>
            
            {filteredSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{submission.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{submission.address}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-1 text-blue-500" />
                          <span>{submission.contact}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {submission.wasteType}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {submission.community}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {submission.quantity} kg
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => handleContactClick(submission)}
                          className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recyclable waste found for the selected criteria.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Factory className="h-5 w-5 mr-2 text-blue-600" />
              Waste Clusters for Processing
            </h2>
            <p className="text-gray-600 mb-6">
              As a recycling company, you can select waste clusters to process into raw materials.
            </p>
            
            {wasteClusters.length > 0 ? (
              <div className="space-y-4">
                {wasteClusters.map((cluster) => (
                  <div key={cluster.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 mr-2">
                            <Recycle className="h-5 w-5" />
                          </span>
                          {cluster.wasteType} Waste Cluster
                        </h3>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="flex items-center">
                            <span className="text-gray-500 text-sm mr-2">Total Quantity:</span>
                            <span className="font-medium">{cluster.totalQuantity} kg</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 text-sm mr-2">Locations:</span>
                            <span className="font-medium">{cluster.locations}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 text-sm mr-2">Communities:</span>
                            <span className="font-medium">{cluster.communities.length}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500 text-sm">Community Types:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {cluster.communities.map((comm) => (
                              <span key={comm} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {comm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex items-start">
                        <button
                          onClick={() => handleSelectCluster(cluster)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Select for Processing
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No waste clusters available for processing.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteRecycle;