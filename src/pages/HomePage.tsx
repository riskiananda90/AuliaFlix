import React from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryRow from '../components/ui/CategoryRow';
import Button from '../components/ui/Button';
import { categories, getFeaturedMovie } from '../data/movies';

const HomePage: React.FC = () => {
  const featuredMovie = getFeaturedMovie();
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero section */}
      <div 
        className="relative w-full h-screen min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${featuredMovie.coverUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="absolute bottom-1/3 left-0 w-full md:w-1/2 p-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredMovie.title}</h1>
          <div className="flex items-center text-sm space-x-2 mb-4">
            <span className="text-green-500 font-semibold">98% Match</span>
            <span>{featuredMovie.year}</span>
            <span>{featuredMovie.duration}</span>
            <span className="border border-gray-600 px-1 text-xs">{featuredMovie.rating}</span>
          </div>
          <p className="text-gray-300 mb-6 line-clamp-3">{featuredMovie.description}</p>
          
          <div className="flex space-x-4">
            <Link to={`/watch/${featuredMovie.id}`}>
              <Button>
                <Play size={20} className="mr-2" /> Play
              </Button>
            </Link>
            <Link to={`/movie/${featuredMovie.id}`}>
              <Button variant="secondary">
                <Info size={20} className="mr-2" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="relative z-10 -mt-32">
        {categories.map(category => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;