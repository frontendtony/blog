import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  return (
    <div className="flex items-center bg-secondary py-2 h-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto container">
        <div className="items-center flex">
          <img
            src="/images/avatar.jpg"
            alt="Avatar of Anthony Oyathelemhi"
            height={40}
            width={40}
            className="rounded-full mr-4"
          />
          <p className="font-bold">Anthony Oyathelemhi</p>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
