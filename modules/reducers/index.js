import { combineReducers } from "redux";
import talkReducer from "./talk";
import authReducer from "./auth";
import teacherReducer from "./teacher";

const rootReducer = combineReducers({
	talk: talkReducer,
	auth: authReducer,
	teacher: teacherReducer,
});

export default rootReducer;