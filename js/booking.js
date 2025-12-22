// ================================
// READ DATA FROM URL
// ================================
const params = new URLSearchParams(window.location.search);

const hotelKey = params.get("hotel");
const checkIn = params.get("checkIn");
const checkOut = params.get("checkOut");
const roomType = params.get("roomType");
const rooms = params.get("rooms");

// Map hotel keys to names
const hotelMap = {
  fortune: "Fortune Park Panchwati",
  bhardwaj: "Bhardwaj Palace"
};

// ================================
// AUTO-FILL DATA
// ================================
if (hotelKey && hotelMap[hotelKey]) {
  document.getElementById("hotelName").innerText = hotelMap[hotelKey];
} else {
  document.getElementById("hotelName").innerText = "Selected Hotel";
}

if (checkIn) document.getElementById("checkIn").value = checkIn;
if (checkOut) document.getElementById("checkOut").value = checkOut;
if (roomType) document.getElementById("roomType").value = roomType;
if (rooms) document.getElementById("roomsCount").innerText = rooms;

// ================================
// CONFIRM BOOKING
// ================================
async function bookHotel() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to book a hotel");
    window.location.href = "login.html";
    return;
  }

  const data = {
    hotelName: document.getElementById("hotelName").innerText,
    roomType: document.getElementById("roomType").value,
    checkIn: document.getElementById("checkIn").value,
    checkOut: document.getElementById("checkOut").value,
    guests: document.getElementById("guests").value
  };

  const res = await fetch("https://anshuman-bhardwaj-hotels.onrender.com/api/booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("msg").innerText = result.message;
}
