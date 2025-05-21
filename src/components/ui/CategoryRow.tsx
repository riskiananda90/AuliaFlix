import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Category } from '../../types';

interface CategoryRowProps {
  category: Category;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Check if arrows should be shown after scroll
      setTimeout(() => {
        if (sliderRef.current) {
          setShowLeftArrow(sliderRef.current.scrollLeft > 0);
          setShowRightArrow(
            sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth - 10
          );
        }
      }, 300);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-white text-xl font-semibold mb-4 pl-4 md:pl-8">{category.name}</h2>
      
      <div className="relative group">
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide px-4 md:px-8 space-x-4 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={() => {
            if (sliderRef.current) {
              setShowLeftArrow(sliderRef.current.scrollLeft > 0);
              setShowRightArrow(
                sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth - 10
              );
            }
          }}
        >
          {category.movies.map(movie => (
            <div key={movie.id} className="flex-shrink-0 w-[180px] md:w-[220px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryRow;