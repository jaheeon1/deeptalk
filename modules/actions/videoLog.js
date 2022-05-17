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

export const addVideoLog = (videoLog) => {
	return {
		type: t.VIDEOLOG_ADD_REQUESTED,
		payload: videoLog,
	};
};

export const updateVideoLog = (videoLog) => {
	return {
		type: t.VIDEOLOG_UPDATE_REQUESTED,
		payload: videoLog,
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