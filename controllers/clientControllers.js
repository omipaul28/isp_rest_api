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
        if (!manualLocation || !phone) {
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


export const updateClient = async (req, res) => {
    const { customer_id } = req.params;
    const {
        name,
        image,
        gMapLattitude,
        gMapLongitude,
        manualLocation,
        note,
        package_id
    } = req.body;


    try {
        const client = await prisma.client.findUnique({
            where: { customer_id: Number(customer_id) }
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        const updateData = {};
        if (name && name !== undefined) updateData.name = name;
        if (image && image !== undefined) updateData.image = image;
        if (gMapLattitude && gMapLattitude !== undefined) updateData.gMapLattitude = gMapLattitude;
        if (gMapLongitude && gMapLongitude !== undefined) updateData.gMapLongitude = gMapLongitude;
        if (manualLocation && manualLocation !== undefined) updateData.manualLocation = manualLocation;
        if (note && note !== undefined) updateData.note = note;
        if (package_id !== undefined) updateData.package_id = package_id;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update. Valid fields are: name, image, gMapLattitude, gMapLongitude, manualLocation, note, package_id"
            });
        }
        const updatedClient = await prisma.client.update({
            where: { customer_id: Number(customer_id) },
            data: updateData
        });

        return res.status(200).json({
            success: true,
            message: "Client updated successfully",
            client: updatedClient
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getClient = async (req, res) => {
    const { customer_id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { customer_id: Number(customer_id) }
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        return res.status(200).json({
            success: true,
            client
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteClient = async (req, res) => {
    const { customer_id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { customer_id: Number(customer_id) }
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        await prisma.client.delete({
            where: { customer_id: Number(customer_id) }
        });

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const assignPackageToClient = async (req, res) => {
    const { customer_id } = req.params;
    const { package_id } = req.body;

    try {
        const client = await prisma.client.findUnique({
            where: { customer_id: Number(customer_id) }
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        const updatedClient = await prisma.client.update({
            where: { customer_id: Number(customer_id) },
            data: { package_id: package_id }
        });
        const packageDetails = await prisma.package.findUnique({
            where: { package_id: package_id }
        });
        const createBill = await prisma.clientBillTable.create({
            data: {
                customer_id: Number(customer_id),
                isp_id: client.isp_id,
                billMonth: new Date().toLocaleString("default", { month: "long" }),
                billYear: new Date().getFullYear().toString(),
                billAmount: packageDetails ? packageDetails.price : 0,
                dueAmount: packageDetails ? packageDetails.price : 0,
                createdAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "Package assigned to client successfully",
            client: updatedClient,
            bill: createBill
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
