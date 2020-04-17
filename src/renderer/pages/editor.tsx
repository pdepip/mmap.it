import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

require('../components/Application.scss');

import Markdown from '../components/Markdown';
import Title from '../components/Title';
import Page from './page';

import { ApplicationState } from '../stores';
import { 
    setTitle,
    setMarkdown,
    saveRequest,
    setId,
    forceRender,
} from '../stores/editor/actions';
import { Document } from '../stores/editor/types';

interface PropsFromState {
    id: string;
    title: string;
    markdown: string;
    renderIdx: number;
}

interface PropsFromDispatch {
    setTitle: typeof setTitle;
    setMarkdown: typeof setMarkdown;
    setId: typeof setId;
    saveRequest: typeof saveRequest;
    forceRender: typeof forceRender;
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
            this.props.forceRender();
        })
    }

    componentWillUnmount() {
        // ipcRenderer.removeListener('document-data', (e, doc) => { });
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
            renderIdx,
        } = this.props;

        const doc: Document = { id, title, markdown };

        return (
            <Page>
                <SearchTitleContainer>
                    <Title title={title} setTitle={setTitle} />
                </SearchTitleContainer>
                <EditorContainer>
                    <Markdown 
                      key={renderIdx}
                      onSave={() => saveRequest(doc)}
                      setMarkdown={this.handleMarkdownChange.bind(this)} 
                      markdown={markdown}
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
    renderIdx: editor.renderIdx
});

const mapDispatchToProps = {
    setTitle,
    setMarkdown,
    setId,
    saveRequest,
    forceRender,
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
