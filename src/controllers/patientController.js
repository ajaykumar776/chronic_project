import HealthMetric from "../models/HealthMetric.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { mongoose } from 'mongoose';



const getDateRangeForDay = (date) => {
    const startOfDay = new Date(Date.UTC(
        parseInt(date.substring(0, 4)), // Year
        parseInt(date.substring(5, 7)) - 1, // Month (0-based)
        parseInt(date.substring(8, 10)), // Day
        0, 0, 0, 0 // Set time to 00:00:00.000 UTC
    ));

    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCHours(23, 59, 59, 999); 

    return { startOfDay, endOfDay };
};

export const getMetrics = async (req, res) => {
    try {
        let { patientId } = req.query;
        const { date } = req.query;

        if (!patientId && req.user.role === "patient") {
            patientId = req.user.id;
        }

        if (!patientId) {
            return errorResponse(res, "Patient ID is required", 400);
        }

        let query = { patient: patientId };

        if (date) {
            const { startOfDay, endOfDay } = getDateRangeForDay(date);
            query.timestamp = { $gte: startOfDay, $lte: endOfDay };
        }

        const metrics = await HealthMetric.find(query).sort({ timestamp: -1 });

        if (metrics.length === 0) {
            return successResponse(res, [], "No metrics found for the specified filters", 200);
        }

        successResponse(res, metrics, "Metrics fetched successfully");
    } catch (error) {
        errorResponse(res, "Error fetching metrics", 500, error);
    }
};

// 
// Submit health metrics
export const submitMetrics = async (req, res) => {
    try {
        const { bloodPressure, bloodSugar, weight } = req.body;

        if (!bloodPressure || !bloodSugar || !weight) {
            return errorResponse(res, "All fields are required", 400);
        }

        const metric = new HealthMetric({
            patient: req.user.id,
            bloodPressure,
            bloodSugar,
            weight
        });

        await metric.save();

        successResponse(res, metric, "Metrics submitted successfully", 201);
    } catch (error) {
        errorResponse(res, "Error submitting metrics", 500, error);
    }
};

export const deleteMetrics = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params,"params");
        console.log(id,"id");
        if(id && id !== "undefined"){ 
            const result = await HealthMetric.deleteOne({_id: new mongoose.Types.ObjectId(id)});;
            if (result.deletedCount === 0) {
                return errorResponse(res, "No metrics found for this ID to delete", 404);
            }

            successResponse(res, null, "Metrics deleted successfully", 200);
        }else {
            return errorResponse(res, "Metrics ID is required", 400);
        }
       
    } catch (error) {
        errorResponse(res, "Error deleting metrics", 500, error);
    }
};

