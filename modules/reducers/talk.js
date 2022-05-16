import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	talkList: [],
	selectedTalk: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.TALK_FETCH_SUCCEEDED:
			return {
				...state,
				talkList: action.payload,
			};
		case t.TALK_ADD_SUCCEEDED:
			return {
				...state,
				talkList: [action.payload, ...state.talkList],
			};
		case t.TALK_UPDATE_SUCCEEDED:
			const updatedTalk = state.talkList.map((talk) => {
				if (talk._id === action.payload._id) {
					return {
						...talk,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return talk;
			});

			return { ...state, talkList: updatedTalk };
		case t.TALK_DELETE_SUCCEEDED:
			const newTalkList = state.talkList.filter(
				(talk) => talk._id !== action.payload
			);
			return {
				...state,
				talkList: newTalkList,
			};
		case t.TALK_SELECTED:
			const selectedTalk = state.talkList.find(
				(talk) => talk._id === action.payload
			);
			return {
				...state,
				selectedTalk,
			};
		default:
			return state;
	}
};

export default mainReducer;