import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

require('./Editor.scss');

export interface Props {
    markdown: string;
}

const Markdown: React.FunctionComponent<Props> = ({ markdown }) => (
    <div className="markdown">
        <ReactMarkdown source={markdown} />
    </div>
);

export default Markdown;
