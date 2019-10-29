import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Create from '../components/Create';
import { RootState } from '../reducers';
import { CreateAction, setTitle, setText, saveBit } from '../actions/createActions';

const mapStateToProps = (state: RootState) => ({
    title: state.create.title,
    text: state.create.text
});

const mapDispatchToProps = (dispatch: Dispatch<CreateAction>) => ({
    updateTitle: (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setTitle(event.target.value)),
    updateText: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setText(event.target.value)),
    save: () => dispatch(saveBit())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
