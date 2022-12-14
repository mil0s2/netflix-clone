import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import MuiModal from '@mui/material/Modal';
import { XIcon } from '@heroicons/react/outline';
import ReactPlayer from 'react-player/lazy';

import { modalState, movieState } from '../atoms/modalAtom';
import { Element, Genre } from '../typings';
import {
  PlayIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex((el: Element) => {
          return el.type === 'Trailer';
        });
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };
    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              trailer
                ? `https://www.youtube.com/watch?v=${trailer}`
                : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-12 flex w-full items-center justify-between px-10 sm:bottom-16 md:bottom-20">
            <div className="flex space-x-4">
              <button className="flex items-center gap-x-2 rounded bg-white pl-5 pr-7 text-xl font-bold text-black transition hover:bg-cream">
                <PlayIcon className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>

              <button className="modalButton">
                <ThumbUpIcon className="mb-1 h-7 w-7" />
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => setMuted((prev) => !prev)}
            >
              {muted ? (
                <VolumeOffIcon className="h-7 w-7" />
              ) : (
                <VolumeUpIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.floor(movie!.vote_average * 10)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
