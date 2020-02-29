import { ReactNode } from 'react';
import ThemeToggle from '../ThemeToggle';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen layout flex flex-col">
      <div className="flex items-center bg-secondary py-2 h-12 sticky top-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto container">
          <div className="items-center flex">
            <img
              src="/images/avatar.jpg"
              alt="Avatar of Anthony Oyathelemhi"
              height={40}
              width={40}
              className="rounded-full mr-4"
            />
            <div>
              <p className="font-bold">Anthony Oyathelemhi</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
      {children}
      <div className="bg-secondary py-2 text-center mt-auto">
        <p>
          <span className="italic">All articles written by</span>
          <a href="https://oghie.dev" className="ml-2">
            Anthony Oyathelemhi
          </a>
        </p>
        <div className="flex justify-center mb-4">
          <a href="https://twitter.com/frontendtony">Twitter</a>
          <a href="https://github.com/frontendtony" className="mx-4">
            Github
          </a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
