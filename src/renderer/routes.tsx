import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import EditorPage from './pages/editor';
import SearchPage from './pages/search';

type Props = {
    page: string | null;
};

class Routes extends React.Component<Props> {
    render() {
        console.log('page', this.props.page)
        switch (this.props.page) {
        case 'editor':
            {
                    return <EditorPage />;
                }
            break;
        case 'search':
            {
                    return <SearchPage />;
                }
            break;
        default:
            {
                    return <EditorPage />;
                }
            break;
        }
    }
}

export default hot(Routes);
