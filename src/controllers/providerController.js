import HealthMetric from "../models/HealthMetric.js";
import UserModel from "../models/UserModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getAllPatients = async (req, res) => {
    try {
        const patients = await UserModel.find({ createdBy: req.user.id }, "name email _id");

        if (!patients.length) {
            return successResponse(res, [], "No patients found", 200);
        }

        const patientsWithMetrics = await Promise.all(
            patients.map(async (patient) => ({
                ...patient.toObject(),
                metrics: await HealthMetric.find({ patient: patient._id }, "bloodPressure bloodSugar weight timestamp")
            })
            )
        );

        successResponse(res, patientsWithMetrics, "Patients fetched successfully");
    } catch (error) {
        errorResponse(res, "Error fetching patients", 500, error);
    }
};

export const getPatientDetails = async (req, res) => {
    try {
        const { id: patientId } = req.params;

        const patient = await UserModel.findById(patientId, "-password");

        if (!patient) {
            return errorResponse(res, "Patient not found", 404);
        }

        const metrics = await HealthMetric.find({ patient: patientId }).sort({ timestamp: -1 });

        successResponse(res, { patient, metrics }, "Patient details fetched successfully");
    } catch (error) {
        errorResponse(res, "Error fetching patient details", 500, error);
    }
};

