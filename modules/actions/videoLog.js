import * as t from "../types";

export const setVideoLogModalOpen = (isVideoLogModalOpen) => {
	return {
		type: t.MODAL_OPEN_VIDEOLOG,
		payload: isVideoLogModalOpen,
	};
};

export const fetchVideoLogs = () => {
	return {
		type: t.VIDEOLOG_FETCH_REQUESTED,
	};
};

export const addVideoLog = (videolog) => {
	return {
		type: t.VIDEOLOG_ADD_REQUESTED,
		payload: videolog,
	};
};

export const updateVideoLog = (videolog) => {
	return {
		type: t.VIDEOLOG_UPDATE_REQUESTED,
		payload: videolog,
	};
};

export const deleteVideoLog = (id) => {
	return {
		type: t.VIDEOLOG_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedVideoLog = (id) => {
	return {
		type: t.VIDEOLOG_SELECTED,
		payload: id,
	};
};