import { promises as fs } from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import readingTime from 'reading-time';
import avatarUrl from '../../public/images/avatar.png';
import githubImageUrl from '../../public/images/github.png';
import linkedInImageUrl from '../../public/images/linkedin.png';
import twitterImageUrl from '../../public/images/twitter.png';
import ThemeToggle from '../components/ThemeToggle';
import { formatDate, orderPosts } from '../utils/blogHelpers';

type Blog = {
  title: string;
  slug: string;
  date: string;
  estimatedReadingTime: string;
  summary: string;
};

const Home = ({ allBlogs }: { allBlogs: Blog[] }) => {
  return (
    <main className="container mx-auto p-2 md:px-8">
      <div className="absolute right-0 mr-4 mt-2 md:mr-6">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center self-center px-4 mt-20 md:mt-28 mx-auto mb-8 max-w-md">
        <Image
          src={avatarUrl}
          alt="Avatar of Anthony Oyathelemhi"
          className="rounded-full mr-4"
          width={160}
          height={160}
        />
        <p className="text-center text-3xl font-bold leading-none mt-4">Anthony Oyathelemhi</p>
        <p className="text-center text-lg my-2 opacity-75">
          Sofware Engineer, Master of all thing Frontend
        </p>
        <div className="flex items-center mt-4">
          <a
            href="http://twitter.com/frontendtony"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <Image src={twitterImageUrl} alt="Twitter logo" />
          </a>
          <a
            href="http://github.com/frontendtony"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <Image src={githubImageUrl} alt="Github logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/tonerolima/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <Image src={linkedInImageUrl} alt="Linkedin logo" />
          </a>
        </div>
      </div>
      <ul className="max-w-3xl mx-auto list-none p-0">
        {allBlogs.map(blog => (
          <li className="mb-4 md:mb-12 p-6 md:p-12 bg-secondary shadow-md" key={blog.title}>
            <Link href="/[post]" as={`/${blog.slug}`}>
              <a className="no-underline">
                <h1 className="m-0 mb-2 text-2xl md:text-3xl">{blog.title}</h1>
                <p className="mb-0 md:mb-8 mt-0 text-sm text-primary">
                  {formatDate(blog.date)} - {blog.estimatedReadingTime}
                </p>
                <p className="text-md">{blog.summary}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps = async () => {
  // get all posts
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const files = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    files.map(async file => {
      const markdown = await fs.readFile(path.join(process.cwd(), `src/content/posts/${file}`));

      const document = matter(markdown);
      // return the .md content & pretty slug
      return {
        title: document.data.title,
        date: document.data.date,
        summary: document.data.summary,
        estimatedReadingTime: readingTime(document.content).text,
        slug: file.split('.')[0],
      };
    })
  );

  return {
    props: {
      allBlogs: orderPosts(posts),
    },
  };
};

export default Home;
