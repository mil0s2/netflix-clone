import { useRef, useState } from 'react';

import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { DocumentData } from 'firebase/firestore';

import { Movie } from '../typings';
import Thumbnail from './Thumbnail';

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);

  const handleMove = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      setPrevScrollLeft(scrollTo);
      if (prevScrollLeft === scrollTo) {
        rowRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      } else rowRef.current?.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-cream transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleMove('left')}
          className={`${
            !isMoved && 'hidden'
          } absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies &&
            movies.map((movie) => {
              return <Thumbnail key={movie.id} movie={movie} />;
            })}
        </div>

        <ChevronRightIcon
          onClick={() => handleMove('right')}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default Row;
