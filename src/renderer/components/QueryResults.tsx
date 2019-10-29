import * as React from 'react';

require('./Search.scss');

export interface Props {
    // text: string;
}

const QueryResults: React.FunctionComponent<Props> = ({}) => (
    <div className="textarea">
        <div className="item active">Postgres tables with rows</div>
        <div className="item">Comet instructions</div>
        <div className="item">k8s port forwarding</div>
    </div>
);

export default QueryResults;
