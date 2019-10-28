import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Search from '../components/Search';
import { RootState } from '../reducers';
import { SearchAction, setSearchQuery } from '../actions/searchActions';

type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
};

let e: HTMLElementEvent<HTMLInputElement>;

const mapStateToProps = (state: RootState) => ({
    query: state.search.query
});

const mapDispatchToProps = (dispatch: Dispatch<SearchAction>) => ({
    setSearchQuery: (event: HTMLElementEvent<HTMLInputElement>) =>
        dispatch(setSearchQuery(event.target.value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
