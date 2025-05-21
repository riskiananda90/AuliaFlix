import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Bell, ChevronDown } from 'lucide-react';
import { getCurrentUser } from '../../data/users';
import SearchBar from '../ui/SearchBar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-red-600 text-2xl font-bold">
              <Film className="mr-2" />
              <span>AulyaFlix</span>
            </Link>
            
            <nav className="hidden md:flex ml-8 space-x-6">
              <Link 
                to="/" 
                className={`text-sm ${location.pathname === '/' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} transition-colors`}
              >
                Beranda
              </Link>
              <Link 
                to="/browse" 
                className={`text-sm ${location.pathname === '/browse' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} transition-colors`}
              >
                Jelajahi
              </Link>
              <Link 
                to="/my-list" 
                className={`text-sm ${location.pathname === '/my-list' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} transition-colors`}
              >
                Daftar Saya
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar />
            
            <Link to="/notifications" className="text-gray-200 hover:text-white transition-colors">
              <Bell size={20} />
            </Link>
            
            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <img 
                  src={currentUser.avatar} 
                  alt="Profile" 
                  className="w-8 h-8 object-cover rounded-md"
                />
                <ChevronDown size={16} className={`ml-1 text-white transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showProfileMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1 z-10"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                    Profil
                  </Link>
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                    Akun
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                    Pengaturan
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                    Keluar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;