import { all } from "redux-saga/effects";
import * as talk from "./talk";
import * as teacher from "./teacher";
import * as auth from "./auth";
import * as videoLog from "./videoLog";

export default function* rootSaga() {
	yield all([
		talk.watchFetchTalks(),
		talk.watchAddTalk(),
		talk.watchRemoveTalk(),
		talk.watchUpdateTalk(),
        
		teacher.watchFetchTeachers(),
		teacher.watchAddTeacher(),
		teacher.watchRemoveTeacher(),
		teacher.watchUpdateTeacher(),
        teacher.watchSyncTeachers(),
        
		auth.watchFetchStudents(),
		auth.watchAddStudent(),
		auth.watchRemoveStudent(),
		auth.watchUpdateStudent(),
		auth.watchLoginStudent(),
		auth.watchLogoutStudent(),

        videoLog.watchFetchVideoLogs(),
		videoLog.watchAddVideoLog(),
		videoLog.watchRemoveVideoLog(),
		videoLog.watchUpdateVideoLog(),
	]);
}