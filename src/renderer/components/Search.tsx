import * as React from 'react';

require('./Search.scss');

export interface Props {
    query: string;
    updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Search: React.FunctionComponent<Props> = ({ query, updateQuery }) => (
    <fieldset className="field-container">
        <input
            value={query}
            onChange={updateQuery}
            type="text"
            placeholder="Search..."
            className="field"
        />
        <div className="icons-container">
            <div className="icon-search" />
        </div>
    </fieldset>
);

export default Search;
