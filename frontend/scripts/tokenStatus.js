function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function showTokenInfo() {
  const token = localStorage.getItem("token");
  const tokenStatus = document.getElementById("token-status");

  if (!token) {
    tokenStatus.textContent = "No subscription found.";
    return;
  }

  const decoded = decodeToken(token);

  if (decoded && decoded.exp) {
    const expiryDate = new Date(decoded.exp * 1000);
    const now = new Date();

    if (expiryDate > now) {
      tokenStatus.innerHTML = `Valid until <strong>${expiryDate.toLocaleString()}</strong>`;
    } else {
      tokenStatus.innerHTML = "⚠️ <strong>Expired</strong>. Please sign in again.";
    }
  } else {
    tokenStatus.textContent = "Invalid token.";
  }
}

// Call it after DOM is ready
document.addEventListener("DOMContentLoaded", showTokenInfo);
