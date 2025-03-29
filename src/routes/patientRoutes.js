import express from "express";
import { getMetrics, submitMetrics } from "../controllers/patientController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteMetrics } from "../controllers/patientController.js";

const router = express.Router();

router.get("/metrics", authenticate, getMetrics);
router.post("/metrics", authenticate, submitMetrics);
router.delete("/metrics/:id", authenticate, deleteMetrics);

export default router;
