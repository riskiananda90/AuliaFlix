import React from 'react';
import MovieCard from '../components/ui/MovieCard';
import { movies } from '../data/movies';

const MyListPage: React.FC = () => {
  // In a real app, this would come from user data
  // For demo, just use some random movies
  const myListMovies = movies.slice(0, 3);
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My List</h1>
        
        {myListMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {myListMovies.map(movie => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">Your list is empty.</p>
            <p className="text-gray-500">Add shows and movies to your list to watch them later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListPage;