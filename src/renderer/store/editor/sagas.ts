import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron'
import { EditorActionTypes } from './types';
import { saveError, saveSuccess, setTitle, setMarkdown } from './actions'
import { callApi } from '../../utils/api'
import { uuidv4 } from '../../utils/general'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

function* handleSave() {
    try {
        const state = yield select();
        const data: any = {
            id: state.editor.id ? state.editor.id : uuidv4(),
            title: state.editor.title,
            text: state.editor.markdown,
        }
        ipcRenderer.send('kb::hide-editor')
        ipcRenderer.send('fm::save', data.id, data.title, data.text)
        yield put(saveSuccess(data))
        
        /* REMOVED BECAUSE WE ARE NOT USING AN API. 
        const res = yield call(callApi, 'post', API_ENDPOINT, '/v1/documents', data)

        if (res.error) {
            yield put(saveError(res.error))
        } else {
            ipcRenderer.send('kb::hide-editor')
            console.log(res);
            ipcRenderer.send('fm::save', res.document_id, res.document_title, res.document_text)
            yield put(saveSuccess(res))
        }
        */
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
