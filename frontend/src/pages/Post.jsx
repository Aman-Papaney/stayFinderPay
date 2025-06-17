import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Post = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [location, setLocation] = useState("")
	const [price, setPrice] = useState("")
	const [image, setImage] = useState("")
	const [msg, setMsg] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setMsg("")
		setLoading(true)
		try {
			const token = localStorage.getItem("token")
			const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(token ? {Authorization: `Bearer ${token}`} : {}),
				},
				body: JSON.stringify({title, description, location, price, images: [image]}),
			})
			if (!res.ok) throw new Error("Failed to post listing")
			setMsg("Listing posted successfully!")
			setTitle("")
			setDescription("")
			setLocation("")
			setPrice("")
			setImage("")
			setTimeout(() => navigate("/"), 1200)
		} catch (err) {
			setMsg(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-[#121928] flex items-center justify-center pt-2'>
			<div className='max-w-lg mx-auto bg-gray-900 rounded-xl shadow-lg p-6 w-full border border-gray-700'>
				<h2 className='text-2xl font-bold mb-4 text-blue-400'>Post a New Listing</h2>
				<form onSubmit={handleSubmit} className='space-y-3'>
					<input
						type='text'
						className='w-full rounded px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700'
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<textarea
						className='w-full rounded px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700'
						placeholder='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<input
						type='text'
						className='w-full rounded px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700'
						placeholder='Location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
					<input
						type='number'
						className='w-full rounded px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700'
						placeholder='Price'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
					<input
						type='text'
						className='w-full rounded px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700'
						placeholder='Image URL'
						value={image}
						onChange={(e) => setImage(e.target.value)}
						required
					/>
					<button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition' disabled={loading}>
						{loading ? "Posting..." : "Post Listing"}
					</button>
				</form>
				{msg && <div className='mt-3 text-center text-blue-400'>{msg}</div>}
			</div>
		</div>
	)
}

export default Post
