document.addEventListener('DOMContentLoaded', function() {

    
const apiKey='AIzaSyAkwMkKP5AvvxV0He1AuGEAzEun5-7mb48'// Replace with your API key
const spreadsheetId = '16iN-j3xXCV2gyF0XGjaT6jyDOOFwADfqPNTG2YMec4s'; // Replace with your spreadsheet ID
const sheetName = 'Form responses 1'; // Replace with your sheet name

const sheetUrl= `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`

    fetch(sheetUrl)
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // The Google Sheets JSON data is wrapped in a large object; we need to extract rows.
            const rows = data.table.rows;
            const tableBody = document.querySelector("#contacts-table tbody");

            // Define column indexes to exclude (e.g., index 0 for Timestamp)
            const columnsToExclude = [0];  // Example: Exclude the first column (e.g., Timestamp)

            rows.forEach(row => {
                const tr = document.createElement("tr");
                
                row.c.forEach((cell, cellIndex) => {
                    // Skip columns that should be excluded
                    if (!columnsToExclude.includes(cellIndex)) {
                        const td = document.createElement("td");

                        // Check if the cell has valid data, otherwise fill with empty text
                        td.textContent = cell ? cell.v : 'N/A';  // 'cell.v' holds the actual value

                        tr.appendChild(td);
                    }
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading sheet:', error));
});
