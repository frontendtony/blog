import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown/with-html';
import readingTime from 'reading-time';
import CodeBlock from '../components/CodeBlock';
import { formatDate, formatExcerpt } from '../utils/blogHelpers';

const Post = ({
  title,
  content,
  date,
  publishDate,
  tags,
  estimatedReadingTime,
  slug,
  excerpt,
  siteMetadata
}) => {
  return (
    <main className="container mx-auto my-4 md:my-10 p-6 md:px-8 bg-secondary post-wrapper">
      <Head>
        <title>{`${title} - ${siteMetadata.title}`}</title>
      </Head>
      <NextSeo
        title={title}
        description={excerpt}
        canonical={`https://blog.oghie.dev/${slug}`}
        openGraph={{
          url: `https://blog.oghie.dev/${slug}`,
          title: title,
          description: excerpt,
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: publishDate,
            tags: tags,
            authors: ['Anthony Oyathelemhi']
          }
        }}
      />
      <h1 className="mb-0">{title}</h1>
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
  );
};

Post.getInitialProps = async ({ query }) => {
  const markdown = await import(`../content/posts/${query.post}.md`);
  const siteMetadata = await import(`../content/siteMetadata.json`);

  const document = matter(markdown.default);

  return {
    title: document.data.title,
    date: document.data.date,
    estimatedReadingTime: readingTime(document.content).text,
    content: document.content,
    publishDate: document.publishDate,
    tags: document.tags || [],
    slug: query.post,
    excerpt: formatExcerpt(document.content, 155),
    siteMetadata
  };
};

export default Post;
