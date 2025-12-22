async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    document.getElementById("msg").innerText = "Login successful";
    // window.location.href = "admin.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
}
