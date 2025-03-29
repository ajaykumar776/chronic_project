import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const authenticate = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return errorResponse(res, "Unauthorized", 401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        errorResponse(res, "Invalid Token", 401, err);
    }
};


export const checkProvider = (req, res, next) => {
    if (req.user.role !== "provider") {
        return errorResponse(res, "Access Denied: Forbidden", 403);
    }
    next();
};
export const checkPatient = (req, res, next) => {
    if (req.user.role !== "patient") {
        return errorResponse(res, "Access Denied: Forbidden", 403);
    }
    next();
};

