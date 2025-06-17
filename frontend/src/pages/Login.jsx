import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		if (!email || !password) {
			setError("Email and password are required")
			setLoading(false)
			return
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({email, password}),
			})
			if (!res.ok) throw new Error("Invalid credentials")
			const data = await res.json()
			localStorage.setItem("token", data["token"])
			localStorage.setItem("user", JSON.stringify(data["user"]))
			console.log(data["token"])

			navigate("/")
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-[#121928] flex items-center justify-center pt-2'>
			<div className='max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow w-full'>
				<h2 className='text-2xl font-bold mb-4 text-blue-400'>Login</h2>
				<form onSubmit={handleSubmit} className='space-y-3'>
					<div>
						<label className='block mb-1 font-medium text-gray-300'>Email</label>
						<input
							type='email'
							className='w-full border rounded px-3 py-2 bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className='block mb-1 font-medium text-gray-300'>Password</label>
						<input
							type='password'
							className='w-full border rounded px-3 py-2 bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className='text-red-400 text-sm'>{error}</div>}
					<button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition' disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
				<div className='mt-3 text-center'>
					<span className='text-gray-400'>Don't have an account? </span>
					<a href='/register' className='text-blue-400 hover:underline'>
						Register
					</a>
				</div>
			</div>
		</div>
	)
}

export default Login
