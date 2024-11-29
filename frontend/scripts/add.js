const API_URL = "http://localhost:3000/api";

document.getElementById("add-property-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const propertyData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_URL}/add-property`, { // Use the correct base URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(propertyData)
        });

        if (response.ok) {
            alert("Property added successfully!");
            window.location.href = '/'; // Redirect to the homepage or property list page
        } else {
            const errorData = await response.json();
            alert(`Failed to add property: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error adding property:", error);
        alert("Server error. Try again later.");
    }
});
