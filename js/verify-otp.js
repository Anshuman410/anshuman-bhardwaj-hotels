async function verifyOtp() {
  const email = localStorage.getItem("verifyEmail");
  const otp = document.getElementById("otp").value.trim();

  if (!email) {
    alert("Email missing. Please register again.");
    window.location.href = "register.html";
    return;
  }

  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Email verified successfully");
    localStorage.removeItem("verifyEmail");
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
}
