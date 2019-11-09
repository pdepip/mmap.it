import * as React from 'react';

import Markdown from '../components/Markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import EditorActions from '../components/EditorActions';

require('./Editor.scss');

export interface Props {
    title: string;
    text: string;
    updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => any;
    updateText: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
    save: () => any;
}

const Editor: React.FunctionComponent<Props> = ({ title, text, updateTitle, updateText, save }) => (
    <div className="application">
        <div className="search-container title-container">
            <Title title={title} updateTitle={updateTitle} />
        </div>
        <div className="body-container">
            <TextArea text={text} updateText={updateText} />
            <Markdown markdown={text} />
        </div>
        <div className="footer-container">
            <EditorActions save={save} />
        </div>
    </div>
);

export default Editor;
