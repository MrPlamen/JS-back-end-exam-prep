import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { generateToken } from '../utils/authUtils.js';

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid user or email!');
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid user or email!');
    }

    const token = generateToken(user);

    return token;
}

const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password missmatch!');
    }

    const user = await User.findOne({ email: userData.email }).select({ _id: true }); // Returns only the id in this way
    if (user) {
        throw new Error('User already exists');
    }

    const createdUser = await User.create(userData);

    const token = generateToken(createdUser);

    return token;
};

const authService = {
    register,
    login,
};

export default authService;