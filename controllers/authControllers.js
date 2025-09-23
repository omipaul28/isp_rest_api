import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const FIREBASE_API_KEY = process.env.FIREBASE_KEY;
import prisma from "../config/prismaConfig.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        const { localId } = response.data;
        const user = await prisma.isp.findUnique({
            where: { isp_id_firebase: localId }
        });
        req.session.user =user;

        return res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials", error: error.response?.data || error.message });
    }
}

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.json({ message: "Logged out" });
    });
}