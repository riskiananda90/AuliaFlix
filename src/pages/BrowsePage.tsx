import React, { useState } from 'react';
import MovieCard from '../components/ui/MovieCard';
import { movies } from '../data/movies';

const BrowsePage: React.FC = () => {
  const genres = Array.from(new Set(movies.flatMap(movie => movie.genre)));
  const years = Array.from(new Set(movies.map(movie => movie.year))).sort((a, b) => b - a);
  
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  
  const filteredMovies = movies.filter(movie => {
    if (selectedGenre !== 'All' && !movie.genre.includes(selectedGenre)) {
      return false;
    }
    
    if (selectedYear !== null && movie.year !== selectedYear) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return b.year - a.year;
    }
  });
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Browse</h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-400 mb-1">
                Genre
              </label>
              <select
                id="genre-filter"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 text-white text-sm rounded-md border-gray-700 focus:border-red-600 focus:ring-red-600 block w-full p-2.5"
              >
                <option value="All">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="year-filter" className="block text-sm font-medium text-gray-400 mb-1">
                Year
              </label>
              <select
                id="year-filter"
                value={selectedYear === null ? 'All' : selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'All' ? null : Number(e.target.value))}
                className="bg-gray-800 text-white text-sm rounded-md border-gray-700 focus:border-red-600 focus:ring-red-600 block w-full p-2.5"
              >
                <option value="All">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-400 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'year')}
              className="bg-gray-800 text-white text-sm rounded-md border-gray-700 focus:border-red-600 focus:ring-red-600 block w-full p-2.5"
            >
              <option value="title">Title (A-Z)</option>
              <option value="year">Release Year (Newest)</option>
            </select>
          </div>
        </div>
        
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.map(movie => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;