import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Youtube size={20} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:underline">Audio Description</Link></li>
              <li><Link to="/" className="hover:underline">Investor Relations</Link></li>
              <li><Link to="/" className="hover:underline">Legal Notices</Link></li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:underline">Help Center</Link></li>
              <li><Link to="/" className="hover:underline">Jobs</Link></li>
              <li><Link to="/" className="hover:underline">Cookie Preferences</Link></li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:underline">Gift Cards</Link></li>
              <li><Link to="/" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="/" className="hover:underline">Corporate Information</Link></li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:underline">Media Center</Link></li>
              <li><Link to="/" className="hover:underline">Privacy</Link></li>
              <li><Link to="/" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex items-center mb-4">
            <Globe size={16} className="mr-2" />
            <select className="bg-transparent text-sm border border-gray-600 rounded px-2 py-1">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          
          <p className="text-sm">&copy; 2025 AulyaFlix, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;