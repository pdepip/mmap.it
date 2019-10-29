import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Search from '../components/Search';
import { RootState } from '../reducers';
import { SearchAction, setSearchQuery } from '../actions/searchActions';

const mapStateToProps = (state: RootState) => ({
    query: state.search.query,
    markdown: state.search.markdown
});

const mapDispatchToProps = (dispatch: Dispatch<SearchAction>) => ({
    updateQuery: (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setSearchQuery(event.target.value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
