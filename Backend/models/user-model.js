import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [50, 'Email must not be longer than 50 characters']
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

// defining a hashPassword method to userSchema
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// defining an isValidPassword method to compare the passwords
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generating JWT Token 
userSchema.methods.generateJWT = function () {
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);

export default User;