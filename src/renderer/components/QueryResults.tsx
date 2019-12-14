import * as React from 'react';
import { Document } from '../store/search/types';
import classnames from 'classnames';

require('./Search.scss');

export interface Props {
    activeIdx: number;
    documents: Document[];
    increaseActiveIdx: () => void;
    decreaseActiveIdx: () => void;
}

const QueryResults: React.FunctionComponent<Props> = ({documents, activeIdx}) => (
    <div className="query-results">

    { documents.map((document, idx) => {
            return (
                <div className={classnames({
                    'item': true,
                    'active': idx == activeIdx,
                    })}
                >{document.title}</div>
            )
        })
    }
    </div>
);

export default QueryResults;
