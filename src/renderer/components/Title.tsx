import * as React from 'react';

require('./Create.scss');
require('./Search.scss');

export interface Props {
    title: string;
    updateTitle: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Title: React.FunctionComponent<Props> = ({ title, updateTitle }) => (
    <fieldset className="field-container">
        <input
            value={title}
            onChange={updateTitle}
            type="text"
            placeholder="Title..."
            className="field"
        />
    </fieldset>
);

export default Title;
