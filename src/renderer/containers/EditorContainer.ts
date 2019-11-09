import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Editor from '../components/Editor';
import { RootState } from '../reducers';
import { EditorAction, setTitle, setText, saveBit } from '../actions/editorActions';

const mapStateToProps = (state: RootState) => ({
    title: state.editor.title,
    text: state.editor.text
});

const mapDispatchToProps = (dispatch: Dispatch<EditorAction>) => ({
    updateTitle: (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setTitle(event.target.value)),
    updateText: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setText(event.target.value)),
    save: () => dispatch(saveBit())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
