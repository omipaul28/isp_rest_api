import dotenv from 'dotenv';
dotenv.config();
import prisma from "../config/prismaConfig.js";
import axios from 'axios';
const FIREBASE_KEY = process.env.FIREBASE_KEY;

export const ispProfile = async (req, res) => {
    const uid = req.session.user.uid;
    const user = await prisma.isp.findUnique({
        where: { isp_id_firebase: uid }
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
}


export const ispProfileUpdate = async (req, res) => {
    try {
        const uid = req.session.user.uid;
        if (!uid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not logged in",
            });
        }

        const { ispName, ispLogo } = req.body;

        const currentUser = await prisma.isp.findUnique({
            where: { isp_id_firebase: uid },
        });

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updateData = {};
        if (ispName && ispName !== currentUser.ispName) {
            updateData.ispName = ispName;
        }
        if (ispLogo && ispLogo !== currentUser.ispLogo) {
            updateData.ispLogo = ispLogo;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(200).json({
                success: true,
                message: "No changes detected",
                user: currentUser,
            });
        }

        const updatedUser = await prisma.isp.update({
            where: { isp_id_firebase: uid },
            data: updateData,
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Profile update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

export const deleteIsp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required to delete account",
        });
    }

    try {
        const loginRes = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        const { idToken } = loginRes.data;

        const user = await prisma.isp.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found in database",
            });
        }

        await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FIREBASE_KEY}`,
            { idToken }
        );

        await prisma.isp.delete({
            where: { email },
        });

        return res.status(200).json({
            success: true,
            message: `User with email ${email} deleted successfully`,
        });
    } catch (error) {
        console.error("Delete user error:", error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.response?.data || error.message,
        });
    }
};