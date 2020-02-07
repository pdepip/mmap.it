import * as React from 'react';

require('./Editor.scss');
require('./Search.scss');

export interface Props {
    title: string;
    setTitle: (title: string) => void;
}

const Title: React.FunctionComponent<Props> = ({ title, setTitle }) => (
    <fieldset className="field-container">
        <input
            autoFocus
            ref={(input) => { input ? input.focus() : null}}
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="New Title"
            className="field"
        />
    </fieldset>
);

export default Title;
