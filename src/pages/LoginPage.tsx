import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ 
        backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' 
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link to="/" className="flex items-center text-red-600 text-2xl font-bold">
          <Film className="mr-2" />
          <span>AulyaFlix</span>
        </Link>
      </div>
      
      <div className="bg-black/80 p-8 rounded-md w-full max-w-md z-10">
        <h1 className="text-white text-3xl font-bold mb-6">Masuk</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          
          <Button fullWidth >
            {loading ? 'Memuat...' : 'Masuk'}
          </Button>
        </form>
        
        <div className="mt-8">
          <p className="text-gray-400">
            Belum punya akun?{' '}
            <Link to="/signup" className="text-white hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;