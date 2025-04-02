// Toggle Menu for Mobile
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    if (navLinks.style.display === "block") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "block";
    }
}

// Smooth Scroll Animation
document.querySelectorAll('.scroll-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form Validation and Submission
document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const age = document.getElementById("age").value.trim();
    const address = document.getElementById("address").value.trim();
    const message = document.getElementById("formMessage");

    if (!firstName || !lastName || !age || !address) {
        message.style.color = "red";
        message.innerText = "Please fill in all fields.";
        return;
    }

    if (isNaN(age) || age < 1) {
        message.style.color = "red";
        message.innerText = "Age must be a valid number greater than 0.";
        return;
    }

    const userData = {
        FirstName: firstName,
        LastName: lastName,
        Age: parseInt(age),
        Address: address
    };

    try {
        const response = await fetch("/api/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.innerText = result.message;
        } else {
            message.style.color = "red";
            message.innerText = "Error saving data.";
        }
    } catch (error) {
        console.error("Error:", error);
        message.style.color = "red";
        message.innerText = "Failed to connect to server.";
    }
});

function searchFunction() {
    // Open the modal without displaying any results
    document.getElementById('searchResults').innerText = ''; // Clear previous results
    document.getElementById('searchModal').style.display = 'block'; // Show the modal
}

function closeModal() {
    document.getElementById('searchModal').style.display = 'none'; // Hide the modal
}

function performSearch() {
    const searchQuery = document.getElementById('searchQuery').value;

    if (searchQuery) {
        // Make an API call to search for users
        fetch(`/api/user/search?query=${encodeURIComponent(searchQuery)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display the results in the modal
                if (data.length > 0) {
                    const resultsHtml = data.map(user => 
                        `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}, Age: ${user.age}, Address: ${user.address}`
                    ).join('<br>');
                    document.getElementById('searchResults').innerHTML = resultsHtml; // Display results
                } else {
                    document.getElementById('searchResults').innerText = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                document.getElementById('searchResults').innerText = 'Error fetching results.';
            });
    } else {
        document.getElementById('searchResults').innerText = 'Please enter a search query.';
    }
}

// Simulated database search function (replace with actual logic)
function searchDatabase(query) {
    // Example data (replace with actual database results)
    const exampleData = [
        'Result 1: ' + query,
        'Result 2: ' + query,
        'Result 3: ' + query
    ];
    
    // Simulate returning results based on the query
    return exampleData.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    function editFunction() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#editTable tbody');
                tableBody.innerHTML = ''; // Clear existing rows
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${user.firstName}" disabled></td>
                        <td><input type="text" value="${user.lastName}" disabled></td>
                        <td><input type="number" value="${user.age}" disabled></td>
                        <td><input type="text" value="${user.address}" disabled></td>
                        <td>
                            <button onclick="enableEdit(this)">Edit</button>
                            <button onclick="saveEdit(this, ${user.id})" disabled>Save</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                document.getElementById('editModal').style.display = 'block';
            });
    }

    function enableEdit(button) {
        const row = button.closest('tr');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        row.querySelector('button[onclick^="saveEdit"]').disabled = false;
    }

    function saveEdit(button, userId) {
        const row = button.closest('tr');
        const updatedUser = {
            firstName: row.cells[0].querySelector('input').value,
            lastName: row.cells[1].querySelector('input').value,
            age: row.cells[2].querySelector('input').value,
            address: row.cells[3].querySelector('input').value
        };

        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            row.querySelectorAll('input').forEach(input => input.disabled = true);
            button.disabled = true;
        });
    }

    function closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }
    // Toggle Menu for Mobile
    function toggleMenu() {
        const navLinks = document.getElementById("nav-links");
        if (navLinks.style.display === "block") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "block";
        }
    }

    // Smooth Scroll Animation
    document.querySelectorAll('.scroll-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Validation and Submission
    document.getElementById("userForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const age = document.getElementById("age").value.trim();
        const address = document.getElementById("address").value.trim();
        const message = document.getElementById("formMessage");

        if (!firstName || !lastName || !age || !address) {
            message.style.color = "red";
            message.innerText = "Please fill in all fields.";
            return;
        }

        if (isNaN(age) || age < 1) {
            message.style.color = "red";
            message.innerText = "Age must be a valid number greater than 0.";
            return;
        }

        const userData = {
            FirstName: firstName,
            LastName: lastName,
            Age: parseInt(age),
            Address: address
        };

        try {
            const response = await fetch("/api/user/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerText = result.message;
            } else {
                message.style.color = "red";
                message.innerText = "Error saving data.";
            }
        } catch (error) {
            console.error("Error:", error);
            message.style.color = "red";
            message.innerText = "Failed to connect to server.";
        }
    });

    function searchFunction() {
        // Open the modal without displaying any results
        document.getElementById('searchResults').innerText = ''; // Clear previous results
        document.getElementById('searchModal').style.display = 'block'; // Show the modal
    }

    function closeModal() {
        document.getElementById('searchModal').style.display = 'none'; // Hide the modal
    }

    function performSearch() {
        const searchQuery = document.getElementById('searchQuery').value;

        if (searchQuery) {
            // Make an API call to search for users
            fetch(`/api/user/search?query=${encodeURIComponent(searchQuery)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Display the results in the modal
                    if (data.length > 0) {
                        const resultsHtml = data.map(user => 
                            `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}, Age: ${user.age}, Address: ${user.address}`
                        ).join('<br>');
                        document.getElementById('searchResults').innerHTML = resultsHtml; // Display results
                    } else {
                        document.getElementById('searchResults').innerText = 'No results found.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    document.getElementById('searchResults').innerText = 'Error fetching results.';
                });
        } else {
            document.getElementById('searchResults').innerText = 'Please enter a search query.';
        }
    }

    function editFunction() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#editTable tbody');
                tableBody.innerHTML = ''; // Clear existing rows
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${user.firstName}" disabled></td>
                        <td><input type="text" value="${user.lastName}" disabled></td>
                        <td><input type="number" value="${user.age}" disabled></td>
                        <td><input type="text" value="${user.address}" disabled></td>
                        <td>
                            <button onclick="enableEdit(this)">Edit</button>
                            <button onclick="saveEdit(this, ${user.id})" disabled>Save</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                document.getElementById('editModal').style.display = 'block';
            });
    }

    function enableEdit(button) {
        const row = button.closest('tr');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        row.querySelector('button[onclick^="saveEdit"]').disabled = false;
    }

    function saveEdit(button, userId) {
        const row = button.closest('tr');
        const updatedUser = {
            firstName: row.cells[0].querySelector('input').value,
            lastName: row.cells[1].querySelector('input').value,
            age: row.cells[2].querySelector('input').value,
            address: row.cells[3].querySelector('input').value
        };

        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            row.querySelectorAll('input').forEach(input => input.disabled = true);
            button.disabled = true;
        });
    }

    function closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }
    // Toggle Menu for Mobile
    function toggleMenu() {
        const navLinks = document.getElementById("nav-links");
        if (navLinks.style.display === "block") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "block";
        }
    }

    // Smooth Scroll Animation
    document.querySelectorAll('.scroll-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                        function editFunction() {
                            fetch('/api/user')
                                .then(response => response.json())
                                .then(data => {
                                    const tableBody = document.querySelector('#editTable tbody');
                                    tableBody.innerHTML = ''; // Clear existing rows
                                    data.forEach(user => {
                                        const row = document.createElement('tr');
                                        row.innerHTML = `
                                            <td><input type="text" value="${user.firstName}" disabled></td>
                                            <td><input type="text" value="${user.lastName}" disabled></td>
                                            <td><input type="number" value="${user.age}" disabled></td>
                                            <td><input type="text" value="${user.address}" disabled></td>
                                            <td>
                                                <button onclick="enableEdit(this)">Edit</button>
                                                <button onclick="saveEdit(this, ${user.id})" disabled>Save</button>
                                            </td>
                                        `;
                                        tableBody.appendChild(row);
                                    });
                                    document.getElementById('editModal').style.display = 'block';
                                });
                        }

                        function enableEdit(button) {
                            const row = button.closest('tr');
                            row.querySelectorAll('input').forEach(input => input.disabled = false);
                            row.querySelector('button[onclick^="saveEdit"]').disabled = false;
                        }

                        function saveEdit(button, userId) {
                            const row = button.closest('tr');
                            const updatedUser = {
                                id: userId,
                                firstName: row.cells[0].querySelector('input').value,
                                lastName: row.cells[1].querySelector('input').value,
                                age: row.cells[2].querySelector('input').value,
                                address: row.cells[3].querySelector('input').value
                            };

                            fetch(`/api/user/update/${userId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(updatedUser)
                            })
                            .then(response => response.json())
                            .then(data => {
                                row.querySelectorAll('input').forEach(input => input.disabled = true);
                                button.disabled = true;
                            });
                        }

                        function closeEditModal() {
                            document.getElementById('editModal').style.display = 'none';
                        }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Validation and Submission
    document.getElementById("userForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const age = document.getElementById("age").value.trim();
        const address = document.getElementById("address").value.trim();
        const message = document.getElementById("formMessage");

        if (!firstName || !lastName || !age || !address) {
            message.style.color = "red";
            message.innerText = "Please fill in all fields.";
            return;
        }

        if (isNaN(age) || age < 1) {
            message.style.color = "red";
            message.innerText = "Age must be a valid number greater than 0.";
            return;
        }

        const userData = {
            FirstName: firstName,
            LastName: lastName,
            Age: parseInt(age),
            Address: address
        };

        try {
            const response = await fetch("/api/user/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerText = result.message;
            } else {
                message.style.color = "red";
                message.innerText = "Error saving data.";
            }
        } catch (error) {
            console.error("Error:", error);
            message.style.color = "red";
            message.innerText = "Failed to connect to server.";
        }
    });

    function searchFunction() {
        // Open the modal without displaying any results
        document.getElementById('searchResults').innerText = ''; // Clear previous results
        document.getElementById('searchModal').style.display = 'block'; // Show the modal
    }

    function closeModal() {
        document.getElementById('searchModal').style.display = 'none'; // Hide the modal
    }

    function performSearch() {
        const searchQuery = document.getElementById('searchQuery').value;

        if (searchQuery) {
            // Make an API call to search for users
            fetch(`/api/user/search?query=${encodeURIComponent(searchQuery)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Display the results in the modal
                    if (data.length > 0) {
                        const resultsHtml = data.map(user => 
                            `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}, Age: ${user.age}, Address: ${user.address}`
                        ).join('<br>');
                        document.getElementById('searchResults').innerHTML = resultsHtml; // Display results
                    } else {
                        document.getElementById('searchResults').innerText = 'No results found.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    document.getElementById('searchResults').innerText = 'Error fetching results.';
                });
        } else {
            document.getElementById('searchResults').innerText = 'Please enter a search query.';
        }
    }

    function editFunction() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#editTable tbody');
                tableBody.innerHTML = ''; // Clear existing rows
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${user.firstName}" disabled></td>
                        <td><input type="text" value="${user.lastName}" disabled></td>
                        <td><input type="number" value="${user.age}" disabled></td>
                        <td><input type="text" value="${user.address}" disabled></td>
                        <td>
                            <button onclick="enableEdit(this)">Edit</button>
                            <button onclick="saveEdit(this, ${user.id})" disabled>Save</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                document.getElementById('editModal').style.display = 'block';
            });
    }

    function enableEdit(button) {
        const row = button.closest('tr');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        row.querySelector('button[onclick^="saveEdit"]').disabled = false;
    }

    function saveEdit(button, userId) {
        const row = button.closest('tr');
        const updatedUser = {
            firstName: row.cells[0].querySelector('input').value,
            lastName: row.cells[1].querySelector('input').value,
            age: row.cells[2].querySelector('input').value,
            address: row.cells[3].querySelector('input').value
        };

        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            row.querySelectorAll('input').forEach(input => input.disabled = true);
            button.disabled = true;
        });
    }

    function closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }
}