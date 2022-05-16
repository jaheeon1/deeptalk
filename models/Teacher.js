import mongoose from "mongoose";
 

const TeacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
    sync_id: {
		type: String,
		required: [false],
		trim: true,
	},
	expertise: {
		type: String,
		required: [false],
		trim: true,
	},
	imgPath: {
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