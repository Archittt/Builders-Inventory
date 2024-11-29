const API_URL = "http://localhost:3000/api";

document.getElementById("filter-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const queryParams = new URLSearchParams(formData.entries()).toString();

    try {
        const response = await fetch(`${API_URL}/filter-properties?${queryParams}`);
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
    resultsDiv.innerHTML = properties
        .map(
            (property) => `
        <div class="property-card">
            <h3>${property.sector} - ${property.pocket}</h3>
            <p>Site No: ${property.siteNo}</p>
            <p>Size: ${property.size}</p>
            <p>Demand: ${property.demand}</p>
            <p>Description: ${property.description}</p>
            <p>Builder: ${property.builder}</p>
        </div>`
        )
        .join("");
}