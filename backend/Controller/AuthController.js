require("dotenv").config();
const QRCode = require('qrcode');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');

// Signup Function
const signup = async (req, res) => {
    try {
        const { name, email, password, phone, gender } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists. Please login.", 
                success: false 
            });
        }

        // Create a new user instance
        const userModel = new UserModel({ name, email, password, phone, gender });
        userModel.password = await bcrypt.hash(password, 10); // Hash the password

        // Save user to database
        await userModel.save();

        // Generate a unique profile URL
        const profileURL = `http://localhost:3001/profile/${userModel._id}`;

        // Generate QR code for the user's profile
        const qrCode = await QRCode.toDataURL(profileURL);

        // Save the QR code to the user's document
        userModel.qrCode = qrCode;
        await userModel.save();

        // Respond with success
        res.status(201).json({
            message: "Signup successful.",
            user: userModel,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error.", 
            error: error.message, 
            success: false 
        });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userModel = await UserModel.findOne({ email });
        if (!userModel) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found." 
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, userModel.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials." 
            });
        }

        // Successful login
        res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: userModel._id,
                name: userModel.name,
                email: userModel.email,
                qrCode: userModel.qrCode, // Optionally include the QR code here
            },
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error.", 
            error: error.message, 
            success: false 
        });
    }
};



const getUserDetails = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found." 
            });
        }

        // Respond with user details
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                qrCode: user.qrCode, // Include QR code
            },
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch user details.", 
            error: error.message 
        });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // Get the userId from the URL
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                qrCode: user.qrCode
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

const logout= async(req,res)=>{
    const {email}=req.body;
    try {
        // Delete user from MongoDB by email
        const deletedUser = await UserModel.findOneAndDelete({ email });
    
        if (!deletedUser) {
          return res.status(404).json({ success: false, message: 'User not found in MongoDB' });
        }
    
        res.status(200).json({ success: true, message: 'User data deleted from MongoDB successfully' });
      } catch (error) {
        console.error('Error deleting user from MongoDB:', error);
        res.status(500).json({ success: false, message: 'Error deleting user data' });
      }

}
module.exports = { signup, login, getUserDetails,getUserProfile,logout };

