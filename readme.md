# Chronic Disease Management API

## Description

The **Chronic Disease Management API** provides endpoints for managing patients' health data, allowing providers to track metrics like blood pressure, blood sugar, and weight. This API is built to facilitate seamless communication between patients and healthcare providers.

## Table of Contents

1. [API Authentication](#api-authentication)
2. [Patient Endpoints](#patient-endpoints)
   - [Get Health Metrics](#get-health-metrics)
   - [Create Health Metrics](#create-health-metrics)
   - [Delete Health Metric](#delete-health-metric)
3. [Provider Endpoints](#provider-endpoints)
   - [Get All Patients](#get-all-patients)
   - [Get Patient Details](#get-patient-details)
4. [Postman Collection Usage](#usage-with-postman)

## API Authentication

### Register a User

- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
    ```json
    {
        "name": "new 1",
        "email": "new1@example.com",
        "password": "123456"
    }
    ```
- **Response**: Registered user details.

### Login a User

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
    ```json
    {
        "email": "provider1@example.com",
        "password": "123456"
    }
    ```
- **Response**: JWT Token for authentication.

---

## Patient Endpoints

### Get Health Metrics

- **Endpoint**: `GET /api/patients/metrics`
- **Query Parameters**:
    - `patientId` (Required): Patient's ID.
    - `date` (Optional): Date in `YYYY-MM-DD` format to filter metrics.
  
- **Headers**:
    - `Authorization`: `Bearer {{token}}`

- **Response**: Health metrics for the specified patient.

### Create Health Metrics

- **Endpoint**: `POST /api/patients/metrics`
- **Request Body**:
    ```json
    {
        "bloodPressure": "110/80",
        "bloodSugar": 85,
        "weight": 60
    }
    ```

- **Headers**:
    - `Authorization`: `Bearer {{token}}`

- **Response**: Newly created health metrics for the patient.

### Delete Health Metric

- **Endpoint**: `DELETE /api/patients/metrics/:id`
- **Params**:
    - `id`: Metric ID to delete.
  
- **Headers**:
    - `Authorization`: `Bearer {{token}}`

- **Response**: Success message for deleted metric.

---

## Provider Endpoints

### Get All Patients

- **Endpoint**: `GET /api/providers/patients`
- **Headers**:
    - `Authorization`: `Bearer {{token}}`

- **Response**: All patients managed by the logged-in provider, with associated health metrics.

### Get Patient Details

- **Endpoint**: `GET /api/providers/patients/:id`
- **Params**:
    - `id`: Patient ID to get details for.
  
- **Headers**:
    - `Authorization`: `Bearer {{token}}`

- **Response**: Detailed information about the specified patient.

---

## Usage with Postman

### 1. Import Postman Collection

You can import the **Chronic Disease Management API** collection into Postman for easy testing.

- **Download or Import the Collection**: [Postman Collection](https://galactic-flare-458838.postman.co/workspace/Floatr_~8d6aa2f0-b115-4be1-acf2-63939f44bca2/collection/17939827-7a587472-f401-4396-8182-68d0d7751fb4?action=share&source=collection_link&creator=17939827)

### 2. Set Up Environment Variables in Postman

In Postman, set the following environment variables:

- `{{base_url}}`: The base URL of your API (e.g., `http://localhost:5000`).
- `{{token}}`: Store the JWT token after logging in (from the **Login User** request).

### 3. Make Requests Using Postman

- **Login**: Use the **Login User** endpoint to obtain the JWT token.
- **Access Patient Data**: Use the **Get Health Metrics**, **Create Health Metrics**, and **Delete Health Metric** endpoints to interact with a patient’s health data.
- **Provider Operations**: Use the **Get All Patients** and **Get Patient Details** endpoints to interact with the provider’s data.

---

## Postman Collection Export

You can [download the Postman collection here](https://galactic-flare-458838.postman.co/workspace/Floatr_~8d6aa2f0-b115-4be1-acf2-63939f44bca2/collection/17939827-7a587472-f401-4396-8182-68d0d7751fb4?action=share&source=collection_link&creator=17939827).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# chronic_project
# chronic_project

# Environment Variables

The following environment variables are used in the application:

- `PORT`: The port number to run the server on. Default is `5015`.
- `MONGO_URI`: The MongoDB connection string. Default is `mongodb+srv://username:pass@cluster0.vcy4ut3.mongodb.net/chronic?retryWrites=true&w=majority&appName=Cluster0`.
- `JWT_SECRET`: The secret key for generating JWT tokens. Default is `chronic_disease_management`.
- `JWT_EXPIRES`: The time duration in seconds for which the JWT token is valid. Default is `7d`.
- `JWT_REFRESH_EXPIRES`: The time duration in seconds for which the JWT refresh token is valid. Default is `30d`.

