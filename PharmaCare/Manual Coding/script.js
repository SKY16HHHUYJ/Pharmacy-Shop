function searchFunction() {
    // Get the values from the form fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    // Example search logic (this can be customized as needed)
    let searchMessage = 'No results found.';
    if (firstName || lastName || age || address) {
        searchMessage = `Searching for user: ${firstName} ${lastName}, Age: ${age}, Address: ${address}`;
    }

    // Display the search results in the modal
    document.getElementById('searchResults').innerText = searchMessage;
    document.getElementById('searchModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('searchModal').style.display = 'none';
}