// Hotel data (static for now)
const hotels = {
  "fortune": {
    name: "Fortune Park Panchwati",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    desc: "Luxury stay with royal Rajasthani hospitality in the heart of Jodhpur."
  },
  "bhardwaj": {
    name: "Bhardwaj Palace",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    desc: "Super luxury heritage palace offering premium rooms and royal comfort."
  }
};

// Read URL param
const params = new URLSearchParams(window.location.search);
const hotelKey = params.get("hotel");

// Load data
if (hotels[hotelKey]) {
  document.getElementById("hotelName").innerText = hotels[hotelKey].name;
  document.getElementById("hotelImg").src = hotels[hotelKey].img;
  document.getElementById("hotelDesc").innerText = hotels[hotelKey].desc;
} else {
  document.getElementById("hotelName").innerText = "Hotel not found";
}

// Book now redirect
function goToBooking() {
  window.location.href = "booking.html?hotel=" + hotelKey;
}
