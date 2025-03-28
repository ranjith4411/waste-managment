import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Recycle, Trash2, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Recycle size={28} />
            <span className="text-xl font-bold">EcoConnect</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-green-200 transition ${location.pathname === '/' ? 'font-semibold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/waste-disposal" 
              className={`hover:text-green-200 transition ${location.pathname === '/waste-disposal' ? 'font-semibold' : ''}`}
            >
              Waste Disposal
            </Link>
            <Link 
              to="/waste-recycle" 
              className={`hover:text-green-200 transition ${location.pathname === '/waste-recycle' ? 'font-semibold' : ''}`}
            >
              Waste Recycle
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-green-700 hover:bg-green-800 px-3 py-1 rounded-md transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-green-700 px-4 py-2">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`hover:text-green-200 transition ${location.pathname === '/' ? 'font-semibold' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/waste-disposal" 
                className={`hover:text-green-200 transition ${location.pathname === '/waste-disposal' ? 'font-semibold' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Waste Disposal
              </Link>
              <Link 
                to="/waste-recycle" 
                className={`hover:text-green-200 transition ${location.pathname === '/waste-recycle' ? 'font-semibold' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Waste Recycle
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 px-3 py-1 rounded-md transition w-full"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Recycle size={24} />
              <span className="text-lg font-bold">EcoConnect</span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} EcoConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;