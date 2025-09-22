import session from "express-session";

export const sessionMiddle = session({
    secret: process.env.SESSION_SECRET||"bro",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        //sameSite: '',
        maxAge: 30 * 1000 * 60 * 60 * 24 * 7
    }
});

