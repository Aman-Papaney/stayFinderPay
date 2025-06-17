import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
	{
		title: {type: String, required: true},
		description: {type: String, required: true},
		location: {type: String, required: true},
		price: {type: Number, required: true},
		images: [{type: String}],
		host: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	},
	{timestamps: true}
)

export default mongoose.model("Listing", listingSchema)
