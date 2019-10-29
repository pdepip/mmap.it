import * as React from 'react';

require('./Create.scss');
require('./Search.scss');

export interface Props {
    save: () => any;
}

const CreateActions: React.FunctionComponent<Props> = ({ save }) => (
    <div className="button-container">
        <a className="btn-primary" id="save-btn" onClick={save}>
            Save
        </a>
        <a className="btn-primary">Cancel</a>
    </div>
);

export default CreateActions;
