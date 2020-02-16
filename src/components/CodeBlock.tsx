import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  value: string;
  language: string;
}

const CodeBlock = (props: Props) => {
  const { language = 'javascript', value } = props;

  return (
    <SyntaxHighlighter language={language} style={ghcolors} showLineNumbers>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
