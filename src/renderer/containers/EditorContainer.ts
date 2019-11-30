/*
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Editor from '../components/Editor';
import { RootState } from '../reducers';
import { EditorAction, setTitle, setText, saveBit } from '../actions/editorActions';

interface EditorContainerProps {
    title: string
    markdown: string
    setMarkdown: (markdown: string) => void
    setTitle: (title: string) => void
}

interface EditorContainerRenderProps {
}








const mapStateToProps = (state: RootState) => ({
    title: state.editor.title,
    text: state.editor.text
});

const mapDispatchToProps = (dispatch: Dispatch<EditorAction>) => ({
    updateTitle: (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setTitle(event.target.value)),
    updateText: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setText(event.target.value)),
    save: (title: string, text: string) => {
        dispatch(saveBit(title, text))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
 */
