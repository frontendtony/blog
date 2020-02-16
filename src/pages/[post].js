import matter from 'gray-matter';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../components/CodeBlock';

const Post = props => {
  return (
    <main className="container mx-auto my-4 md:my-10 p-6 md:px-8 bg-secondary post-wrapper">
      <Head>
        <title>{`${props.data.title} - ${props.siteMetadata.title}`}</title>
      </Head>
      <h1 className="mb-0">{props.data.title}</h1>
      <p className="mb-10 mt-2 text-sm">{props.data.publishDate}</p>
      <ReactMarkdown
        source={props.content}
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        className="post-container"
      />
    </main>
  );
};

Post.getInitialProps = async ({ query }) => {
  const content = await import(`../content/posts/${query.post}.md`);
  const siteMetadata = await import(`../content/siteMetadata.json`);

  const post = matter(content.default);

  return { ...post, siteMetadata };
};

export default Post;
