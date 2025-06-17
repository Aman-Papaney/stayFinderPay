import express from "express"
import stripe from "../config/stripe.js"

const router = express.Router()

// POST /api/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
	const {amount, bookingId, userEmail} = req.body

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Stay Booking",
						},
						unit_amount: amount * 100, // amount in cents
					},
					quantity: 1,
				},
			],
			customer_email: userEmail,
			success_url: `${process.env.FRONTEND_URL}/booking-success?bookingId=${bookingId}`,
			cancel_url: `${process.env.FRONTEND_URL}/booking-cancel`,
			metadata: {bookingId},
		})

		res.json({url: session.url})
	} catch (error) {
		res.status(500).json({error: error.message})
	}
})

export default router
