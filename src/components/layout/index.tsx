import { ReactElement } from 'react';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-purple-100">
      <div className="h-16 bg-purple-900 text-white flex">
        <div className="flex items-center justify-around flex-grow self-center">
          <img src="/images/html5.png" alt="HTML5 black and white" className="w-8 md:w-8" />
          <img src="/images/css3.png" alt="CSS3 black and white" className="w-8 md:w-8" />
          <img src="/images/reactjs.png" alt="Reactjs black and white" className="w-8 md:w-8" />
          <img src="/images/nextjs.png" alt="Nextjs black and white" className="w-12" />
        </div>
        <div className="bg-white pl-4 py-2 pr-2 text-black md:w-72 items-center hidden md:flex">
          <img
            src="/images/avatar.jpg"
            alt="Avatar of Anthony Oyathelemhi"
            height={50}
            width={50}
            className="rounded-full mr-2"
          />
          <div>
            <p className="font-bold">Anthony Oyathelemhi</p>
            <span className="text-sm">Software Engineer</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
