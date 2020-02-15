import { ReactElement } from 'react';
import ThemeToggle from '../ThemeToggle';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="min-h-screen layout">
      <div className="flex items-center bg-secondary py-2 h-16">
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
      <div className="container mx-auto mt-10 max-w-4xl">{children}</div>
    </div>
  );
};

export default Layout;
