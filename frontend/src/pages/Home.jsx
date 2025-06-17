import React, {useEffect, useState} from "react"
import PropertyCard from "../components/PropertyCard"

const Home = () => {
	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const token = localStorage.getItem("token")
				const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`, {
					headers: token ? {Authorization: `Bearer ${token}`} : {},
				})
				if (!res.ok) throw new Error("Failed to fetch properties")
				const data = await res.json()
				console.log("---",data);
				
				setProperties(data)

			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchListings()
	}, [])

	if (loading) return <div className='text-center py-10 text-white'>Loading...</div>
	if (error) return <div className='text-center text-red-400 py-10'>{error}</div>

	return (
		<div className='min-h-screen bg-[#121928] py-10 px-2 animate-fadeIn overflow-auto md:overflow-visible'>
			<h1 className='text-4xl font-extrabold mb-10 text-center text-white tracking-tight animate-slideDown'>Discover Your Next Stay</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{properties.map((p, i) => (
					<div key={p._id || i} className='animate-fadeInUp' style={{animationDelay: `${i * 80}ms`}}>
						<PropertyCard {...p} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Home
