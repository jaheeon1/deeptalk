import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	teacherList: [],
	selectedTeacher: undefined,
	isTeacherModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN_TEACHER:
			return {
				...state,
				isTeacherModalOpen: action.payload,
			};
		case t.TEACHER_FETCH_SUCCEEDED:
			return {
				...state,
				teacherList: action.payload,
			};
		case t.TEACHER_ADD_SUCCEEDED:
			return {
				...state,
				teacherList: [action.payload, ...state.teacherList],
			};
		case t.TEACHER_UPDATE_SUCCEEDED:
			const updatedTeacher = state.teacherList.map((teacher) => {
				if (teacher._id === action.payload._id) {
					return {
						...teacher,
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
				return teacher;
			});

			return { ...state, teacherList: updatedTeacher };
		case t.TEACHER_DELETE_SUCCEEDED:
			const newTeacherList = state.teacherList.filter(
				(teacher) => teacher._id !== action.payload
			);
			return {
				...state,
				teacherList: newTeacherList,
			};
		case t.TEACHER_SELECTED:
			const selectedTeacher = state.teacherList.find(
				(teacher) => teacher._id === action.payload
			);
			return {
				...state,
				selectedTeacher,
			};
        case t.TEACHER_SYNC_SUCCEEDED:
            return {
                ...state,
                teacherList: action.payload,
            };
		default:
			return state;
	}
};

export default mainReducer;