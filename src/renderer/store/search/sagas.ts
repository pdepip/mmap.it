import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ipcRenderer } from 'electron'
import { SearchActionTypes } from './types';
import { queryError, querySuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

function* handleQuery() {
    try {
        const res = yield call(callApi, 'post', API_ENDPOINT, '/v1/documents')

        if (res.error) {
            yield put(queryError(res.error))
        } else {
            ipcRenderer.send('kb::hide-search')
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
    yield takeEvery(SearchActionTypes.QUERY_REQUEST, handleQuery)
}

function* searchSaga() {
    yield all([fork(watchQueryRequest)])
}

export default searchSaga;
