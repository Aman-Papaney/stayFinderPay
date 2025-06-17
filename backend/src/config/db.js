import "dotenv/config";

import mongoose from "mongoose"

const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI)

		.then(() => {
			console.log("Database Connection Successfull")
		})
		.catch((err) => {
			console.log(err)
		})
}

export default connectDB
