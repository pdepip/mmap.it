import * as React from 'react';

require('./Create.scss');

export interface Props {
    text: string;
    updateText: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

const TextArea: React.FunctionComponent<Props> = ({ text, updateText }) => (
    <div className="textarea">
        <textarea
            id="input"
            className="textarea-elem"
            onChange={updateText}
            value={text}
            placeholder=""
        />
    </div>
);

export default TextArea;
