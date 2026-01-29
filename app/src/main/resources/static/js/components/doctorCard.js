/* doctorCard.js */
import { overlay } from '../loggedPatient.js';
import { deleteDoctor } from '../services/doctorServices.js';
import { fetchPatientDetails } from '../services/patientServices.js';

export function createDoctorCard(doctor) {
  // Create the main container for the doctor card
  const card = document.createElement('div');
  card.classList.add('doctor-card');

  // Retrieve the current user role from localStorage
  const userRole = localStorage.getItem('userRole');

  // Create a div to hold doctor information
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('doctor-info');

  // Create and set the doctor’s name
  const nameStr = document.createElement('h3');
  nameStr.textContent = doctor.name;

  // Create and set the doctor's specialization
  const specialStr = document.createElement('p');
  specialStr.textContent = `Specialist: ${doctor.specialty}`;

  // Create and set the doctor's email
  const emailStr = document.createElement('p');
  emailStr.textContent = `Email: ${doctor.email}`;

  // Create and list available appointment times
  const timeStr = document.createElement('p');
  timeStr.textContent = `Available: ${doctor.availableTimes}`;

  // Append all info elements to the doctor info container
  infoDiv.appendChild(nameStr);
  infoDiv.appendChild(specialStr);
  infoDiv.appendChild(emailStr);
  infoDiv.appendChild(timeStr);

  // Create a container for card action buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('doctor-actions');

  // === ADMIN ROLE ACTIONS ===
  if (userRole === 'admin') {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await deleteDoctor(doctor.id, token);
          alert('Doctor deleted successfully');
          card.remove();
        } catch (error) {
          console.error('Error deleting doctor:', error);
          alert('Failed to delete doctor');
        }
      } else {
        alert('Unauthorized action');
      }
    };
    actionsDiv.appendChild(deleteBtn);
  }
  // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
  else if (userRole === 'patient' || !userRole) {
    const bookBtn = document.createElement('button');
    bookBtn.textContent = 'Book Now';
    bookBtn.classList.add('book-btn');
    bookBtn.onclick = () => {
      alert('Please log in as a patient to book an appointment.');
    };
    actionsDiv.appendChild(bookBtn);
  }
  // === LOGGED-IN PATIENT ROLE ACTIONS ===
  else if (userRole === 'loggedPatient') {
    const bookBtn = document.createElement('button');
    bookBtn.textContent = 'Book Now';
    bookBtn.classList.add('book-btn');
    bookBtn.onclick = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }
      try {
        const patient = await fetchPatientDetails(token);
        overlay(doctor, patient);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        alert('Failed to initiate booking. Please try again.');
      }
    };
    actionsDiv.appendChild(bookBtn);
  }

  // Append doctor info and action buttons to the card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
