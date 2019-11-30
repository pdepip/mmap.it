import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import EditorPage from './pages/editor';

type Props = {
    page: string | null;
};

class Routes extends React.Component<Props> {
    render() {
        switch (this.props.page) {
        case 'editor':
            {
                    return <EditorPage />;
                }
            break;
        case 'search':
            {
                    return <EditorPage />;
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
