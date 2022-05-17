import mongoose from "mongoose";
 

const TeacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [false],
		trim: true,
	},
    sync_id: {
		type: String,
		required: [true, "sync_id is required!"],
		trim: true,
	},
	expertise: {
		type: String,
		required: [false],
		trim: true,
	},
	img_path: {
		type: String,
		required: [false],
		trim: true,
	},
    language: {
		type: String,
		required: [false],
		trim: true,
	},
	intro: {
		type: String,
		required: [false],
		trim: true,
	},
});

export default mongoose.models.Teacher ||
	mongoose.model("Teacher", TeacherSchema);