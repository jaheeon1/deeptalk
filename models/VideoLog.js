import mongoose from "mongoose";
 

const VideoLogSchema = new mongoose.Schema({
	key: {
		type: String,
		required: [true, "Name is required!"],
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
});

export default mongoose.models.Teacher ||
	mongoose.model("VideoLog", VideoLogSchema);

   