import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Plus, Check } from 'lucide-react';
import Button from './Button';
import { Movie } from '../../types';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  large?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, large = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInList, setIsInList] = useState(false);
  
  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInList(!isInList);
  };
  
  return (
    <motion.div 
      className={`relative group ${large ? 'w-full aspect-video' : 'w-full aspect-[2/3]'} overflow-hidden rounded-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img 
        src={movie.thumbnailUrl} 
        alt={movie.title}
        className="w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
        <div className="flex items-center text-gray-300 text-sm space-x-2 mb-3">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
          <span>•</span>
          <span>{movie.rating}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/watch/${movie.id}`}>
            <Button size="sm" className="rounded-full">
              <Play size={16} className="mr-1" /> Putar
            </Button>
          </Link>
          <Link to={`/movie/${movie.id}`}>
            <Button size="sm" variant="secondary" className="rounded-full">
              <Info size={16} className="mr-1" /> Info
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="outlined" 
            className="rounded-full"
            onClick={handleAddToList}
          >
            {isInList ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Plus size={16} />
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;