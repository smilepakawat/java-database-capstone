/* header.js */

// Function to render the header based on user role
function renderHeader() {
  const headerDiv = document.getElementById("header");

  // Check if on root page
  if (window.location.pathname.endsWith("/") || window.location.pathname === "/index.html") {
    localStorage.removeItem("userRole");
    headerDiv.innerHTML = `
            <header class="header">
              <div class="logo-section">
                <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
                <span class="logo-title">Hospital CMS</span>
              </div>
            </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Basic Header Structure
  let headerContent = `<header class="header">
          <div class="logo-section">
            <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
            <span class="logo-title">Hospital CMS</span>
          </div>
          <nav>`;

  // Session validation
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // Role-specific content
  if (role === "admin") {
    headerContent += `
            <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
            <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
            <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
            <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") { // Not logged in patient
    headerContent += `
            <button id="patientLogin" class="adminBtn">Login</button>
            <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
            <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
            <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
            <a href="#" onclick="logoutPatient()">Logout</a>`;
  }

  // Close header
  headerContent += `</nav></header>`;

  headerDiv.innerHTML = headerContent;

  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const loginBtn = document.getElementById('patientLogin');
  if (loginBtn) {
    loginBtn.onclick = () => openModal('patientLogin');
  }
  const signupBtn = document.getElementById('patientSignup');
  if (signupBtn) {
    signupBtn.onclick = () => openModal('patientSignup');
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  // Depending on requirements, might want to redirect to index or keep on some public page.
  // The comments said "redirects to the patient dashboard" (presumably the public one or index?).
  // Usually logout goes to home/login. I'll redirect to index.
  window.location.href = "/";
}

// Global scope for HTML access
window.logout = logout;
window.logoutPatient = logoutPatient;
window.renderHeader = renderHeader;

// Auto-run
renderHeader();
