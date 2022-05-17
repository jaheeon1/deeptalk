import { put, takeLatest } from "redux-saga/effects";
import * as t from "../types";
import checkLogined  from "../lambdas/checkLogined";

export const initialState = {
    loginedStudent: {},
    loginError: null,
    isLoggined: false,
    token: ''
};
export function* fetchStudents() {
	try {
		checkLogined();
		const response = yield fetch("/api/students");

		const studentList = yield response.json();
		yield put({
			type: t.STUDENT_FETCH_SUCCEEDED,
			payload: studentList.data,
		});
	} catch (error) {
		yield put({
			type: t.STUDENT_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchStudents() {
	yield takeLatest(t.STUDENT_FETCH_REQUESTED, fetchStudents);
}

export function* addStudent(action) {
	try {
		const response = yield fetch("/api/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newStudent = yield response.json();

		yield put({
			type: t.STUDENT_ADD_SUCCEEDED,
			payload: newStudent.data,
		});
	} catch (error) {
		yield put({
			type: t.STUDENT_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddStudent() {
	yield takeLatest(t.STUDENT_ADD_REQUESTED, addStudent);
}

export function* deleteStudent(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/students/" + action.payload, {
			method: "DELETE",
		});

		const deletedStudent = yield response.json();

		yield put({
			type: t.STUDENT_DELETE_SUCCEEDED,
			payload: deletedStudent.data.id,
		});
	} catch (error) {
		yield put({
			type: t.STUDENT_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveStudent() {
	yield takeLatest(t.STUDENT_DELETE_REQUESTED, deleteStudent);
}

export function* updateStudent(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/students/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedStudent = yield response.json();

		yield put({
			type: t.STUDENT_UPDATE_SUCCEEDED,
			payload: updatedStudent.data,
		});
	} catch (error) {
		yield put({
			type: t.STUDENT_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateStudent() {
	yield takeLatest(t.STUDENT_UPDATE_REQUESTED, updateStudent);
}

export function* loginStudent(action) {
	try {
		const response = yield fetch("/api/students/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const loginedStudent = yield response.json();
		localStorage.setItem("loginedStudent", JSON.stringify(loginedStudent));
		window.location.href = '/'
		yield put({
			type: t.LOGIN_REQUESTED_SUCCEEDED,
			payload: loginedStudent.data,
		});
		yield put({
			type: t.SAVE_TOKEN,
			payload: loginedStudent.token,
		});
		
	} catch (error) {
		yield put({
			type: t.LOGIN_REQUESTED_FAILED,
			payload: error.message,
		});
		yield put({
			type: t.DELETE_TOKEN,
			payload: error.message,
		});
	}
}

export function* watchLoginStudent() {
	yield takeLatest(t.LOGIN_REQUESTED, loginStudent);
}

export function* logoutStudent(action) {
	try {
		const response = yield fetch("/api/students/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		localStorage.clear();
		window.location.href = '/'
		
		yield put({
			type: t.LOGOUT_REQUESTED_SUCCEEDED,
			payload: logoutStudent.data,
		});
		yield put({
			type: t.DELETE_TOKEN,
			payload: logoutStudent.token,
		});
		
	} catch (error) {
		yield put({
			type: t.LOGOUT_REQUESTED_FAILED,
			payload: error.message,
		});
	}
}

export function* watchLogoutStudent() {
	yield takeLatest(t.LOGOUT_REQUESTED, logoutStudent);
}