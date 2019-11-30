import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ipcRenderer } from 'electron'
import { EditorActionTypes } from './types';
import { saveError, saveSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

function* handleSave() {
    try {
        const res = yield call(callApi, 'post', API_ENDPOINT, '/v1/documents')

        if (res.error) {
            yield put(saveError(res.error))
        } else {
            ipcRenderer.send('kb::hide-editor')
            yield put(saveSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(saveError(err.stack))
        } else {
            yield put(saveError('Unknown error occured.'))
        }
    }
}

function* watchSaveRequest() {
    yield takeEvery(EditorActionTypes.SAVE_REQUEST, handleSave)
}

function* editorSaga() {
    yield all([fork(watchSaveRequest)])
}

export default editorSaga;
