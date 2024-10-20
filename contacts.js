document.addEventListener('DOMContentLoaded', function() {

    
const apiKey='AIzaSyAkwMkKP5AvvxV0He1AuGEAzEun5-7mb48'// Replace with your API key
const spreadsheetId = '16iN-j3xXCV2gyF0XGjaT6jyDOOFwADfqPNTG2YMec4s'; // Replace with your spreadsheet ID
const sheetName = 'Form responses 1'; // Replace with your sheet name

const sheetUrl= `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`

    fetch(sheetUrl)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split("\n").map(row => row.split(","));
            const tableBody = document.querySelector("#contacts-table tbody");

            // Define column indexes to exclude (e.g., index 0 for Timestamp)
            const columnsToExclude = [0]; // This array holds the index of columns you want to hide. 0 means the first column (Timestamp).

            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const tr = document.createElement("tr");
                
                // Filter out unwanted columns
                row.forEach((cell, cellIndex) => {
                    if (!columnsToExclude.includes(cellIndex)) {
                        const td = document.createElement("td");
                        td.textContent = cell;
                        tr.appendChild(td);
                    }
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading sheet:', error));
});
