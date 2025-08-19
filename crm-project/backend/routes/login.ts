import User from "../models/User.js";

export const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ success: false, message: "Email and password required" });
	}
	try {
		const user = await User.findOne({ email, password });
		if (user) {
			res.status(200).json({ success: true, message: "Login successful", role: user.role, name: user.name });
		} else {
			res.status(401).json({ success: false, message: "Invalid credentials" });
		}
	} catch (err) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};
