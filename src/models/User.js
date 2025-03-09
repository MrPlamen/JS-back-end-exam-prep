import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

// TODO: Modify user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10); // 10 rounds of salt
});

const User = model('User', userSchema);

export default User;