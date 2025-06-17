import React from "react"
import {Link} from "react-router-dom"

const PropertyCard = ({_id, images, title, location, price}) => (
	<Link
		to={`/listing/${_id}`}
		className=' bg-gray-800 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 group h-full min-h-[350px] flex flex-col'
	>
		<div className='w-full h-48 flex items-center justify-center bg-gray-900'>
			<img src={images[0]} alt={title} className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300' />
		</div>
		<div className='p-5 flex-1 flex flex-col justify-between'>
			<div>
				<h3 className='text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors duration-200'>{title}</h3>
				<p className='text-gray-400 text-sm mb-2'>{location}</p>
			</div>
			<div className='text-blue-400 font-bold text-lg mt-2'>${price}</div>
		</div>
	</Link>
)

export default PropertyCard
