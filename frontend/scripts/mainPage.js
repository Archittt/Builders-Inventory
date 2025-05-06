const API_URL = "http://localhost:3000/api";

const PROPERTIES_PER_PAGE = 10;
let currentPage = 1;
let allProperties = [];

async function fetchProperties() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized access. Redirecting to Sign In.");
    window.location.href = "signin.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/properties`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    allProperties = await response.json();
    renderPage(currentPage);
    renderPagination();
  } catch (error) {
    console.error("Error fetching properties:", error);
    alert("Session expired or invalid token. Please sign in again.");
    localStorage.removeItem("token");
    window.location.href = "signin.html";
  }
}

function renderPage(page) {
  const propertyList = document.getElementById("property-list").querySelector("tbody");
  propertyList.innerHTML = "";

  const start = (page - 1) * PROPERTIES_PER_PAGE;
  const end = start + PROPERTIES_PER_PAGE;
  const paginatedProperties = allProperties.slice(start, end);

  paginatedProperties.forEach((property, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${property.sector}</td>
      <td>${property.pocket}</td>
      <td>${property.siteNo}</td>
      <td>${property.size} sq. mtr</td>
      <td>${property.demand}</td>
      <td>${property.description}</td>
      <td>${property.builder}</td>
      <td><a href="tel:${property.mobileNo}">${property.mobileNo}</a></td>
      <!-- Edit And Delete Button -->
      <td>
        <button class="edit-btn" onclick="editProperty('${property._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteProperty('${property._id}')">Delete</button>
      </td>
    `;
    propertyList.appendChild(row);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(allProperties.length / PROPERTIES_PER_PAGE);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
      renderPagination();
    });
    paginationContainer.appendChild(btn);
  }
}

// Edit and Delete Function
function editProperty(id) {
  window.location.href = `edit-property.html?id=${id}`;
}

async function deleteProperty(id) {
  const confirmDelete = confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/delete-property/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Property deleted successfully.");
      fetchProperties(); // Reload properties
    } else {
      const error = await response.json();
      alert(`Error deleting property: ${error.error}`);
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("An error occurred while deleting the property.");
  }
}

// Initial load
fetchProperties();