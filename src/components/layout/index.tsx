import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen layout flex flex-col max-w-2xl py-8 px-5 mx-auto">
      {children}
      <div className="bg-secondary py-2 text-center justify-self-end mt-10">
        <p className="mt-4">
          <span className="italic">All articles written by</span>
          <a href="https://frontendtony.com" className="ml-2 p-4">
            Anthony Oyathelemhi
          </a>
        </p>
        <div className="flex justify-center my-4">
          <a href="https://twitter.com/frontendtony" className="p-2">
            Twitter
          </a>
          <a href="https://github.com/frontendtony" className="mx-4 p-2">
            Github
          </a>
          <a href="https://www.linkedin.com/in/tonerolima/" className="p-2">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
