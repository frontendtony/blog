// @ts-nocheck

import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';
import readingTime from 'reading-time';
import ThemeToggle from '../components/ThemeToggle';
import { formatDate, formatExcerpt, orderPosts } from '../utils/blogHelpers';

const BlogList = ({ blogList }) => {
  return (
    <>
      <div className="absolute right-0 mr-4 mt-2 md:mr-6">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center self-center px-4 mt-20 md:mt-40 mx-auto max-w-md">
        <img
          src="/images/avatar.jpg"
          alt="Avatar of Anthony Oyathelemhi"
          height={80}
          width={80}
          className="rounded-full mr-4"
        />
        <p className="text-center text-3xl font-bold mb-4">Anthony Oyathelemhi</p>
        <p className="text-center text-lg my-2 opacity-75">
          Hi, I'm a frontend developer based in Lagos, Nigeria <br />I build fast, scalable, secure,
          and accessible web apps for a living
        </p>
        <div className="flex items-center mt-4">
          <a
            href="http://twitter.com/frontendtony"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src="/images/twitter.png" alt="Twitter logo" />
          </a>
          <a
            href="http://github.com/frontendtony"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src="/images/github.png" alt="Github logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/tonerolima/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src="/images/linkedin.png" alt="Linkedin logo" />
          </a>
        </div>
      </div>
      <ul className="mb-4 max-w-xl mx-auto list-none p-0">
        {blogList.map(blog => (
          <li className="mb-4 p-4 md:px-8 bg-secondary shadow-md" key={blog.title}>
            <Link href="/[post]" as={`/${blog.slug}`}>
              <a className="no-underline">
                <h1 className="m-0">{blog.title}</h1>
                <p className="mb-0 md:mb-8 mt-0 text-sm text-primary">
                  {formatDate(blog.date)} - {blog.estimatedReadingTime}
                </p>
                <p className="text-md hidden md:block">{blog.excerpt}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const Home = ({ allBlogs }) => {
  return (
    <main className="container mx-auto p-2 md:px-8">
      <BlogList blogList={allBlogs} />
    </main>
  );
};

Home.getInitialProps = async () => {
  const siteMetadata = await import(`../content/siteMetadata.json`);
  // get all .md files from the src/posts dir
  const posts = (context => {
    // grab all the files matching this context
    const keys = context.keys();
    // grab the values from these files
    const values = keys.map(context);
    // go through each file
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');
      // get the current file value
      const value = values[index];
      // Parse frontmatter & markdownbody for the current file
      const document = matter(value.default);
      // Extract part of the blog to use as summary
      const excerpt = formatExcerpt(document.content);
      // return the .md content & pretty slug
      return {
        title: document.data.title,
        date: document.data.date,
        estimatedReadingTime: readingTime(document.content).text,
        excerpt,
        slug
      };
    });
    // return all the posts
    return orderPosts(data);
  })(require.context('../content/posts', true, /\.md$/));

  return {
    allBlogs: posts,
    ...siteMetadata.default
  };
};

export default Home;
