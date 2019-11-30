import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import Editor from 'rich-markdown-editor';

require('./Editor.scss');

export interface Props {
    markdown: string;
    // setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
    setMarkdown: (markdown: string) => void;
}

const Markdown: React.FunctionComponent<Props> = ({ markdown, setMarkdown }) => (
    <div className="markdown" id="editor">
        <Editor
            id="example"
            defaultValue={markdown}
            onSave={options => console.log('Save triggered', options)}
            onCancel={() => console.log('Cancel triggered')}
            onChange={setMarkdown}
        />
    </div>
);

export default Markdown;
