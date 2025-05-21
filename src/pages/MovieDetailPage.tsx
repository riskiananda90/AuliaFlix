import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Share2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import MovieCard from '../components/ui/MovieCard';
import { getMovieById, movies } from '../data/movies';
import { Movie } from '../types';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      setMovie(foundMovie || null);
      
      if (foundMovie) {
        // Find related movies by genre
        const related = movies
          .filter(m => 
            m.id !== foundMovie.id && 
            m.genre.some(g => foundMovie.genre.includes(g))
          )
          .slice(0, 6);
        
        setRelatedMovies(related);
      }
    }
    
    // Reset trailer when the component loads
    setShowTrailer(false);
  }, [id]);
  
  if (!movie) {
    return (
      <div className="bg-black min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-white text-2xl">Movie not found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative w-full h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.coverUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative -mt-64 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex items-center text-sm space-x-2 mb-6">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{movie.duration}</span>
                <span className="border border-gray-600 px-1 text-xs text-gray-300">{movie.rating}</span>
              </div>
              
              <div className="flex space-x-4 mb-8">
                <Link to={`/watch/${movie.id}`}>
                  <Button>
                    <Play size={20} className="mr-2" /> Play
                  </Button>
                </Link>
                <Button variant="outlined" onClick={() => setShowTrailer(true)}>
                  <Play size={20} className="mr-2" /> Trailer
                </Button>
              </div>
              
              <p className="text-gray-300 mb-8">{movie.description}</p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                <div>
                  <span className="text-gray-400 text-sm">Cast:</span>{' '}
                  <span className="text-white text-sm">{movie.cast.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Director:</span>{' '}
                  <span className="text-white text-sm">{movie.director}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Genres:</span>{' '}
                  <span className="text-white text-sm">{movie.genre.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-white">
                <button className="flex flex-col items-center">
                  <ThumbsUp className="mb-1" size={20} />
                  <span className="text-xs">Rate</span>
                </button>
                <button className="flex flex-col items-center">
                  <Plus className="mb-1" size={20} />
                  <span className="text-xs">My List</span>
                </button>
                <button className="flex flex-col items-center">
                  <Share2 className="mb-1" size={20} />
                  <span className="text-xs">Share</span>
                </button>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* Placeholder for additional content or sidebar */}
            </div>
          </div>
          
          {/* More like this */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {relatedMovies.map(relatedMovie => (
                <MovieCard key={relatedMovie.id} movie={relatedMovie} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              aria-label="Close trailer"
            >
              <X size={24} />
            </button>
            
            <div className="w-full aspect-video">
              <iframe
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;