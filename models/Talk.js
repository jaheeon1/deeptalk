import mongoose from "mongoose";

const TalkSchema = new mongoose.Schema({
	step: {
		type: String,
		required: [true, "step is required!"],
		trim: true,
	},
	video_path: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		default: 'happy',
		trim: true,
	},
	teacher_id: {
		type: String,
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Talk ||
	mongoose.model("Talk", TalkSchema);