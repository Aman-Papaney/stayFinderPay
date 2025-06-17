import express from "express";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { 
  getAllListings, 
  getListingById, 
  createListing, 
  updateListing, 
  deleteListing 
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getAllListings)
router.get("/:id", getListingById)
router.post("/", auth, upload.array("images"), createListing)
router.put("/:id", auth, updateListing)
router.delete("/:id", auth, deleteListing)

export default router
