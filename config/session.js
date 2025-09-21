import session from "express-session";

export const sessionMiddle = session({
    secret: process.env.SESSION_SECRET||"bro",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});

