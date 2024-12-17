// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get username and password values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    // Basic front-end validation
    if (username === "" || password === "") {
        errorMessage.textContent = "Please enter both username and password.";
        return;
    }

    // Simulate an API call (Replace this with actual server-side authentication)
    // Example using Fetch API (Assuming you have an endpoint /api/login)
    /*
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful login
            window.location.href = "homepage.html";
        } else {
            // Handle login failure
            errorMessage.textContent = data.message || "Invalid username or password!";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = "An error occurred. Please try again later.";
    });
    */

    // For demonstration purposes, using hard-coded validation (Not secure)
    const validUsername = "user123";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        // Optionally, display a success message within the UI
        // Redirecting to homepage
        window.location.href = "homepage.html";
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});


    if (username === validUsername && password === validPassword) {
        // Optionally, display a success message within the UI
        // Redirecting to homepage
        window.location.href = "homepage.html";
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
