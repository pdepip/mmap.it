import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('./Application.scss');
import SearchContainer from '../containers/SearchContainer';
import EditorContainer from '../containers/EditorContainer';

type Props = {
    type: string | null;
};

class Application extends React.Component<Props> {
    render() {
        switch (this.props.type) {
        case 'editor':
            {
                    return <EditorContainer />;
                }
            break;
        case 'search':
            {
                    return <SearchContainer />;
                }
            break;
        default:
            {
                    return <SearchContainer />;
                }
            break;
        }
    }
}

export default hot(Application);
