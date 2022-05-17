import mongoose from "mongoose";
 

const VideoLogSchema = new mongoose.Schema({
	key: {
		type: String,
		required: [false],
		trim: true,
	},
    teacher_name: {
		type: String,
		required: [false],
		trim: true,
	},
    step: {
		type: String,
		required: [false],
		trim: true,
	},
    video_path: {
        type: String,
		required: [false],
		trim: true,
    }
});

export default mongoose.models.VideoLog ||
	mongoose.model("VideoLog", VideoLogSchema);

   




