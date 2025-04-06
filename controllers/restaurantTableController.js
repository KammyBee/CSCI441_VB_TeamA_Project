// written by: Bjarni Jonsson

import { fetchRestaurantTable, fetchRestaurantTables } from '../models/api.js';

export class RestaurantTableController {
    constructor(view, model, tables) {
        this.view = view;
        this.model = model;
        this.tables = tables;
        this.init();
    }

    async init(tableId) {
        try {
            const table = await fetchRestaurantTable(tableId);
            this.view.displayTable(table);
        } catch (error) {
            console.log(`Not able to fetch restaurant table with ID ${tableId}: `, error);
        }
    }
}
