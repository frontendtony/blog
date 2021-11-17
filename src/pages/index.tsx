import { promises as fs } from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import readingTime from 'reading-time';
import avatarUrl from '../../public/images/avatar.png';
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
    <main>
      <div className="flex flex-col items-center self-center px-4 mt-20 md:mt-28 mx-auto max-w-md">
        <Image
          src={avatarUrl}
          alt="Avatar of Anthony Oyathelemhi"
          className="rounded-full mr-4"
          width={160}
          height={160}
        />
        <p className="text-center text-3xl font-bold leading-none mt-4 mb-0">Anthony Oyathelemhi</p>
        <p className="text-center text-lg mt-2 opacity-75">
          Sofware Engineer, Master of all thing Frontend
        </p>
      </div>
      <ul className="max-w-3xl mx-auto list-none p-0 space-y-12 mt-8">
        {allBlogs.map(blog => (
          <li className="" key={blog.title}>
            <Link href="/[post]" as={`/${blog.slug}`}>
              <a className="no-underline">
                <h1 className="m-0 mb-2 text-3xl">{blog.title}</h1>
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

export const getStaticProps = async () => {
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
