import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, 
    JWT_SECRET } from "../../config.js"

export const auth = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET); // returns decoded token or error

        req.user = decodedToken;
        req.locals.user = decodedToken;
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        return res.redirect('/auth/login');
    }

    next();   // valid case - continues
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};