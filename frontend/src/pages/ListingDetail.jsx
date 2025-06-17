import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const ListingDetail = () => {
	const {id} = useParams()
	const [property, setProperty] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const [bookingMsg, setBookingMsg] = useState("")
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}`)
				if (!res.ok) throw new Error("Failed to fetch property")
				const data = await res.json()
				setProperty(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchProperty()

		const storedUser = localStorage.getItem("user")
		if (storedUser) setUser(JSON.parse(storedUser))
	}, [id])

	const handleBooking = async (e) => {
		e.preventDefault()
		setBookingMsg("")
		if (!startDate || !endDate) {
			setBookingMsg("Please select start and end dates.")
			return
		}
		try {
			const token = localStorage.getItem("token")
			// 1. Create booking first (optional, or do after payment)
			const bookingRes = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(token ? {Authorization: `Bearer ${token}`} : {}),
				},
				body: JSON.stringify({
					listing: id,
					startDate,
					endDate,
				}),
			})
			if (!bookingRes.ok) throw new Error("Booking failed")
			const bookingData = await bookingRes.json()

			// 2. Create Stripe Checkout Session
			const paymentRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-checkout-session`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount: property.price,
					bookingId: bookingData._id || bookingData.booking?._id || id,
					userEmail: user?.email,
				}),
			})
			const paymentData = await paymentRes.json()
			if (!paymentRes.ok) throw new Error(paymentData.error || "Payment session failed")
			window.location.href = paymentData.url
		} catch (err) {
			setBookingMsg(err.message)
		}
	}

	if (loading) return <div className='text-center py-10'>Loading...</div>
	if (error) return <div className='text-center text-red-500 py-10'>{error}</div>
	if (!property) return null

	return (
		<div className='min-h-screen bg-[#121928]'>
			<div className='max-w-3xl mx-auto'>
				<img src={property.images[0]} alt={property.title} className='w-full h-72 object-cover rounded-lg mb-6' />
				<h2 className='text-2xl font-bold mb-2 text-gray-100'>{property.title}</h2>
				<p className='text-gray-400 mb-4'>{property.location}</p>
				<div className='mb-4 text-gray-200'>{property.description}</div>
				<div className='bg-gray-900 rounded p-4 mt-6 border border-gray-700'>
					{user ? (
						<form onSubmit={handleBooking} className='w-full flex flex-col md:flex-row md:items-end md:space-x-4 gap-4'>
							<div className='flex-1'>
								<label className='block font-medium mb-1 text-gray-300'>Start Date</label>
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									selectsStart
									startDate={startDate}
									endDate={endDate}
									minDate={new Date()}
									className='border border-gray-600 rounded px-3 py-2 w-full bg-gray-800 text-gray-100'
									placeholderText='Select start date'
								/>
							</div>
							<div className='flex-1'>
								<label className='block font-medium mb-1 text-gray-300'>End Date</label>
								<DatePicker
									selected={endDate}
									onChange={(date) => setEndDate(date)}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate || new Date()}
									className='border border-gray-600 rounded px-3 py-2 w-full bg-gray-800 text-gray-100'
									placeholderText='Select end date'
								/>
							</div>
							<button type='submit' className='bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition h-12 mt-6 md:mt-0'>
								Book
							</button>
						</form>
					) : (
						<div className='text-center text-gray-400 py-6'>Please log in to book this property.</div>
					)}
					{bookingMsg && <div className='mt-2 text-center text-sm text-blue-400'>{bookingMsg}</div>}
				</div>
			</div>
		</div>
	)
}

export default ListingDetail
