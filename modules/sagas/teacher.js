import { put, takeLatest } from "redux-saga/effects"
import * as t from "../types"

export function* fetchTeachers() {
	try {
		const response = yield fetch("/api/teacher");
		const teacherList = yield response.json();
		yield put({
			type: t.TEACHER_FETCH_SUCCEEDED,
			payload: teacherList.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchTeachers() {
	yield takeLatest(t.TEACHER_FETCH_REQUESTED, fetchTeachers);
}

export function* addTeacher(action) {
	try {
		const response = yield fetch("/api/teacher", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		const newTeacher = yield response.json();

		yield put({
			type: t.TEACHER_ADD_SUCCEEDED,
			payload: newTeacher.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddTeacher() {
	yield takeLatest(t.TEACHER_ADD_REQUESTED, addTeacher);
}

export function* deleteTeacher(action) {
	try {
		const response = yield fetch("/api/teacher/" + action.payload, {
			method: "DELETE",
		});

		const deletedTeacher = yield response.json();

		yield put({
			type: t.TEACHER_DELETE_SUCCEEDED,
			payload: deletedTeacher.data.id,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveTeacher() {
	yield takeLatest(t.TEACHER_DELETE_REQUESTED, deleteTeacher);
}

export function* updateTeacher(action) {
	try {
		const response = yield fetch("/api/teacher/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedTeacher = yield response.json();

		yield put({
			type: t.TEACHER_UPDATE_SUCCEEDED,
			payload: updatedTeacher.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateTeacher() {
	yield takeLatest(t.TEACHER_UPDATE_REQUESTED, updateTeacher);
}

export function* syncTeachers() {
    console.log('saga > 1. syncTeachers');
	try {
		yield fetch("/api/sync")
        let oRes = yield fetch("/api/teacher")
        oRes = yield oRes.json();
        console.log('saga > put전. syncTeachers')
        yield put({
			type: t.TEACHER_FETCH_SUCCEEDED,
            payload: oRes.data
		});

	} catch (error) {
        console.log(error);
		yield put({
			type: t.TEACHER_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchSyncTeachers() {
    console.log('watchsyncteacher');
	yield takeLatest(t.TEACHER_SYNC_REQUESTED, syncTeachers);
}