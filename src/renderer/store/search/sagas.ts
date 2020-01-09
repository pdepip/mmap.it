import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron'
import { SearchActionTypes, Document } from './types';
import { queryError, querySuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

function* handleOpenDocument() {
    try {
        const state = yield select();
        const activeIdx: number = state.search.activeIdx
        const activeDocument: Document = state.search.documents[activeIdx];
        ipcRenderer.send('kb::hide-search')
        ipcRenderer.send('kb::open-document', activeDocument)

    } catch (err) {
        console.log('[ERROR] handleOpenDocument', err)
    }
}

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

function* watchOpenDocument() {
    yield takeEvery(SearchActionTypes.OPEN_DOCUMENT, handleOpenDocument);
}

function* searchSaga() {
    yield all([fork(watchQueryRequest), fork(watchOpenDocument)])
}

export default searchSaga;
