import UserModel from "../models/user-model.js";
import * as userServices from "../services/user-services.js"
import { validationResult } from "express-validator";


// Validate the incoming data using express validator
export const createUserController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userServices.createUser(req.body);
        const token = await user.generateJWT();

        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = await user.generateJWT();

        res.status(200).json({ user, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}