import express from "express";
import { getAllPatients, getPatientDetails } from "../controllers/providerController.js";
import { authenticate, checkProvider } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/patients", [authenticate,checkProvider], getAllPatients);
router.get("/patients/:id", authenticate, getPatientDetails);

export default router;
