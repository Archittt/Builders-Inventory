document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch user's IP address
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    const userIP = data.ip;

    console.log("User IP:", userIP);

    // List of allowed IPs (Replace with actual whitelisted IPs)
    const allowedIPs = ["36.255.133.83", "2405:201:4016:202b:55aa:3004:5d:e6ea"];

    if (!allowedIPs.includes(userIP)) {
      alert("Access Denied: Your IP is not whitelisted.");
      document.getElementById("signin-form").innerHTML =
        "<p style='color:red;'>You are not allowed to sign in from this IP.</p>";
    }
  } catch (error) {
    console.error("Error fetching IP:", error);
  }
});

document.getElementById("signin-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const errorMessage = document.querySelector("#signin-form p");
  if (errorMessage) return; // Prevent login attempt if IP is blocked

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    try {
      const response = await fetch("http://localhost:3000/api/start-server", { method: "POST" });

      if (response.ok) {
        // Store login session
        sessionStorage.setItem("loggedIn", "true");

        window.location.href = "./mainPage.html";
      } else {
        alert("Failed to start the server. Please try again.");
      }
    } catch (error) {
      console.error("Error starting the server:", error);
      alert("An error occurred while trying to start the server.");
    }
  } else {
    alert("Invalid username or password. Please try again.");
  }
});