import express from "express";
import { patientRegister, login } from "../controllers/authController.js";
import { authenticate, checkProvider } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();
authRoutes.post("/register", [authenticate,checkProvider],patientRegister);
authRoutes.post("/login", login);

export default authRoutes;
