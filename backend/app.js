import "dotenv/config"
import express from "express"

import connectDB from "./src/config/db.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import cors from "cors"

import authRoutes from "./src/routes/authRoutes.js"
import listingRoutes from "./src/routes/listingRoutes.js"
import bookingRoutes from "./src/routes/bookingRoutes.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/listings", listingRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/payments", paymentRoutes)

app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
