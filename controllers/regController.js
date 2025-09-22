import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const FIREBASE_API_KEY = process.env.FIREBASE_KEY;
import prisma from "../config/prismaConfig.js";

export const register = async (req, res) => {
    const { ispName, ownerName, ispLogo, phone, email, password } = req.body;
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
        const { localId } = response.data;
        const userData = {
            isp_id_firebase: localId,
            ispName,
            ownerName,
            ispLogo,
            phone,
            email
        };
        const newUser = await prisma.isp.create(userData);
        return res.status(201).json({ message: "Registration successful", user: newUser });
}catch (error) {
        return res.status(401).json({ message: "Registration failed", error: error.response?.data || error.message });
    }
}