
import "@/models/dbConnect"
import { AiStudios } from "@/models/AiStudios"
import Teacher from "@/models/Teacher"
import VideoLog from "@/models/VideoLog"

export default async (req, res) => {
    console.log('pages > /api/sync/indedx.js')
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                console.log('pages > /api/sync/indedx.js 2')
                const sToken = await AiStudios.getToken()
                const sAppId = 'aistudios.com'

                const oResModel = await AiStudios.getModelList(sAppId, sToken)
                let aTeachers = await Teacher.find()

                aTeachers = aTeachers.map(oVal => { return oVal.sync_id })
                console.log('sync step 2-2: 비디오 파일 생성 요청');
                let aTalkSteps = [
                    "반가워요",
                    "오늘 어떤 하루를 보내셨나요?"
                ]
                oResModel.models = oResModel.models.filter(oModel => {
                    return (!aTeachers.includes(oModel.id) && oModel.language.includes("ko"))
                })
                await oResModel.models.forEach((oModel, nIdx) => {
                    Teacher.create({
                        sync_id: oModel.id,
                        name: oModel.label.ko,
                        expertise: oModel.expertise.ko,
                        img_path: oModel.imgPath,
                        language: "ko"
                    })
                    aTalkSteps.forEach((sText, nStep) => {
                        AiStudios.makeVideo(sAppId, sToken, sText, {
                            modelId: oModel.id,
                            name: oModel.label.ko,
                            step: nStep
                        })
                    })
                })
                const aVideos = await VideoLog.find({'video_path':{$exists:false}});
                await aVideos.forEach((oVideo, nIdx) => {
                    AiStudios.findProject(sAppId, sToken, oVideo)
                })
                return res.status(200).json({
                    success: true,
                    data: aVideos
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: error
                });
            }
        default:
            res.setHeaders("Allow", ["GET", "POST"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }
}