package com.project.back_end.models;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "prescriptions")
public class Prescription {
    @Id
    private String id;

    @NotNull
    private String patientName;

    @NotNull
    private String doctorName;

    @NotNull
    private String appointmentId;

    @NotNull
    private String medication;

    @NotNull
    private String dosage;

    @Size(max = 200)
    private String doctorNotes;

    private Date createdAt;

    private Date updatedAt;
}
