import session from "express-session";

export const sessionMiddle = session({
    secret: process.env.SESSION_SECRET||"bro",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 1000 * 60 * 60 * 24 * 7
    }
});

