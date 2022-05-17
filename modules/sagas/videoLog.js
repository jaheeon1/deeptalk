import { all, put, takeLatest } from "redux-saga/effects"
import * as t from "../types"
import checkLogined  from "../lambdas/checkLogined"

export function* fetchVideoLogs() {
	try {
		const response = yield fetch("/api/videoLog");

		const videoLogList = yield response.json();

		yield put({
			type: t.VIDEOLOG_FETCH_SUCCEEDED,
			payload: videoLogList.data,
		});
	} catch (error) {
		yield put({
			type: t.VIDEOLOG_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchVideoLogs() {
    console.log('watchfetchVideoLog');
	yield takeLatest(t.VIDEOLOG_FETCH_REQUESTED, fetchVideoLogs);
}

export function* addVideoLog(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/videoLog", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		const newVideoLog = yield response.json();

		yield put({
			type: t.VIDEOLOG_ADD_SUCCEEDED,
			payload: newVideoLog.data,
		});
	} catch (error) {
		yield put({
			type: t.VIDEOLOG_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddVideoLog() {
	yield takeLatest(t.VIDEOLOG_ADD_REQUESTED, addVideoLog);
}

export function* deleteVideoLog(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/videoLog/" + action.payload, {
			method: "DELETE",
		});

		const deletedVideoLog = yield response.json();

		yield put({
			type: t.VIDEOLOG_DELETE_SUCCEEDED,
			payload: deletedVideoLog.data.id,
		});
	} catch (error) {
		yield put({
			type: t.VIDEOLOG_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveVideoLog() {
	yield takeLatest(t.VIDEOLOG_DELETE_REQUESTED, deleteVideoLog);
}

export function* updateVideoLog(action) {
	try {
		// checkLogined();
		const response = yield fetch("/api/videoLog/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedVideoLog = yield response.json();

		yield put({
			type: t.VIDEOLOG_UPDATE_SUCCEEDED,
			payload: updatedVideoLog.data,
		});
	} catch (error) {
		yield put({
			type: t.VIDEOLOG_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateVideoLog() {
	yield takeLatest(t.VIDEOLOG_UPDATE_REQUESTED, updateVideoLog);
}