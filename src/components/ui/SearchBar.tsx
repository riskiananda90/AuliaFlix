import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { movies } from '../../data/movies';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(movies);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const filteredResults = movies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredResults);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={searchContainerRef} className="relative">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center text-gray-200 hover:text-white transition-colors"
          aria-label="Buka pencarian"
        >
          <Search size={20} />
        </button>
      ) : (
        <div className="absolute right-0 top-0 z-20 bg-black/90 border border-gray-700 rounded-md min-w-[300px] shadow-xl">
          <div className="flex items-center p-2 border-b border-gray-700">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul film, genre..."
              className="flex-1 bg-transparent text-white outline-none"
            />
            {query && (
              <button onClick={clearSearch} className="text-gray-400" aria-label="Hapus pencarian">
                <X size={18} />
              </button>
            )}
          </div>
          
          {query && (
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((movie) => (
                    <Link 
                      key={movie.id} 
                      to={`/movie/${movie.id}`}
                      className="flex items-center p-2 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <img 
                        src={movie.thumbnailUrl} 
                        alt={movie.title} 
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium">{movie.title}</h4>
                        <p className="text-gray-400 text-xs">{movie.genre.join(', ')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400">
                  Tidak ada hasil untuk "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;