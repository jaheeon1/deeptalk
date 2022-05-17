import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	videoLogList: [],
	selectedVideoLog: undefined,
	isVideoLogModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	console.log('in videoslog main reduver');
    switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN_VIDEOLOG:
			return {
				...state,
				isVideoLogModalOpen: action.payload,
			};
		case t.VIDEOLOG_FETCH_SUCCEEDED:
			return {
				...state,
				videoLogList: action.payload,
			};
		case t.VIDEOLOG_ADD_SUCCEEDED:
			return {
				...state,
				videoLogList: [action.payload, ...state.videoLogList],
			};
		case t.VIDEOLOG_UPDATE_SUCCEEDED:
			const updatedVideoLog = state.videoLogList.map((videoLog) => {
				if (videoLog._id === action.payload._id) {
					return {
						...videoLog,
                        provincial_office: action.payload.provincial_office,
                        regional_office: action.payload.regional_office,
                        region: action.payload.region,
                        school_code: action.payload.school_code,
                        school_name: action.payload.school_name,
                        school_level_code: action.payload.school_level_code,
                        establishment_classification: action.payload.establishment_classification,
                        exclusion: action.payload.exclusion,
                        meal_cost: action.payload.meal_cost,
					};
				}
				return videoLog;
			});

			return { ...state, videoLogList: updatedVideoLog };
		case t.VIDEOLOG_DELETE_SUCCEEDED:
			const newVideoLogList = state.videoLogList.filter(
				(videoLog) => videoLog._id !== action.payload
			);
			return {
				...state,
				videoLogList: newVideoLogList,
			};
		case t.VIDEOLOG_SELECTED:
			const selectedVideoLog = state.videoLogList.find(
				(videoLog) => videoLog._id === action.payload
			);
			return {
				...state,
				selectedVideoLog,
			};
        case t.VIDEOLOG_SYNC_SUCCEEDED:
            return {
                ...state,
                videoLogList: action.payload,
            };
		default:
			return state;
	}
};

export default mainReducer;