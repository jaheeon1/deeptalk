import * as t from "../types";

export const setTalkModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchTalks = () => {
	return {
		type: t.TALK_FETCH_REQUESTED,
	};
};

export const addTalk = (talk) => {
	return {
		type: t.TALK_ADD_REQUESTED,
		payload: talk,
	};
};

export const updateTalk = (talk) => {
	return {
		type: t.TALK_UPDATE_REQUESTED,
		payload: talk,
	};
};

export const deleteTalk = (id) => {
	return {
		type: t.TALK_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedTalk = (id) => {
	return {
		type: t.TALK_SELECTED,
		payload: id,
	};
};