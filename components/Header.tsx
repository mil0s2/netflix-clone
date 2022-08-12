import Image from 'next/image';
import Link from 'next/link';
import { BellIcon, SearchIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="header">
      <div className="relative flex items-center space-x-2 md:space-x-10">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="cursor-pointer"
          width={100}
          height={100}
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
        <Link href={'/account'}>
          <Image
            src="/images/account.png"
            alt="logo"
            className="cursor-pointer rounded"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
