// MongoDB initialization script
db = db.getSiblingDB('mydatabase');

// Create prescriptions collection and insert sample data
db.prescriptions.insertMany([
    {
        "patient_name": "John Doe",
        "doctor_name": "Alice Brown",
        "appointment_id": "appointment-1",
        "medications": "Amoxicillin",
        "dosage": "500mg twice daily",
        "doctor_notes": "Take with food. Complete the full course.",
        "created_at": new Date(),
        "updated_at": new Date()
    },
    {
        "patient_name": "Jane Smith",
        "doctor_name": "David Wilson",
        "appointment_id": "appointment-2",
        "medications": "Ibuprofen",
        "dosage": "200mg every 6 hours as needed",
        "doctor_notes": "For pain relief. Do not exceed 1200mg in 24 hours.",
        "created_at": new Date(),
        "updated_at": new Date()
    },
    {
        "patient_name": "Robert Johnson",
        "doctor_name": "Emily Davis",
        "appointment_id": "appointment-3",
        "medications": "Lisinopril",
        "dosage": "10mg once daily",
        "doctor_notes": "Monitor blood pressure regularly.",
        "created_at": new Date(),
        "updated_at": new Date()
    }
]);

print('MongoDB initialization script completed successfully.');
