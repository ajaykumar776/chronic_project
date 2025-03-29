import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginValidation, registerValidation } from "../validations/authValidation.js";
import UserModel from "../models/UserModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const patientRegister = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);
    const { name, email } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return errorResponse(res, 'User already exists', 400);

        const user = await UserModel.create({
            name,
            email,
            password:'123456', // Default password
            createdBy: req.user.id,
            role: 'patient',
        });

        successResponse(res, { userId: user._id }, 'Patient registered successfully', 201);
    } catch (err) {
        errorResponse(res, 'Server Error', 500, err);
    }
};


export const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return errorResponse(res, "Invalid credentials", 400);

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        successResponse(res, { token }, "Login successful");
    } catch (err) {
        errorResponse(res, "Server Error", 500, err);
    }
};
