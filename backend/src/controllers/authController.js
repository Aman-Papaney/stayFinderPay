import User from "../models/User.js";
import jwt from "jsonwebtoken";


const register = async (req, res, next) => {
	try {
		const {name, email, password, isHost} = req.body
		if (!name || !email || !password) {
			return res.status(400).json({message: "All fields are required"})
		}
		const exists = await User.findOne({email})
		if (exists) return res.status(400).json({message: "Email already in use"})
		const user = await User.create({name, email, password, isHost})
		res.status(201).json({message: "User registered", user:user})
	} catch (err) {
		next(err)
	}
}

const login = async (req, res, next) => {
	try {
		const {email, password} = req.body
		if (!email || !password) {
			return res.status(400).json({message: "Email and password required"})
		}
		const user = await User.findOne({email})
		if (!user) return res.status(401).json({message: "Invalid credentials"})
		const isMatch = await user.comparePassword(password)
		if (!isMatch) return res.status(401).json({message: "Invalid credentials"})
		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
		res.json({token, user: {id: user._id, name: user.name, email: user.email, isHost: user.isHost}})
	} catch (err) {
		next(err)
	}
}
export { register, login };

