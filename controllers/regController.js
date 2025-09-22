import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const FIREBASE_API_KEY = process.env.FIREBASE_KEY;
import prisma from "../config/prismaConfig.js";

export const register = async (req, res) => {
    const { ispName, ownerName, ispLogo, phone, email, password } = req.body;

    try {
        if (!ispName || !ownerName || !phone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                required: ["ispName", "ownerName", "phone", "email", "password"],
            });
        }

        const existingPhone = await prisma.isp.findUnique({
            where: { phone },
        });

        if (existingPhone) {
            return res.status(409).json({
                success: false,
                message: "Phone number already registered",
            });
        }

        const firebaseResponse = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        const { localId } = firebaseResponse.data;

        const newUser = await prisma.isp.create({
            data: {
                isp_id_firebase: localId,
                ispName,
                ownerName,
                ispLogo: ispLogo || null,
                phone,
                email,
                password,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: newUser,
        });
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);

        if (error.response?.data?.error?.message) {
            return res.status(400).json({
                success: false,
                message: "Firebase registration failed",
                error: error.response.data.error.message,
            });
        }

        if (error.code) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message,
        });
    }
};