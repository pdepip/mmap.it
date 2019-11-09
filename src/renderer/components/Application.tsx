import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('./Application.scss');
import SearchContainer from '../containers/SearchContainer';
import EditorContainer from '../containers/EditorContainer';

// const search: boolean = true;

const Application = () => <SearchContainer />;

export default hot(Application);
