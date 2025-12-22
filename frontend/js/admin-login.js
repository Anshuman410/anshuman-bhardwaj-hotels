async function adminLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("msg").innerText = "All fields required";
    return;
  }

  try {
    const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/auth/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // JWT token save
      localStorage.setItem("adminToken", data.token);

      document.getElementById("msg").innerText = "Login successful";

      // Redirect to admin panel
      window.location.href = "admin.html";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "Server error";
  }
}
