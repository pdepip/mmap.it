import * as React from 'react';

require('./Editor.scss');
require('./Search.scss');

export interface Props {
    save: () => any;
}

const EditorActions: React.FunctionComponent<Props> = ({ save }) => (
    <div className="button-container">
        <a className="btn-primary" id="save-btn" onClick={save}>
            Save
        </a>
        <a className="btn-primary">Cancel</a>
    </div>
);

export default EditorActions;
