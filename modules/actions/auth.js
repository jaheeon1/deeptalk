import * as t from "../types";

export const setStudentModalOpen = (isAuthModalOpen) => {
	return {
		type: t.MODAL_OPEN_AUTH,
		payload: isAuthModalOpen,
	};
};

export const setLoginModalOpen = (isLoginModalOpen) => {
	return {
		type: t.MODAL_OPEN_LOGIN,
		payload: isLoginModalOpen,
	};
};

export const setRegisterModalOpen = (isRegisterModalOpen) => {
	return {
		type: t.MODAL_OPEN_REGISTER,
		payload: isRegisterModalOpen,
	};
};


export const logout = (student) => {
	return {
		type: t.LOGOUT_REQUESTED,
		payload: student,
	};
};

export const login = (student) => {
	return {
		type: t.LOGIN_REQUESTED,
		payload: student,
	};
};
export const fetchStudents = (student) => {
	return {
		type: t.STUDENT_FETCH_REQUESTED,
		payload: student
	};
};

export const addStudent = (student) => {
	return {
		type: t.STUDENT_ADD_REQUESTED,
		payload: student,
	};
};

export const updateStudent = (student) => {
	return {
		type: t.STUDENT_UPDATE_REQUESTED,
		payload: student,
	};
};

export const deleteStudent = (id) => {
	return {
		type: t.STUDENT_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedStudent = (id) => {
	return {
		type: t.STUDENT_SELECTED,
		payload: id,
	};
};