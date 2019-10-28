import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('./Application.scss');
import SearchContainer from '../containers/SearchContainer';

const Application = () => (
    <div className="application">
        <div className="search-container">
            <SearchContainer />
        </div>
    </div>
);

export default hot(Application);
