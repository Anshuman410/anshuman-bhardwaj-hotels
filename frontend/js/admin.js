// ===============================
// ADMIN PANEL JS (JWT BASED)
// ===============================

// Run when page loads
window.onload = function () {
  checkAdminLogin();
  loadUsers();
};

// -------------------------------
// Check admin login (JWT token)
// -------------------------------
function checkAdminLogin() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    alert("Admin login required");
    window.location.href = "admin-login.html";
  }
}

// -------------------------------
// Load all users (Admin only)
// -------------------------------
async function loadUsers() {
  const token = localStorage.getItem("adminToken");

  try {
    const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/admin/users", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const users = await res.json();

    const tbody = document.getElementById("users");
    tbody.innerHTML = "";

    users.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.mobile || "-"}</td>
        <td>${user.emailVerified ? "YES" : "NO"}</td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    alert("Session expired. Please login again.");
    localStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
  }
}

// -------------------------------
// Admin Logout
// -------------------------------
function adminLogout() {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
}
