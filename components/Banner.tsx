import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useRecoilState } from 'recoil';

import { baseUrl } from '../constants/movie';
import { Movie } from '../typings';
import { PlayIcon } from '@heroicons/react/solid';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [_, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    if (netflixOriginals.length > 0) {
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
    }
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col justify-end gap-2 py-16 pt-32 md:gap-4 lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          priority
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt={`${movie?.title} movie poster`}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <h1 className="text-shadow-md max-w-4xl text-2xl font-semibold lg:pt-52 lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="lg:font-2xl text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl">
        {movie?.overview}
      </p>

      <div className="flex gap-3">
        <button className="bannerButton bg-white text-black">
          <PlayIcon className="-ml-3 h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          onClick={() => {
            setShowModal(true);
            setCurrentMovie(movie);
          }}
          className="bannerButton bg-[gray]/70"
        >
          <InformationCircleIcon className="-ml-1 h-4 w-4 md:h-7 md:w-7" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
