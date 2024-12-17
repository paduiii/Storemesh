// Search and Filter
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-bar input");
    const filterSelect = document.getElementById("filterSelect");
    const tableRows = document.querySelectorAll(".fl-table tbody tr");
  
    const filterRows = () => {
      const searchQuery = searchBar.value.toLowerCase();
      const filterValue = filterSelect.value.toLowerCase();
  
      tableRows.forEach((row) => {
        const nameCell = row.cells[0].textContent.toLowerCase();
        const ageCell = row.cells[1].textContent.toLowerCase();
        const cityCell = row.cells[2].textContent.toLowerCase();
        const occupationCell = row.cells[3].textContent.toLowerCase();
  
        const matchesSearch = nameCell.includes(searchQuery) || ageCell.includes(searchQuery) || cityCell.includes(searchQuery) || occupationCell.includes(searchQuery); 
  
        const matchesFilter = filterValue === "all" || cityCell === filterValue;
  
        if (matchesSearch && matchesFilter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };
  
    searchBar.addEventListener("input", filterRows);
    filterSelect.addEventListener("change", filterRows);
  });  

// Hamberger Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Change page Table
document.addEventListener("DOMContentLoaded", () => {
    const rowsPerPage = 10;
    let currentPage = 1;
  
    const tableBody = document.querySelector(".fl-table tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
  
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
  
    const updateTable = () => {
      rows.forEach((row, index) => {
        row.style.display =
          index >= (currentPage - 1) * rowsPerPage &&
          index < currentPage * rowsPerPage
            ? ""
            : "none";
      });
  
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    };
  
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateTable();
      }
    });
  
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateTable();
      }
    });
  
    // Initial update
    updateTable();
  });
  