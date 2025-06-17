import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";


const createBooking = async (req, res, next) => {
	try {
		const {listing, startDate, endDate} = req.body
		if (!listing || !startDate || !endDate) {
			return res.status(400).json({message: "All fields are required"})
		}
		// Optionally: check for overlapping bookings here
		const exists = await Listing.findById(listing)
		if (!exists) return res.status(404).json({message: "Listing not found"})
		const booking = await Booking.create({
			listing,
			user: req.user._id,
			startDate,
			endDate,
		})
		res.status(201).json(booking)
	} catch (err) {
		next(err)
	}
}

export {createBooking}
