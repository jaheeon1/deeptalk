import { put, takeLatest } from "redux-saga/effects"
import * as t from "../types"
import checkLogined  from "../lambdas/checkLogined"

export function* fetchTeachers() {
	try {
		checkLogined();
		const response = yield fetch("/api/teacher");

		const teacherList = yield response.json();

		yield put({
			type: t.TEACHER_FETCH_SUCCEEDED,
			payload: teacherList.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchTeachers() {
    console.log('watchfetchteacher');
	yield takeLatest(t.TEACHER_FETCH_REQUESTED, fetchTeachers);
}

export function* addTeacher(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/teacher", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		const newTeacher = yield response.json();

		yield put({
			type: t.TEACHER_ADD_SUCCEEDED,
			payload: newTeacher.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddTeacher() {
	yield takeLatest(t.TEACHER_ADD_REQUESTED, addTeacher);
}

export function* deleteTeacher(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/teacher/" + action.payload, {
			method: "DELETE",
		});

		const deletedTeacher = yield response.json();

		yield put({
			type: t.TEACHER_DELETE_SUCCEEDED,
			payload: deletedTeacher.data.id,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveTeacher() {
	yield takeLatest(t.TEACHER_DELETE_REQUESTED, deleteTeacher);
}

export function* updateTeacher(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/teacher/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedTeacher = yield response.json();

		yield put({
			type: t.TEACHER_UPDATE_SUCCEEDED,
			payload: updatedTeacher.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateTeacher() {
	yield takeLatest(t.TEACHER_UPDATE_REQUESTED, updateTeacher);
}

export function* syncTeachers() {
    console.log('여기왔다');
	try {
        const sAppId = "aistudios.com"
        const sUrl = "https://dev.aistudios.com/api/odin/"
		const sUserKey = "6443234b-77d5-4013-bfd6-bb9399f317d9"
        const oHeader = {"Content-Type": "application/json"}
        const aTalkSteps = [
            "반가워요",
            "오늘 어떤 하루를 보내셨나요?"
        ]
        let oBody = {
            appId: sAppId,
            platform: "web",
            uuid: sUserKey,
            key: "-N24q17rb_yQC2oXTIRd",
            sdk_v: "1.0",
            clientHostname: sAppId,
            isClientToken: true
        }
        console.log('oBody', oBody)
        let sToken = sessionStorage.getItem("DEEP_TOKEN");
        console.log('sToken', sToken)
        if(!sToken) {   
            const oClientToken = yield fetch(sUrl+"generateClientToken?appId="+sAppId+"&userKey="+sUserKey);
            console.log('oClientToken', oClientToken)
            const oToken = yield fetch(sUrl + "generateToken", {
                method: "POST",
                headers: oHeader,
                body: Object.assign({}, oBody, {
                    token: oClientToken.data.token
                })
            })
            sToken = oToken.data.token;
            sessionStorage.setItem("DEEP_TOKEN", sToken)
            console.log('oToken', oToken)
        }
        let oModel = yield fetch(sUrl + "getModelList", {
			method: "POST",
			headers: oHeader,
			body: Object.assign(oBody, {
                token: sToken
            })
		})
        console.log('oModel', oModel)
        aStoredTeachers = aStoredTeachers.map(data => { return data.sync_id })
        yield oModel.models
        .filter(model => aStoredTeachers.includes(model.id) && model.language.includes("ko"))
        .forEach(val => {
            aTalkSteps.forEach(nStep => {
                var oMakeVideo = fetch(sUrl + "makeVideo", {
                    method: "POST",
                    headers: oHeader,
                    body: Object.assign({}, oBody, {
                        language: "ko",
                        text: "안녕하세요",
                        model: id
                    }),
                })
                console.log('oMakeVideo', oMakeVideo)

                fetch("/api/teacher", {
                    method: "POST",
                    headers: oHeader,
                    body: {
                        sync_id: val.data.id,
                        name: val.data.label.ko,
                        expertise: val.data.expertise.ko,
                        image_path: val.data.imgPath,
                        language: "ko"
                    },
                });
                fetch("/api/videoLog", {
                    method: "POST",
                    headers: oHeader,
                    body: {
                        key: val.data.id,
                        teacher_name: val.data.label.ko,
                        step: nStep
                    },
                });
            })
        })

        let aVideo = yield fetch("/api/videoLog");
        yield aVideo.forEach(val2 => {
            var oGetVideo = fetch(sUrl + "makeVideo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: Object.assign({}, oBody, {
                    key: val2.data.key
                }) ,
            })

            if(oGetVideo.data.process < 100) {
                return
            }
            
            var sDirPath = "storage/talk/ko/"+val2.teacher_name
            var isExists = fs.existsSync( sDirPath );
            if( !isExists ) {
                fs.mkdirSync( sDirPath, { recursive: true } );
            }
            console.log(sDirPath);
            saveAs(oGetVideo.data.video, sDirPath+"/"+val2.step+".mp4")
        })

        console.log('끝');
        const response = yield fetch("/api/teacher");
        const teacherList = yield response.json();


		yield put({
			type: t.TEACHER_SYNC_SUCCEEDED,
			payload: teacherList.data,
		});
	} catch (error) {
		yield put({
			type: t.TEACHER_SYNC_FAILED,
			payload: error.t0.message,
		});
	}
}

export function* watchSyncTeachers() {
    console.log('watchsyncteacher');
	yield takeLatest(t.TEACHER_SYNC_REQUESTED, syncTeachers);
}