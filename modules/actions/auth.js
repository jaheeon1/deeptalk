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


export const logout = (user) => {
	return {
		type: t.LOGOUT_REQUESTED,
		payload: user,
	};
};

export const login = (user) => {
	return {
		type: t.LOGIN_REQUESTED,
		payload: user,
	};
};
export const fetchStudents = (user) => {
	return {
		type: t.STUDENT_FETCH_REQUESTED,
		payload: user
	};
};

export const addStudent = (user) => {
	return {
		type: t.STUDENT_ADD_REQUESTED,
		payload: user,
	};
};

export const updateStudent = (user) => {
	return {
		type: t.STUDENT_UPDATE_REQUESTED,
		payload: user,
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