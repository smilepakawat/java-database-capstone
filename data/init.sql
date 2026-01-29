-- Initialize MySQL database with sample data aligned to schema-design.md
USE mydatabase;

create table if not exists mydatabase.patients (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);

create table if not exists mydatabase.doctors (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    available_times JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);

create table if not exists mydatabase.appointments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    doctor_id VARCHAR(36) NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

create table if not exists mydatabase.admin (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);

-- Insert sample data into patients table
insert into mydatabase.patients (id, username, password, first_name, last_name, email, phone) values
(UUID(), 'john_doe', 'password', 'John', 'Doe', 'john.doe@example.com', '1234567890'),
(UUID(), 'jane_smith', 'password', 'Jane', 'Smith', 'jane.smith@example.com', '9876543210'),
(UUID(), 'robert_j', 'password', 'Robert', 'Johnson', 'robert.j@example.com', '5551234567');

-- Insert sample data into doctors table
insert into mydatabase.doctors (id, username, password, first_name, last_name, email, phone, available_times) values
(UUID(), 'alice_brown', 'password', 'Alice', 'Brown', 'alice.brown@example.com', '1112223333', '["09:00-10:00","10:00-11:00","14:00-15:00"]'),
(UUID(), 'david_wilson', 'password', 'David', 'Wilson', 'david.wilson@example.com', '4445556666', '["09:00-10:00","10:00-11:00","14:00-15:00"]'),
(UUID(), 'emily_davis', 'password', 'Emily', 'Davis', 'emily.davis@example.com', '7778889999', '["09:00-10:00","10:00-11:00","14:00-15:00"]');

-- Insert sample data into admin table
insert into mydatabase.admin (id, username, password) values
(UUID(), 'admin1', 'password'),
(UUID(), 'admin2', 'password');

-- Insert sample data into appointments table
insert into mydatabase.appointments (id, patient_id, doctor_id, appointment_date, status, notes) values
(UUID(), (SELECT id FROM patients WHERE username = 'john_doe'), (SELECT id FROM doctors WHERE username = 'alice_brown'), '2023-10-15 10:00:00', 'Scheduled', 'Routine checkup'),
(UUID(), (SELECT id FROM patients WHERE username = 'jane_smith'), (SELECT id FROM doctors WHERE username = 'david_wilson'), '2023-10-16 14:00:00', 'Scheduled', 'Follow-up visit'),
(UUID(), (SELECT id FROM patients WHERE username = 'robert_j'), (SELECT id FROM doctors WHERE username = 'emily_davis'), '2023-10-17 09:00:00', 'Scheduled', 'Annual physical');
