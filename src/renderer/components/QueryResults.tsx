import * as React from 'react';

require('./Create.scss');

export interface Props {
    // text: string;
}

const QueryResults: React.FunctionComponent<Props> = ({}) => (
    <div className="textarea">
        <textarea id="input" className="textarea-elem" placeholder="Enter QueryResults Here" />
    </div>
);

export default QueryResults;
