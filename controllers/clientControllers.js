import dotenv from 'dotenv';
dotenv.config();
import prisma from "../config/prismaConfig.js";


export const createClient = async (req, res) => {
    const {
        name,
        image,
        gMapLattitude,
        gMapLongitude,
        manualLocation,
        phone,
        note,
        package_id
    } = req.body;
    try {
        if (!manualLocation || !phone ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                required: ["phone", "manualLocation"],
            });
        }
        const phoneNumberExists = await prisma.client.findFirst({
            where: { phone, isp_id: req.session.user.isp_id },
        });
        if (phoneNumberExists) {
            return res.status(409).json({
                success: false,
                message: "Phone number already exists",
            });
        }
        const newClient = await prisma.client.create({
            data: {
                name,
                image,
                gMapLattitude,
                gMapLongitude,
                manualLocation,
                phone,
                note,
                package_id,
                isp_id: req.session.user.isp_id
            },
        });
        const updatedClient = await prisma.client.update({
            where: { customer_id: newClient.customer_id },
            data: {
                autoName: `user${newClient.customer_id}`
            }
        });
        return res.status(201).json({
            success: true,
            message: "Client created successfully",
            client: updatedClient,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


