const API_URL = "http://localhost:3000/api";

document
  .getElementById("filter-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const queryParams = new URLSearchParams(formData.entries()).toString();

    try {
      const response = await fetch(
        `${API_URL}/filter-properties?${queryParams}`
      );
      if (response.ok) {
        const properties = await response.json();
        displayFilteredProperties(properties);
      } else {
        alert("Error fetching filtered properties.");
      }
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      alert("Server error. Try again later.");
    }
  });

function displayFilteredProperties(properties) {
  const resultsDiv = document.getElementById("filtered-results");
  resultsDiv.innerHTML = `
        <table class="properties-table">
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Pocket</th>
                    <th>Site No.</th>
                    <th>Size</th>
                    <th>Available Floors</th>
                    <th>Description</th>
                    <th>Builder/Seller</th>
                    <th>Mobile No.</th>
                </tr>
            </thead>
            <tbody>
                ${properties
                  .map(
                    (property) => `
                    <tr>
                        <td>${property.sector}</td>
                        <td>${property.pocket}</td>
                        <td>${property.siteNo}</td>
                        <td>${property.size}</td>
                        <td>${property.demand}</td>
                        <td>${property.description}</td>
                        <td>${property.builder}</td>
                        <td><a href="tel:${property.mobileNo}">${property.mobileNo}</a></td>
                    </tr>`
                  )
                  .join("")}
            </tbody>
        </table>`;
}
