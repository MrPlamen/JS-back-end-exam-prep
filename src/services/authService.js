import User from "../models/User.js";

const register = async (userData) => {

    const userCount = await User.findOne({email: userData.email});
    if (userCount > 0) {
        throw new Error('User already exists');
    }

    return User.create(userData);
};

const authService = {
    register
};

export default authService;