import { fetchRestaurantTable } from '../models/api.js';

export async function fetchTableById(tableId) {
    try {
        const table = await fetchRestaurantTable(tableId);
        return table;
    } catch (error) {
        console.error(`Error fetching table with ID ${tableId}:`, error);
        throw error;
    }
}

// Add event listener for fetching table by ID
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const tableIdInput = document.getElementById('tableIdInput');
    const tableDisplay = document.getElementById('tableDisplay');

    fetchButton.addEventListener('click', async () => {
        const tableId = tableIdInput.value;
        try {
            const table = await fetchTableById(tableId);
            tableDisplay.textContent = Table ID: ${table.tableID}, Status: ${table.tableStatus}, Order ID: ${table.orderID};
        } catch (error) {
            tableDisplay.textContent = 'Error fetching table. Please try again.';
        }
    });
});


