async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.innerText = "";

  // Basic validation
  if (!name || !email || !password) {
    msg.innerText = "Name, Email and Password are required";
    return;
  }

  try {
    const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Registration failed";
      return;
    }

    
    localStorage.setItem("verifyEmail", email);

    // Success message (optional)
    alert("OTP sent to your email");

    // Redirect to OTP page
    window.location.href = "verify-otp.html";

  } catch (err) {
    console.error(err);
    msg.innerText = "Server error. Please try again.";
  }
}
