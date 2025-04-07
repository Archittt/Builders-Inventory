document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
  
    if (!isLoggedIn) {
      alert("Unauthorized access! Redirecting to Sign In.");
      window.location.href = "signin.html";
    }
  });
  