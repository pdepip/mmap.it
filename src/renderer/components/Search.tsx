import * as React from 'react';

import SearchBar from './SearchBar';
import Markdown from './Markdown';
import QueryResults from './QueryResults';

require('./Search.scss');

export interface Props {
    query: string;
    markdown: string;
    updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Search: React.FunctionComponent<Props> = ({ query, markdown, updateQuery }) => (
    <div className="application">
        <div className="search-container">
            <SearchBar query={query} updateQuery={updateQuery} />
        </div>
        <div className="body-container">
            <QueryResults />
            <Markdown markdown={markdown} />
        </div>
    </div>
);

export default Search;
