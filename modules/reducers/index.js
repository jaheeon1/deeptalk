import { combineReducers } from "redux";
import talkReducer from "./talk";
import authReducer from "./auth";
import teacherReducer from "./teacher";
import videoLogReducer from "./videoLog";

const rootReducer = combineReducers({
	talk: talkReducer,
	auth: authReducer,
	teacher: teacherReducer,
    videoLog: videoLogReducer
});

export default rootReducer;