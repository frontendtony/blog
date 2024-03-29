import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import path from 'path';
import ReactMarkdown from 'react-markdown/with-html';
import readingTime from 'reading-time';
import CodeBlock from '../components/CodeBlock';
import { formatDate } from '../utils/blogHelpers';

type Props = {
  title: string;
  content: string;
  date: string;
  publishDate: string;
  tags: string[];
  estimatedReadingTime: string;
  slug: string;
  summary: string;
  siteMetadata: {
    title: string;
    seoDefaultTitle: string;
    description: string;
    siteUrl: string;
    keywords: string;
    social: {
      twitterHandle: string;
      twitter: string;
      github: string;
    };
  };
};

const Post = ({
  title,
  content,
  date,
  publishDate,
  tags,
  estimatedReadingTime,
  slug,
  summary,
}: Props) => {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="%s - Anthony Oyathelemhi"
        description={summary}
        canonical={`https://frontendtony.com/${slug}`}
        openGraph={{
          url: `https://frontendtony.com/${slug}`,
          title: title,
          description: summary,
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: publishDate,
            tags: tags,
            section: tags[0],
            authors: ['Anthony Oyathelemhi'],
          },
        }}
      />
      <Head>
        <title>{`${title} - Anthony Oyathelemhi`}</title>
      </Head>
      <main className="bg-secondary post-wrapper prose">
        <h1 className="mb-4 mt-10">{title}</h1>
        <p className="mb-10 mt-0 text-sm text-primary">
          {formatDate(date)} - {estimatedReadingTime}
        </p>
        <ReactMarkdown
          source={content}
          escapeHtml={false}
          renderers={{ code: CodeBlock }}
          className="post-container"
        />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const markdown = await fs.readFile(
    path.join(process.cwd(), `src/content/posts/${params?.['post']}.md`)
  );

  const document = matter(markdown);

  return {
    props: {
      title: document.data.title,
      date: document.data.date,
      estimatedReadingTime: readingTime(document.content).text,
      content: document.content,
      // @ts-ignore
      publishDate: document.publishDate || null,
      tags: document.data.tags || [],
      slug: params?.['post'],
      summary: document.data.summary,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const filenames = await fs.readdir(postsDirectory);

  // Get the paths we want to pre-render based on posts
  const paths = filenames.map(slug => ({
    params: { post: slug.split('.')[0] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
