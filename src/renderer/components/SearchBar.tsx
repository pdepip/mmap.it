import * as React from 'react';

require('./Search.scss');

export interface Props {
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FunctionComponent<Props> = ({ query, setQuery }) => (
    <fieldset className="field-container">
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search..."
            className="field"
        />
        <div className="icons-container">
            <div className="icon-search" />
        </div>
    </fieldset>
);

export default SearchBar;
