import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen layout flex flex-col">
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
