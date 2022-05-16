
import "@/models/dbConnect";
import { AiStudios } from "@/models/AiStudios";
import Teacher from "@/models/Teacher";
import VideoLog from "@/models/VideoLog";
import Student from "@/models/Student";

export default async (req, res) => {
    console.log('pages > /api/sync/indedx.js');
	const { method } = req;
	switch (method) {
		case "GET":
			try {
                let Student = await Student.find()
                return res.status(200).json({
                    success: true,
                    data: Usesr,
                  });
                const oResToken = await AiStudios.generateClientToken();
                const sToken = oResToken.token;
                const oResModel = await AiStudios.getModelList('aistudios.com', sToken)
                let aTeachers = await Teacher.find()
                
                aTeachers = aTeachers.map( a => { return a.sync_id } )
                console.log('sync step 2-2: 비디오 파일 생성 요청');
                let aTalkSteps = [
                    "반가워요",
                    "오늘 어떤 하루를 보내셨나요?"
                ]
                  await oResModel.models.filter( oModel => 
                    aTeachers.includes(oModel.id) && oModel.language.includes("ko")
                )
                .forEach(oModel => {
                    oModel = oModel.data
                    aTalkSteps.forEach(nStep => {
                        var oMakeVideo =  AiStudios.getModelList('makeVideo', {
                            appId:"aistudios.com",
                            platform: "web",
                            uuid: "6443234b-77d5-4013-bfd6-bb9399f317d9",
                            key: "-N24q17rb_yQC2oXTIRd",
                            sdk_v: "1.0",
                            clientHostname: "aistudios.com",
                            isClientToken: true,
                            language: "ko",
                            text: "안녕하세요",
                            model: oModel.id
                        })
                        Teacher.create({
                            sync_id: oModel.id,
                            name: oModel.label.ko,
                            expertise: oModel.expertise.ko,
                            image_path: oModel.imgPath,
                            language: "ko"
                        })
                        VideoLog.create({
                            key: oMakeVideo.id,
                            teacher_name: oModel.label.ko,
                            step: nStep
                        })
                    })
                })
    
                return res.status(200).json({
                  success: true,
                  data: oResModel,
                });
			} catch (error) {
				return res.status(400).json({
					success: false,
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