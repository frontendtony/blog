import matter from 'gray-matter';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown/with-html';
import readingTime from 'reading-time';
import CodeBlock from '../components/CodeBlock';
import { formatDate } from '../utils/blogHelpers';

const Post = ({ title, content, date, estimatedReadingTime, siteMetadata }) => {
  return (
    <main className="container mx-auto my-4 md:my-10 p-6 md:px-8 bg-secondary post-wrapper">
      <Head>
        <title>{`${title} - ${siteMetadata.title}`}</title>
      </Head>
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
    siteMetadata
  };
};

export default Post;
