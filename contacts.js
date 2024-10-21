document.addEventListener('DOMContentLoaded', function() {

    
const apiKey='AIzaSyAkwMkKP5AvvxV0He1AuGEAzEun5-7mb48'// Replace with your API key
const spreadsheetId = '16iN-j3xXCV2gyF0XGjaT6jyDOOFwADfqPNTG2YMec4s'; // Replace with your spreadsheet ID
const sheetName = 'Form responses 1'; // Replace with your sheet name

const sheetUrl= `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`

    fetch(sheetUrl)
        .then(response => response.json())  // Parse response as JSON
        .then(data => {
            const rows = data.values;  // Access the rows via 'data.values'
            const tableBody = document.querySelector("#contacts-table tbody");
            const totalContacts = document.querySelector("#total-contacts");

            // Define column indexes to exclude (e.g., index 0 for Timestamp)
            const columnsToExclude = [0,6];  // Example: Exclude the first column (e.g., Timestamp)

            // Display total number of rows (excluding the header)
            totalContacts.textContent = `Total contacts: ${rows.length - 1}`;

            // Sort the rows based on column index 7 (change as per your need)
            const sortedRows = rows.slice(1).sort((a, b) => {
                const valueA = a[7] || ''; // Access the value at index 7, use empty string if missing
                const valueB = b[7] || '';
                
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
                return 0;
            });

            sortedRows.forEach((row, rowIndex) => {
                // Skip the header row if needed
                if (rowIndex === 0) return;

                const tr = document.createElement("tr");

                row.forEach((cell, cellIndex) => {
                    // Skip columns that should be excluded
                    if (!columnsToExclude.includes(cellIndex)) {
                        const td = document.createElement("td");
                        // Check if the cell has valid data, otherwise fill with 'N/A'
                        td.textContent = cell || 'N/A';  // Default to 'N/A' if cell is empty
                        tr.appendChild(td);
                    }
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading sheet:', error));
});
