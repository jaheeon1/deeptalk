import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	studentList: [],
	selectedStudent: undefined,
	isAuthModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN_AUTH:
			return {
				...state,
				isAuthModalOpen: action.payload,
			};
		case t.MODAL_OPEN_LOGIN:
			return {
				...state,
				isLoginModalOpen: action.payload,
			};
		case t.MODAL_OPEN_REGISTER:
			return {
				...state,
				isRegisterModalOpen: action.payload,
			};
		case t.LOGIN_REQUESTED:
			return { ...state, ...action.payload };
		case t.LOGOUT_REQUESTED:
			return { ...state, ...action.payload };
		case t.STUDENT_FETCH_SUCCEEDED:
			return {
				...state,
				studentList: action.payload,
			};
		case t.STUDENT_ADD_SUCCEEDED:
			return {
				...state,
				studentList: [action.payload, ...state.studentList],
			};
		case t.STUDENT_UPDATE_SUCCEEDED:
			const updatedStudent = state.studentList.map((student) => {
				if (student._id === action.payload._id) {
					return {
						...student,
                        studentid: action.payload.studentid,
                        password: action.payload.password,
                        name: action.payload.name,
                        email: action.payload.email,
                        address: action.payload.address,
                        phone: action.payload.phone,
					};
				}
				return student;
			});

			return { ...state, studentList: updatedStudent };
		case t.STUDENT_DELETE_SUCCEEDED:
			const newStudentList = state.studentList.filter(
				(student) => student._id !== action.payload
			);
			return {
				...state,
				studentList: newStudentList,
			};
		case t.STUDENT_SELECTED:
			const selectedStudent = state.studentList.find(
				(student) => student._id === action.payload
			);
			return {
				...state,
				selectedStudent,
			};
		case t.LOGIN_REQUESTED_SUCCEEDED:
			   
			return {
				...state,
				loginedStudent,
			};
		case t.SAVE_TOKEN:
			return {
				...state,
				token: action.payload.token
			};
		case t.DELETE_TOKEN:
			return {
				...state,
				token: ''
			};
		default:
			return state;
	}
};

export default mainReducer;