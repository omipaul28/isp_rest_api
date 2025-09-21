import dotenv from 'dotenv';
dotenv.config();

export const profile = (req, res) => {
    res.json({ message: "This is a protected profile route", user: req.session.user });
}