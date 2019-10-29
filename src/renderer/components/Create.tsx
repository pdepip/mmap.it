import * as React from 'react';

import Markdown from '../components/Markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';

require('./Create.scss');

export interface Props {
    title: string;
    text: string;
    updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => any;
    updateText: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

const Create: React.FunctionComponent<Props> = ({ title, text, updateTitle, updateText }) => (
    <div className="application">
        <div className="search-container">
            <Title title={title} updateTitle={updateTitle} />
        </div>
        <TextArea text={text} updateText={updateText} />
        <Markdown markdown={text} />
    </div>
);

export default Create;
