import mongoose from "mongoose";

const healthMetricSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodPressure: { type: String, required: true },
    bloodSugar: { type: Number, required: true },
    weight: { type: Number, required: true },
},
{
    timestamps: true,
}
);

const HealthMetric = mongoose.model("HealthMetric", healthMetricSchema);
export default HealthMetric;
