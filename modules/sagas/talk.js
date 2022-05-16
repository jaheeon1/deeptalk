import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";
import checkLogined  from "../lambdas/checkLogined";

export function* fetchTalks() {
	try {
		checkLogined();
		const response = yield fetch("/api/talk");

		const talkList = yield response.json();

		yield put({
			type: t.TALK_FETCH_SUCCEEDED,
			payload: talkList.data,
		});
	} catch (error) {
		yield put({
			type: t.TALK_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchTalks() {
	yield takeLatest(t.TALK_FETCH_REQUESTED, fetchTalks);
}

export function* addTalk(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/talk", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newTalk = yield response.json();

		yield put({
			type: t.TALK_ADD_SUCCEEDED,
			payload: newTalk.data,
		});
	} catch (error) {
		yield put({
			type: t.TALK_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddTalk() {
	yield takeLatest(t.TALK_ADD_REQUESTED, addTalk);
}

export function* deleteTalk(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/talk/" + action.payload, {
			method: "DELETE",
		});

		const deletedTalk = yield response.json();

		yield put({
			type: t.TALK_DELETE_SUCCEEDED,
			payload: deletedTalk.data.id,
		});
	} catch (error) {
		yield put({
			type: t.TALK_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveTalk() {
	yield takeLatest(t.TALK_DELETE_REQUESTED, deleteTalk);
}

export function* updateTalk(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/talk/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedTalk = yield response.json();

		yield put({
			type: t.TALK_UPDATE_SUCCEEDED,
			payload: updatedTalk.data,
		});
	} catch (error) {
		yield put({
			type: t.TALK_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateTalk() {
	yield takeLatest(t.TALK_UPDATE_REQUESTED, updateTalk);
}
