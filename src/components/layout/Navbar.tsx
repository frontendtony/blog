import Image from 'next/image';
import avatarUrl from '../../../public/images/avatar.png';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  return (
    <div className="flex items-center bg-secondary py-2 h-12 mb-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto container">
        <div className="items-center flex">
          <Image
            src={avatarUrl}
            alt="Avatar of Anthony Oyathelemhi"
            height={40}
            width={40}
            className="rounded-full"
          />
          <p className="font-bold ml-4">Anthony Oyathelemhi</p>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
