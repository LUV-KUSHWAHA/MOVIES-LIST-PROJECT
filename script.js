// Sort Table Functionality
function sortTable(columnIndex) {
    const table = document.getElementById("movie-table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Determine the sorting order (ascending or descending)
    const isAscending = tbody.getAttribute("data-sort-order") === "asc";
    tbody.setAttribute("data-sort-order", isAscending ? "desc" : "asc");

    // Sort rows based on the column content
    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[columnIndex].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[columnIndex].textContent.trim();

        if (columnIndex === 1) { // For numeric sorting (rating column)
            return isAscending ? cellA - cellB : cellB - cellA;
        } else { // For string sorting (name and remarks columns)
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    // Clear the table and re-add sorted rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

// Add New Movie Functionality
document.getElementById("movie-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name-of-movie").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const remarks = document.getElementById("remarks").value.trim();

    // Validate inputs
    if (!name || !rating || !remarks) {
        alert("All fields are required!");
        return;
    }

    if (isNaN(rating) || rating < 0 || rating > 10) {
        alert("Rating must be a number between 0 and 10!");
        return;
    }

    // Create a new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${rating}</td>
        <td>${remarks}</td>
    `;

    // Add the new row to the table
    document.getElementById("table-body").appendChild(newRow);

    // Clear the form
    document.getElementById("movie-form").reset();
});

// Search Functionality
document.getElementById("search-bar").addEventListener("input", function () {
    const searchQuery = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll("#table-body tr");

    rows.forEach(row => {
        const movieName = row.querySelector("td").textContent.toLowerCase();
        if (movieName.includes(searchQuery)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});