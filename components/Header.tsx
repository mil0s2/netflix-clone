import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BellIcon, SearchIcon } from '@heroicons/react/outline';

import useAuth from '../hooks/useAuth';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled ? 'bg-customBlack' : 'headerBg'}`}>
      <div className="relative flex items-center space-x-2 md:space-x-10">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="cursor-pointer"
          width={118}
          height={32}
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center gap-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <div className="relative">
          <Image
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}
            src="/images/account.png"
            alt="logo"
            className="cursor-pointer rounded"
            width={32}
            height={32}
          />
          {showOptions && (
            <div className="absolute right-0 rounded-md bg-[#181818] py-4">
              <button
                onClick={logout}
                className="w-full px-4 py-2 hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
