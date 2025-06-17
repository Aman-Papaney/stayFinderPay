import Listing from "../models/Listing.js"

const getAllListings = async (req, res, next) => {
	try {
		const listings = await Listing.find().populate("host", "name email")
		res.json(listings)
	} catch (err) {
		next(err)
	}
}

const getListingById = async (req, res, next) => {
	try {
		const listing = await Listing.findById(req.params.id).populate("host", "name email")
		if (!listing) return res.status(404).json({message: "Listing not found"})
		res.json(listing)
	} catch (err) {
		next(err)
	}
}

const createListing = async (req, res, next) => {
	try {
		console.log(req.body);
		const {title, description, location, price, images} = req.body
		
		if (!title || !description || !location || !price) {
			return res.status(400).json({message: "All fields are required"})
		}
		const listing = await Listing.create({
			title,
			description,
			location,
			price,
			images: images || [],
			host: req.user._id,
		})
		res.status(201).json(listing)
	} catch (err) {
		next(err)
	}
}

const updateListing = async (req, res, next) => {
	try {
		const listing = await Listing.findById(req.params.id)
		if (!listing) return res.status(404).json({message: "Listing not found"})
		if (listing.host.toString() !== req.user._id.toString()) {
			return res.status(403).json({message: "Not authorized"})
		}
		Object.assign(listing, req.body)
		await listing.save()
		res.json(listing)
	} catch (err) {
		next(err)
	}
}

const deleteListing = async (req, res, next) => {
	try {
		const listing = await Listing.findById(req.params.id)
		if (!listing) return res.status(404).json({message: "Listing not found"})
		if (listing.host.toString() !== req.user._id.toString()) {
			return res.status(403).json({message: "Not authorized"})
		}
		await listing.deleteOne()
		res.json({message: "Listing deleted"})
	} catch (err) {
		next(err)
	}
}

export {getAllListings, getListingById, createListing, updateListing, deleteListing}
