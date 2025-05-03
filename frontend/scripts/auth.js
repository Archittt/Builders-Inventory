document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // If no token exists, redirect to the sign-in page
  if (!token) {
    alert("Unauthorized access. Redirecting to Sign In.");
    window.location.href = "signin.html";
    return; // Stop further execution
  }

  try {
    // Verify the token by making a request to a protected API
    const response = await fetch("http://localhost:3000/api/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle invalid token (401 or 403 status)
    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid token");
    }

    // Handle valid response
    if (response.ok) {
      const data = await response.json();
      console.log("Data retrieved successfully:", data); // Optionally use the data
    }
  } catch (err) {
    // Handle token-related errors or network issues
    console.error("Error:", err);
    alert("Session expired or invalid. Please sign in again.");

    // Remove invalid token and redirect to sign-in page
    localStorage.removeItem("token");
    window.location.href = "signin.html";
  }
});