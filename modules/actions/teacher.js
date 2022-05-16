import * as t from "../types";

export const setTeacherModalOpen = (isTeacherModalOpen) => {
	return {
		type: t.MODAL_OPEN_TEACHER,
		payload: isTeacherModalOpen,
	};
};

export const fetchTeachers = () => {
	return {
		type: t.TEACHER_FETCH_REQUESTED,
	};
};

export const addTeacher = (teacher) => {
	return {
		type: t.TEACHER_ADD_REQUESTED,
		payload: teacher,
	};
};

export const updateTeacher = (teacher) => {
	return {
		type: t.TEACHER_UPDATE_REQUESTED,
		payload: teacher,
	};
};

export const deleteTeacher = (id) => {
	return {
		type: t.TEACHER_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedTeacher = (id) => {
	return {
		type: t.TEACHER_SELECTED,
		payload: id,
	};
};

export const syncTeachers = () => {
    console.log('action > syncTechekar');
	return {
		type: t.TEACHER_SYNC_REQUESTED
	};
};
