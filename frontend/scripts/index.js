const API_URL = "http://localhost:3000/api";

async function fetchProperties() {
  try {
    const response = await fetch(`${API_URL}/properties`);
    const properties = await response.json();

    const propertyList = document
      .getElementById("property-list")
      .querySelector("tbody");
    propertyList.innerHTML = "";

    properties.forEach((property, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${property.sector}</td>
        <td>${property.pocket}</td>
        <td>${property.siteNo}</td>
        <td>${property.size} sq. mtr</td>
        <td>${property.demand}</td>
        <td>${property.description}</td>
        <td>${property.builder}</td>
        <td><a href="tel:${property.mobileNo}">${property.mobileNo}</a></td>
        <!-- Uncomment these if needed -->
        <!--
        <td>
            <button onclick="editProperty('${property._id}')">Edit</button>
            <button onclick="deleteProperty('${property._id}')">Delete</button>
        </td>
        -->
      `;

      propertyList.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

function editProperty(id) {
  window.location.href = `/api/edit-property.html?id=${id}`;
}

async function deleteProperty(id) {
  if (confirm("Are you sure you want to delete this property?")) {
    try {
      const response = await fetch(`/api/delete-property/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Property deleted successfully!");
        fetchProperties();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete property: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  }
}

// Fetch properties on page load
fetchProperties();