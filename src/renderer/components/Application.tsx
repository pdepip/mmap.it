import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import SearchContainer from '../containers/SearchContainer';

const Application = () => (
    <div>
      <SearchContainer />
    </div>
);

export default hot(Application);
