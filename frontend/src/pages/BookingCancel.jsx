import React from "react"

const BookingCancel = () => (
	<div className='min-h-screen flex items-center justify-center bg-[#121928]'>
		<div className='bg-gray-900 p-8 rounded shadow-lg text-center border border-gray-700'>
			<h2 className='text-2xl font-bold text-red-400 mb-4'>Booking Cancelled</h2>
			<p className='text-gray-200'>Your payment was not completed. Please try again if you wish to book.</p>
		</div>
	</div>
)

export default BookingCancel
