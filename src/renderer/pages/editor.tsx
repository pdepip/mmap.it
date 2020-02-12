import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { Dispatch } from 'redux';
import styled from 'styled-components';
require('../components/Application.scss');

import Markdown from '../components/Markdown';
import Title from '../components/Title';
import Page from './page';

import { ApplicationState } from '../store';
import { uuidv4 } from '../utils/general';
import { setTitle, setMarkdown, saveRequest, setId, toggleJustSaved } from '../store/editor/actions';
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
    setId: typeof setId;
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
            this.props.setId(doc.id);
            this.props.setTitle(doc.title)
            this.props.setMarkdown(doc.text)
        })
    }

    componentWillUnmount() {
        //ipcRenderer.removeListener('document-data', (e, doc) => { });
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
            toggleJustSaved,
        } = this.props;

        const doc: Document = { 
            id: id,
            title: title,
            markdown: markdown
        }

        // Force Reload 
        let activeIdx: any = undefined;
        if (justSaved) {
            toggleJustSaved()
            activeIdx = "refresh"
        }
        if (id) {
            activeIdx = uuidv4()
        }

        return (
            <Page>
                <SearchTitleContainer>
                    <Title title={title} setTitle={setTitle} />
                </SearchTitleContainer>
                <EditorContainer>
                    <Markdown 
                      onSave={() => saveRequest(doc)}
                      setMarkdown={this.handleMarkdownChange.bind(this)} 
                      markdown={markdown}
                      activeIdx={activeIdx}
                    />
                </EditorContainer>
            </Page>
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
    setId,
    saveRequest,
    toggleJustSaved,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorPage);

const SearchTitleContainer = styled('div')`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    font-size: 24px;
    height: 125px;
    position: relative;
    border-bottom: 1px solid #dedede;

	&:after {
		content: '';
		position: absolute;
		left: 4%;
		bottom: -4;
		height: 1px;
		width: 92%; 
		border-bottom: 1px solid rgb(240, 240, 240);
	}
`

const EditorContainer = styled('div')`
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: #fff;
    padding: 24px;
    padding-top: 12px;
    -webkit-app-region: no-drag;
`
