import axios from "axios";
export class Sync {static async generateClientToken() {
      console.log('model > Sync > updateTeacher >1')
    try {
        const sAppId = "aistudios.com";
        const sBaseUrl = "https://dev.aistudios.com/api/odin/";
        const sUserKey = "6443234b-77d5-4013-bfd6-bb9399f317d9";
        const oHeader = {"Content-Type": "application/json"};
        const aTalkSteps = [
            "반가워요",
            "오늘 어떤 하루를 보내셨나요?"
        ]
         console.log('model > Sync > updateTeacher >2 세션 get 전')
         
        // let sToken = localStorage.getItem("DEEP_TOKEN")
        let sToken = ''
        console.log('model > Sync > updateTeacher >3 세션 get 후')
        let oBody = {
            appId: sAppId,
            platform: "web",
            uuid: sUserKey,
            key: "-N24q17rb_yQC2oXTIRd",
            sdk_v: "1.0",
            clientHostname: sAppId,
            isClientToken: true
        }
        const oApi = axios.create({
            baseURL: "https://dev.aistudios.com/api/odin/",
            headers: {
              "Content-Type": "application/json",
            },
          });
        // if (!sToken) {
            // 토큰 생성
            console.log('sync step 1: 토큰 생성');
            const { oResGetClient } = await oApi.get(
                `generateClientToken?appId=${sAppId}&userKey=${sUserKey}`)
        //   return `generateClientToken?appId=${sAppId}&userKey=${sUserKey}`;
        return oResGetClient   
        return {'adf': oResGetClient, 'sdf': 243}
            const {oResGetToken} = await oApi.post('generateToken', 
                Object.assign({}, oBody, {
                    token: oResGetClient.data.token
                })
            )
            return 122123903;
            sToken = oResGetToken.data.token;
            // localStorage.setItem("DEEP_TOKEN", sToken)
        // }
        return 1223;
        // 모델 데이터 가져오기
        // console.log('sync step 2: 모델 데이터 겟');
        // const oResGetModels = oApi.post('getModelList', 
        //     Object.assign(oBody, {token: sToken})
        // )

        // let aTeachers = await Teacher.find()
        // aTeachers = aTeachers.map( data => { return data.sync_id } )
        // console.log('sync step 2-2: 비디오 파일 생성 요청');
        // oResGetModels.models.filter( oModel => 
        //     aTeachers.includes(oModel.id) && oModel.language.includes("ko")
        // )
        // .forEach(oModel => {
        //     oModel = oModel.data
        //     aTalkSteps.forEach(nStep => {
        //         var oMakeVideo = oApi.post('makeVideo', 
        //             Object.assign({}, oBody, {
        //                 language: "ko",
        //                 text: "안녕하세요",
        //                 model: oModel.id
        //             })
        //         )
        //         Teacher.create({
        //             sync_id: oModel.id,
        //             name: oModel.label.ko,
        //             expertise: oModel.expertise.ko,
        //             image_path: oModel.imgPath,
        //             language: "ko"
        //         })
        //         // VideoLog.create({
        //         //     key: oMakeVideo.id,
        //         //     teacher_name: oModel.label.ko,
        //         //     step: nStep
        //         // })
        //     })
        // })
        // console.log('sync step 3: 비디오 파일 가져오기');
        // // const aVideo = VideoLog.find();
        // aVideo.forEach(oVideo => {
        //     var oGetVideo = oApi.post('makeVideo', 
        //         Object.assign({}, oBody, {
        //             key: oVideo.data.key
        //         })
        //     )

        //     if(oGetVideo.data.process < 100) { return }

        //     var sDirPath = "storage/talk/ko/"+oVideo.teacher_name
        //     var isExists = fs.existsSync( sDirPath );
        //     if( !isExists ) {
        //         fs.mkdirSync( sDirPath, { recursive: true } );
        //     }
        //     saveAs(oGetVideo.data.video, sDirPath+"/"+oVideo.step+".mp4")
        // })

        return data;
      } 
      catch (error) {
        throw new Error(error);
      }
    }

}