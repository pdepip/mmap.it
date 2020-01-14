import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { Dispatch } from 'redux';
require('../components/Application.scss');

import Markdown from '../components/Markdown';
import Title from '../components/Title';

import { ApplicationState } from '../store';
import { setTitle, setMarkdown, saveRequest, toggleJustSaved } from '../store/editor/actions';
import { Document } from '../store/editor/types';

interface PropsFromState {
    id: string;
    title: string;
    markdown: string;
    justSaved: boolean;
}

interface PropsFromDispatch {
    setTitle: typeof setTitle;
    setMarkdown: typeof setMarkdown;
    saveRequest: typeof saveRequest;
    toggleJustSaved: typeof toggleJustSaved
}

type AllProps = PropsFromState & PropsFromDispatch;

class EditorPage extends React.Component<AllProps> {

    constructor(props: AllProps) {
        super(props);

    }

    componentDidMount() {
        ipcRenderer.on('document-data', (e, doc) => {
            this.props.setTitle(doc.title)
            this.props.setMarkdown(doc.text)
            this.props.toggleJustSaved();
        })
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('document-data', (e, doc) => { });
    }

    public handleMarkdownChange(value) {
        const { setMarkdown } = this.props;
        setMarkdown(value())
    }

    public render() {

        const { 
            markdown, 
            id,
            title, 
            setTitle, 
            setMarkdown, 
            saveRequest, 
            justSaved, 
        } = this.props;

        const doc: Document = { 
            id: id,
            title: title,
            markdown: markdown
        }

        return (
            <div className="application">
                <div className="search-container title-container">
                    <Title title={title} setTitle={setTitle} />
                </div>
                <div className="body-container">
                    <Markdown 
                      onSave={() => saveRequest(doc)}
                      setMarkdown={this.handleMarkdownChange.bind(this)} 
                      markdown={markdown}
                      activeIdx={justSaved ? "refresh" : undefined}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ editor }: ApplicationState) => ({
    id: editor.id,
    title: editor.title,
    markdown: editor.markdown,
    justSaved: editor.justSaved,
});

const mapDispatchToProps = {
    setTitle,
    setMarkdown,
    saveRequest,
    toggleJustSaved,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorPage);
