const locationField = document.getElementById("location");
const locationDisplay = document.getElementById("locationDisplay");

// Automatically detect location on page load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        const combinedLocation = `${lat}, ${lon}`;
        locationField.value = combinedLocation;
        locationDisplay.innerHTML = `✅ Location detected<br>${combinedLocation}`;
      },
      (error) => {
        locationDisplay.innerHTML = "⚠️ Please enable location access to continue.";
      }
    );
  } else {
    locationDisplay.innerHTML = "❌ Geolocation not supported on this browser.";
  }
};

// Validate and submit the form
document.getElementById("orderForm").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const phonePattern = /^[6-9]\d{9}$/;

  if (name === "" || !phonePattern.test(phone)) {
    e.preventDefault();
    alert("Please enter a valid name and 10-digit Indian phone number.");
    return;
  }

  if (locationField.value === "") {
    e.preventDefault();
    alert("Location not detected. Please enable GPS and reload the page.");
    locationDisplay.innerHTML = "⚠️ Location access is required.";
    return;
  }

  locationDisplay.innerHTML = "📤 Submitting your order...";
});