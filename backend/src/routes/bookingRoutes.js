import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();


router.post("/", auth,  upload.array("images"), createBooking)

export default router
