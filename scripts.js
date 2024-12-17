// Search and Filter
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector(".search-bar input");
  const filterSelect = document.getElementById("filterSelect");
  const tableRows = Array.from(document.querySelectorAll(".fl-table tbody tr"));

  // Variable to store filtered rows
  let filteredRows = [...tableRows]; // Initial filtered rows are all rows

  const filterRows = () => {
    const searchQuery = searchBar.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();

    // Filter the rows based on the search query and filter selection
    filteredRows = tableRows.filter((row) => {
      const nameCell = row.cells[0].textContent.toLowerCase();
      const ageCell = row.cells[1].textContent.toLowerCase();
      const cityCell = row.cells[2].textContent.toLowerCase();
      const occupationCell = row.cells[3].textContent.toLowerCase();

      const matchesSearch =
        nameCell.includes(searchQuery) ||
        ageCell.includes(searchQuery) ||
        cityCell.includes(searchQuery) ||
        occupationCell.includes(searchQuery);
      const matchesFilter = filterValue === "all" || cityCell === filterValue;

      return matchesSearch && matchesFilter;
    });

    // Reset to the first page when the filter/search changes
    currentPage = 1;
    updatenavigation();
    updateTable();
  };

  // navigation Logic
  const rowsPerPage = 10;
  let currentPage = 1;

  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  const totalPages = () => Math.ceil(filteredRows.length / rowsPerPage);

  const updateTable = () => {
    // Hide all rows initially
    tableRows.forEach((row) => (row.style.display = "none"));

    // Display only the rows for the current page in the filtered list
    filteredRows.forEach((row, index) => {
      if (
        index >= (currentPage - 1) * rowsPerPage &&
        index < currentPage * rowsPerPage
      ) {
        row.style.display = "";
      }
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages()}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages();
  };

  const updatenavigation = () => {
    // Recalculate total pages based on filtered rows
    updateTable();
  };

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages()) {
      currentPage++;
      updateTable();
    }
  });

  searchBar.addEventListener("input", filterRows);
  filterSelect.addEventListener("change", filterRows);

  // Initial update
  updatenavigation();
});

// Hamburger Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}
