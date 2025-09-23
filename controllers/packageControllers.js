import dotenv from 'dotenv';
dotenv.config();
import prisma from "../config/prismaConfig.js";

export const createPackage = async (req, res) => {
    const { name, price, bandwidth } = req.body;

    try {
        if (!price || !bandwidth) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                required: ["price", "bandwidth"],
            });
        }

        const newPackage = await prisma.package.create({
            data: {
                name,
                price,
                bandwidth,
                isp_id: req.session.user.isp_id
            },
        });
        const updatedPackage = await prisma.package.update({
            where: { package_id: newPackage.package_id },
            data: {
                autoName: `package${newPackage.package_id}`
            }
        });

        return res.status(201).json({
            success: true,
            message: "Package created successfully",
            package: updatedPackage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getAllPackages = async (req, res) => {
    try {
        const packages = await prisma.package.findMany({
            where: { isp_id: req.session.user.isp_id }
        });
        return res.status(200).json({
            success: true,
            message: "Packages retrieved successfully",
            packages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export const getPackageById = async (req, res) => {
    const { id } = req.params;

    try {
        const pkg = await prisma.package.findUnique({
            where: { package_id: Number(id) }
        });

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package retrieved successfully",
            package: pkg,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { name, price, bandwidth } = req.body;

    try {
        const existingPackage = await prisma.package.findUnique({
            where: { package_id: parseInt(id) }
        });

        if (!existingPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        const updatedPackage = await prisma.package.update({
            where: { package_id: parseInt(id) },
            data: {
                name: name || existingPackage.name,
                price: price || existingPackage.price,
                bandwidth: bandwidth || existingPackage.bandwidth,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Package updated successfully",
            package: updatedPackage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export const deletePackage = async (req, res) => {
    const { id } = req.params;

    try {
        const existingPackage = await prisma.package.findUnique({
            where: { package_id: parseInt(id) }
        });

        if (!existingPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        await prisma.package.delete({
            where: { package_id: parseInt(id) }
        });

        return res.status(200).json({
            success: true,
            message: "Package deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}