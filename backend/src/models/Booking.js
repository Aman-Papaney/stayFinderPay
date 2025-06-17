import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
	{
		listing: {type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true},
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
		startDate: {type: Date, required: true},
		endDate: {type: Date, required: true},
	},
	{timestamps: true}
)

export default mongoose.model("Booking", bookingSchema)
