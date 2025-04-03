// written by: Bjarni Jonsson

const BASE_URL = "https://csci441-teamb.onrender.com";

class RestaurantTable {
    constructor(tableID, tableStatus, orderID) {
        this.tableID = tableID;
        this.tableStatus = tableStatus;
        this.orderID = orderID;
    }

    update(data) {
        this.tableID = data.tableID || this.tableID;
        this.tableStatus = data.tableStatus || this.tableStatus;
        this.orderID = data.orderID || this.orderID;
    }

    getTableStatus() {
        return this.tableStatus;
    }

    updateTableStatus(newStatus) {
        this.tableStatus = newStatus;
    }

    //////////////////////////////
    // API Integration Methods
    //////////////////////////////

    // Fetch a specific table by ID
    static async fetchById(tableID) {
        const response = await fetch(`${BASE_URL}/restaurant_table/${tableID}`);
        if (!response.ok) {
            throw new Error(`Error fetching table: ${response.statusText}`);
        }
        const data = await response.json();
        return new RestaurantTable(data.tableID, data.tableStatus, data.orderID);
    }

    // Fetch all tables
    static async fetchAll() {
        const response = await fetch(`${BASE_URL}/restaurant_table`);
        if (!response.ok) {
            throw new Error(`Error fetching tables: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map(
            (table) => new RestaurantTable(table.tableID, table.tableStatus, table.orderID)
        );
    }

    // Create a new table
    static async create(data) {
        const response = await fetch(`${BASE_URL}/restaurant_table`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error creating table: ${response.statusText}`);
        }
        const createdData = await response.json();
        return new RestaurantTable(createdData.tableID, createdData.tableStatus, createdData.orderID);
    }

    // Update an existing table by ID
    async updateInDatabase() {
        const payload = {
            tableID: this.tableID || null,
            tableStatus: this.tableStatus || null,
            orderID: this.orderID || null,
        };

        console.log("Updating table in database with payload:", payload); // Log the request payload

        const response = await fetch(`${BASE_URL}/restaurant_table/${this.tableID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorResponse = await response.text(); // Log the full error response
            console.error("API Error Response:", errorResponse);
            throw new Error(`Error updating table: ${response.statusText}`);
        }

        const updatedData = await response.json();
        this.update(updatedData);
    }

    // Delete a table by ID
    async delete() {
        const response = await fetch(`${BASE_URL}/restaurant_table/${this.tableID}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error deleting table: ${response.statusText}`);
        }
    }
}

export default RestaurantTable;