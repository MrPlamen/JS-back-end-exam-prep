import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, 
    JWT_SECRET } from "../config.js"

export const auth = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET); // returns decoded token or error

        next();   // valid case - continues

    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
};