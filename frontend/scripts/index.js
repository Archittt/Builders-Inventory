const API_URL = "http://localhost:3000/api"; // Updated API URL

async function fetchProperties() {
    const response = await fetch(`${API_URL}/properties`);
    const properties = await response.json();

    const propertyList = document.getElementById("property-list");
    propertyList.innerHTML = properties
        .map(
            (property) => `
        <div class="property-card">
            <h3>${property.builder} (${property.contact})</h3>
            <p>Sector: ${property.sector}, Pocket: ${property.pocket}</p>
            <p>Site No.: ${property.siteNo}, Size: ${property.size}</p>
            <p>Demand: ${property.demand}</p>
            <p>${property.description}</p>
        </div>
    `
        )
        .join("");
}

fetchProperties();