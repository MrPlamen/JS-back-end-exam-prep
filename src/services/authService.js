import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { JWT_SECRET } from '../../config.js';

const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password missmatch!');
    }

    const user = await User.findOne({ email: userData.email }).select({ _id: true }); // Returns only the id in this way
    if (user) {
        throw new Error('User already exists');
    }

    return User.create(userData);
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid user or email!');
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid user or email!');
    }

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    }
    const token = jwt.sign(payload, JWT_SECRET)

    return token;
}

const authService = {
    register,
    login,
};

export default authService;