import axios from "axios";
import fs from "fs"
import VideoLog from "@/models/VideoLog"
export class AiStudios {
    static DEEPBRAINAI_API_BASE_URL = "https://dev.aistudios.com/api/odin/";
    static DEEPBRAINAI_API_APP_ID = "aistudios.com";
    static DEEPBRAINAI_API_CLIENT_HOST_NAME = "aistudios.com";
    static DEEPBRAINAI_API_UUID = "6443234b-77d5-4013-bfd6-bb9399f317d9";

    //GET
    static async getToken() {
        try {
            console.log('in AiStudio getToken');
            const axiosInstance = axios.create({
                baseURL: "https://dev.aistudios.com/api/odin/",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const { data } = await axiosInstance.get(
                `generateClientToken?appId=${AiStudios.DEEPBRAINAI_API_APP_ID}&userKey=${AiStudios.DEEPBRAINAI_API_UUID}`
            );
            return data.token;
        } catch (error) {
            throw new Error(error);
        }
    }

    //POST
    static async getModelList(appId, token) {
        try {
            const axiosInstance = axios.create({
                baseURL: AiStudios.DEEPBRAINAI_API_BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const body = {
                appId, // 발급받은 appId
                platform: "web", // 플랫폼, 고정 값
                isClientToken: true, // 인증 방식이 ClientToken 방식인지 여부
                token, // 토큰
                uuid: AiStudios.DEEPBRAINAI_API_UUID, // 요청 고유 아이디
                sdk_v: "1.0", // SDK 버전 명시
                clientHostname: appId, // 호스트명, appId 와 동일
            };

            const { data } = await axiosInstance.post("getModelList", body);

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    //POST
    static async getModelInfo(appId, token, model) {
        try {
            const axiosInstance = axios.create({
                baseURL: AiStudios.DEEPBRAINAI_API_BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const body = {
                appId, // 발급받은 appId
                platform: "web", // 플랫폼, 고정 값
                isClientToken: true, // 인증 방식이 ClientToken 방식인지 여부
                token, // 토큰
                uuid: AiStudios.DEEPBRAINAI_API_UUID, // 요청 고유 아이디
                sdk_v: "1.0", // SDK 버전 명시
                clientHostname: appId, // 호스트명, appId 와 동일
                model, // 모델 식별 아이디
            };

            const { data } = await axiosInstance.post("getModelInfo", body);

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    //POST
    static async makeVideo(appId, token, text, oParams) {
        try {
            const axiosInstance = axios.create({
                baseURL: AiStudios.DEEPBRAINAI_API_BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const body = {
                appId, // 발급받은 appId
                platform: "web", // 플랫폼, 고정 값
                isClientToken: true, // 인증 방식이 ClientToken 방식인지 여부
                token, // 토큰
                uuid: AiStudios.DEEPBRAINAI_API_UUID, // 요청 고유 아이디
                sdk_v: "1.0", // SDK 버전 명시
                clientHostname: appId, // 호스트명, appId 와 동일
                language: "ko", // AI 사용 언어
                text, // AI 영상으로 변환할 텍스트
                model: oParams.modelId, // 모델 식별 아이디
            };
            console.log(body)
            await axiosInstance.post("makeVideo", body)
            .then(function(oRes) {
                if(!oRes.data.success) {
                    throw new Error('makeVideo error')
                }
                VideoLog.create({
                    key: oRes.data.data.key,
                    teacher_name: oParams.name,
                    step: oParams.step
                })  
            });
            
        } catch (error) {
            throw new Error(error);
        }
    }

    //POST
    static async findProject(appId, token, oVideo) {
        try {
            const axiosInstance = axios.create({
                baseURL: AiStudios.DEEPBRAINAI_API_BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const body = {
                appId, // 발급받은 appId
                platform: "web", // 플랫폼, 고정 값
                isClientToken: true, // 인증 방식이 ClientToken 방식인지 여부
                token, // 토큰
                uuid: AiStudios.DEEPBRAINAI_API_UUID, // 요청 고유 아이디
                sdk_v: "1.0", // SDK 버전 명시
                clientHostname: appId, // 호스트명, appId 와 동일
                key: oVideo.key, // 발급받은 프로젝트 식별 아이디
            };
            await axiosInstance.post("findProject", body)
            .then( result => {
                const oRes = result.data.data
                if (oRes.process < 100) { return oRes }
                VideoLog.update({key: oVideo.key}, 
                    { $set: {video_path: oRes.video}})  
                return oRes;
            });

           
        } catch (error) {
            throw new Error(error);
        }
    }
}
