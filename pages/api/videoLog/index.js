
import VideoLog from "@/models/VideoLog";
import "@/models/dbConnect";

export default async (req, res) => {
	const { method } = req;
    console.log('pages > /api/videoLog/index.js');
	switch (method) {
		case "GET":
			try {
				const videoLog = await VideoLog.find();
                console.log('videoLog')
                console.log(videoLog)
				return res.status(200).json({
					success: true,
					data: videoLog,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "POST":
			try {
				const videoLog = await VideoLog.create(req.body);
				return res.status(201).json({
					success: true,
					data: videoLog,
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
};