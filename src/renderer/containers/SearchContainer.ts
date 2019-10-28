import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Actions from '../actions';
import Search from '../components/Search';
import { RootState } from '../reducers';
//import { SearchAction, update } from '../actions/searchActions';

const mapStateToProps = (state: RootState) => ({
    value: state.search.value
});

const mapDispatchToProps = (dispatch: Dispatch<SearchAction>) => ({
    setSearchQuery: (event) => dispatch(Actions.setSearchQuery(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
