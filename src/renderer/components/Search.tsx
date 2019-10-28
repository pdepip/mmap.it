import * as React from 'react';

require('./Search.scss');

export interface Props {
    value: string;
    setSearchQuery: (value: string) => any;
};

const Search: React.FunctionComponent<Props> = ({ }) => (
    <fieldset className='field-container'>
        <input type="text" placeholder="Search..." className="field" />
        <div className="icons-container">
          <div className="icon-search"></div>
        </div>
    </fieldset>
);

export default Search;
