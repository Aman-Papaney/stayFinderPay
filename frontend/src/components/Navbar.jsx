import React, {useEffect, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"

const Navbar = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const stored = localStorage.getItem("user")
		if (stored) {
			try {
				const parsed = JSON.parse(stored)
				setUser(parsed.user || parsed)
			} catch {
				setUser(null)
			}
		} else {
			setUser(null)
		}
	}, [location])

	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		setUser(null)
		navigate("/login")
	}

	return (
		<nav className='fixed top-0 left-0 w-full bg-gray-950 bg-opacity-95 shadow-lg z-50 border-b border-gray-800'>
			<div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
				<Link to='/' className='text-2xl font-extrabold text-blue-400 tracking-tight hover:text-blue-300 transition-colors duration-200'>
					StayFinder
				</Link>
				<div className='space-x-4'>
					{user && (
						<Link to='/post' className={`font-medium hover:text-blue-400 ${location.pathname === "/post" ? "text-blue-400" : "text-gray-300"}`}>
							Post
						</Link>
					)}
					{user ? (
						<>
							<span className='font-medium text-gray-200'>{user.name}</span>
							<button onClick={handleLogout} className='font-medium text-red-400 hover:text-red-600 ml-4'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to='/login' className={`font-medium hover:text-blue-400 ${location.pathname === "/login" ? "text-blue-400" : "text-gray-300"}`}>
								Login
							</Link>
							<Link to='/register' className={`font-medium hover:text-blue-400 ${location.pathname === "/register" ? "text-blue-400" : "text-gray-300"}`}>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
