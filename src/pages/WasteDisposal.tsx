import React, { useState, useEffect } from 'react';
import { Trash2, Search, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Types
interface WasteSubmission {
  id: string;
  name: string;
  address: string;
  phone: string;
  wasteType: string;
  quantity: number;
  cost: number;
  createdAt: Date;
  userId: string;
}

const wasteTypes = [
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Organic',
  'Electronic',
  'Hazardous',
  'Construction',
  'Textile',
  'Other'
];

// Mock data
const mockWasteSubmissions: WasteSubmission[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Green Street, Eco City',
    phone: '555-123-4567',
    wasteType: 'Plastic',
    quantity: 25,
    cost: 50,
    createdAt: new Date(2023, 5, 15),
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '456 Recycle Avenue, Eco City',
    phone: '555-987-6543',
    wasteType: 'Paper',
    quantity: 15,
    cost: 30,
    createdAt: new Date(2023, 5, 16),
    userId: 'user2'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    address: '789 Compost Lane, Green Town',
    phone: '555-456-7890',
    wasteType: 'Organic',
    quantity: 40,
    cost: 35,
    createdAt: new Date(2023, 5, 17),
    userId: 'user3'
  },
  {
    id: '4',
    name: 'Alice Williams',
    address: '101 Metal Road, Eco City',
    phone: '555-789-0123',
    wasteType: 'Metal',
    quantity: 30,
    cost: 75,
    createdAt: new Date(2023, 5, 18),
    userId: 'user4'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    address: '202 Glass Blvd, Green Town',
    phone: '555-234-5678',
    wasteType: 'Glass',
    quantity: 20,
    cost: 40,
    createdAt: new Date(2023, 5, 19),
    userId: 'user5'
  }
];

const WasteDisposal: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<WasteSubmission[]>(mockWasteSubmissions);
  const [filteredSubmissions, setFilteredSubmissions] = useState<WasteSubmission[]>([]);
  const [selectedWasteType, setSelectedWasteType] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter submissions when waste type changes
  useEffect(() => {
    if (selectedWasteType) {
      setFilteredSubmissions(submissions.filter(sub => sub.wasteType === selectedWasteType));
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [selectedWasteType, submissions]);

  const handleGeneratorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !address || !phone || !wasteType || !quantity) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSubmission: WasteSubmission = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        address,
        phone,
        wasteType,
        quantity: parseFloat(quantity),
        cost: parseFloat(quantity) * 2, // Simple cost calculation
        createdAt: new Date(),
        userId: user?.id || 'unknown'
      };
      
      setSubmissions([newSubmission, ...submissions]);
      
      // Reset form
      setName('');
      setAddress('');
      setPhone('');
      setWasteType('');
      setQuantity('');
      
      setIsSubmitting(false);
      toast.success('Waste submission successful! Collectors will be notified.');
    }, 1000);
  };

  const handleCollectorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWasteType) {
      toast.error('Please select a waste type to search');
      return;
    }
    
    toast.success(`Showing available ${selectedWasteType} waste for collection`);
  };

  const handleSelectGenerator = (submission: WasteSubmission) => {
    toast.success(`You've selected to collect waste from ${submission.name}. They will be notified.`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trash2 className="h-6 w-6 mr-2 text-green-600" />
          Waste Disposal Service
        </h1>
        <p className="mt-2 text-gray-600">
          Connect waste generators with collectors. Submit your waste details or find available waste to collect.
        </p>
      </div>

      {user?.role === 'generator' ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Submit Waste for Collection</h2>
          
          <form onSubmit={handleGeneratorSubmit} className="space-y-4">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Your name or organization"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Contact phone number"
                />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Collection address"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                  Type of Waste
                </label>
                <select
                  id="wasteType"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option value="">Select waste type</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Estimated weight in kg"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Waste for Collection'}
              </button>
            </div>
          </form>
        </div>
      ) : user?.role === 'collector' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Find Waste to Collect</h2>
            
            <form onSubmit={handleCollectorSearch} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-grow">
                <label htmlFor="searchWasteType" className="block text-sm font-medium text-gray-700">
                  Type of Waste
                </label>
                <select
                  id="searchWasteType"
                  value={selectedWasteType}
                  onChange={(e) => setSelectedWasteType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option value="">All waste types</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedWasteType 
                ? `Available ${selectedWasteType} Waste` 
                : 'Available Waste for Collection'}
            </h2>
            
            {filteredSubmissions.length > 0 ? (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{submission.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {submission.address}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {submission.wasteType}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {submission.quantity} kg
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            ${submission.cost}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button
                          onClick={() => handleSelectGenerator(submission)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Select for Collection
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No waste submissions found for the selected criteria.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Company View</h2>
          <p className="text-gray-600">
            As a recycling company, you can view waste clusters in the Waste Recycle section.
          </p>
        </div>
      )}
    </div>
  );
};

export default WasteDisposal;