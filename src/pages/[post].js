import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../components/CodeBlock';

const Post = props => {
  return (
    <ReactMarkdown
      source={props.post}
      escapeHtml={false}
      renderers={{ code: CodeBlock }}
      className="post-container"
    />
  );
};

Post.getInitialProps = async ({ query }) => {
  const post = await require(`../posts/${query.post}.md`);

  return { post: post.default };
};

export default Post;
