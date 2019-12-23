import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron'
import { SearchActionTypes } from './types';
import { queryError, querySuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

function* handleQuery() {
    try {
        const state = yield select();

        // dont search for empty string
        if (!state.search.query) return;

        const query: string = '/v1/documents?q=' + state.search.query
        
        const res = ipcRenderer.sendSync('fm::search', state.search.query)

        //const res = yield call(callApi, 'get', API_ENDPOINT, query)

        if (res.error) {
            yield put(queryError(res.error))
        } else {
            yield put(querySuccess(res))
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(queryError(err.stack))
        } else {
            yield put(queryError('Unknown error occured.'))
        }
    }
}

function* watchQueryRequest() {
    yield takeEvery(SearchActionTypes.SET_QUERY, handleQuery)
}

function* searchSaga() {
    yield all([fork(watchQueryRequest)])
}

export default searchSaga;
