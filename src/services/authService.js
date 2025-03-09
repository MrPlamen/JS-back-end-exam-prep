import User from "../models/User.js";

const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password missmatch!');
    }

    const user = await User.findOne({email: userData.email}).select({_id: true}); // Returns only the id in this way
    if (user) {
        throw new Error('User already exists');
    }

    return User.create(userData);
};

const authService = {
    register
};

export default authService;