
// Check if a token exists when the signin page is loaded
window.onload = function () {
  const token = localStorage.getItem("token");

  // If token exists, redirect to main page
  if (token) {
    window.location.href = "mainPage.html";
  }
};

// Handle form submission (login)
document.getElementById("signin-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Token received:", data.token);  // Log the token
      localStorage.setItem("token", data.token);   // Save token to localStorage
      window.location.href = "./mainPage.html";    // Redirect to the main page
    } else {
      alert(data.error || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }
});