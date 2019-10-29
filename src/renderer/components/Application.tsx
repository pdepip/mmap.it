import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('./Application.scss');
import SearchContainer from '../containers/SearchContainer';
import CreateContainer from '../containers/CreateContainer';

// const search: boolean = true;

const Application = () => <SearchContainer />;

export default hot(Application);
