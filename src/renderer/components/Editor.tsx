/*
import * as React from 'react';

import Markdown from '../components/Markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import EditorActions from '../components/EditorActions';

require('./Editor.scss');

export interface Props {
    title: string;
    markdown: string;
    //setTitle: (event: React.ChangeEvent<HTMLInputElement>) => any;
    //setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
    //save: (title: string, markdown: string) => any;
    setTitle: (title: string) => void;
    setMarkdown: (markdown: string) => void;
}

const Editor: React.FunctionComponent<Props> = ({ title, markdown, setTitle, setMarkdown }) => (
    <div className="application">
        <div className="search-container title-container">
            <Title title={title} setTitle={setTitle} />
        </div>
        <div className="body-container">
            <Markdown markdown={markdown} />
        </div>
        <div className="footer-container">
            <EditorActions save={save} />
        </div>
    </div>
);

export default Editor;
*/
