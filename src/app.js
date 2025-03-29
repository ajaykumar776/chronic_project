import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import seedProviders from "./seeders/seedProviders.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Database Connection & Server Start
const startServer = async () => {
    try {

        connectDB(); 
        seedProviders();
        // Routes
        app.use("/api/auth", authRoutes);
        app.use("/api/patients", patientRoutes);
        app.use("/api/providers", providerRoutes);

        const PORT = process.env.PORT || 5015;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (err) {
        console.error("Database connection failed", err);
    }
};

startServer();
