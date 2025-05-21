import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '../components/ui/VideoPlayer';
import { getMovieById } from '../data/movies';


const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || '');
  
  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">Movie not found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-black min-h-screen">
      <div className="absolute top-4 left-4 z-20">
        <Link to={`/movie/${movie.id}`} className="text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </Link>
      </div>
      
      <div className="w-full h-screen flex items-center justify-center">
        <VideoPlayer poster={movie.videoUrl} videoUrl={movie.videoUrl} />
      </div>
    </div>
  );
};

export default WatchPage;