const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

// Load property data into form
async function loadPropertyData() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/property/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error loading property data: ${error.error}`);
      return;
    }

    const property = await response.json();

    document.getElementById("sector").value = property.sector;
    document.getElementById("pocket").value = property.pocket;
    document.getElementById("siteNo").value = property.siteNo;
    document.getElementById("size").value = property.size;
    document.getElementById("demand").value = property.demand;
    document.getElementById("description").value = property.description;
    document.getElementById("builder").value = property.builder;
    document.getElementById("mobileNo").value = property.mobileNo;
  } catch (error) {
    console.error("Error loading property data:", error);
    alert("An unexpected error occurred while loading property data.");
  }
}

// Handle form submission to update property
document
  .getElementById("edit-property-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updates = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/update-property/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        alert("Property updated successfully!");
        window.location.href = "./mainPage.html";
      } else {
        const errorData = await response.json();
        alert(`Failed to update property: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("An unexpected error occurred while updating the property.");
    }
  });

// Load the property data when the page loads
loadPropertyData();