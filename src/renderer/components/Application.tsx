import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('./Application.scss');
import SearchContainer from '../containers/SearchContainer';
import CreateContainer from '../containers/CreateContainer';
import Markdown from './Markdown';
import TextArea from './TextArea';

const markdown: string = '# This is a header\n\nAnd this is a paragraph';

const Application = () => (
    <div className="application">
        {/*
        <div className="search-container">
     <SearchContainer />
        </div>
    */}
        <CreateContainer />
    </div>
);

export default hot(Application);
