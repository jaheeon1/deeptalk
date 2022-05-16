import mongoose from "mongoose";

const TalkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email is required!"],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "Phone is required!"],
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Talk ||
	mongoose.model("Talk", TalkSchema);