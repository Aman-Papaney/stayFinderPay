import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ListingDetail from "./pages/ListingDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Post from "./pages/Post"
import BookingSuccess from "./pages/BookingSuccess"
import BookingCancel from "./pages/BookingCancel"

function App() {
	return (
		<Router>
			<div className='min-h-screen bg-[#121928]'>
				<Navbar />
				<div className='pt-20 max-w-7xl mx-auto px-4'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/listing/:id' element={<ListingDetail />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/post' element={<Post />} />
						<Route path='/booking-success' element={<BookingSuccess />} />
						<Route path='/booking-cancel' element={<BookingCancel />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
