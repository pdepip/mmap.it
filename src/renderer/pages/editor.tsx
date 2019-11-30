import * as React from 'react';
import { connect } from 'react-redux';

require('../components/Application.scss');
import Markdown from '../components/Markdown';
import Title from '../components/Title';

import { ApplicationState } from '../store';
import { setTitle, setMarkdown } from '../store/editor/actions';

interface PropsFromState {
    title: string;
    markdown: string;
}

interface PropsFromDispatch {
    setTitle: typeof setTitle;
    setMarkdown: typeof setMarkdown;
}

type AllProps = PropsFromState & PropsFromDispatch;

class EditorPage extends React.Component<AllProps> {
    public render() {
        const { markdown, title, setTitle, setMarkdown } = this.props;

        return (
            <div className="application">
                <div className="search-container title-container">
                    <Title title={title} setTitle={setTitle} />
                </div>
                <div className="body-container">
                    <Markdown setMarkdown={setMarkdown} markdown={markdown} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ editor }: ApplicationState) => ({
    title: editor.title,
    markdown: editor.markdown
});

const mapDispatchToProps = {
    setTitle,
    setMarkdown
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorPage);
