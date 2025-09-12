export interface ExpenseModel {

    id?: number;                  // Optional for new records
    date: Date | string;          // Date of expense
    title: string;                // Short title (e.g., "Office Rent", "Courier Charge")
    description?: string;         // Optional longer description  e.g., "Transport", "Utilities", "Maintenance"
    amount: number;               // Expense amount
    paid: number;
    due: number;
    paymentMethod?: string;       // Optional: "Cash", "Bank Transfer", "bKash", etc.
    addedBy?: string;             // Manager/owner Optional: Track who recorded the expense
}



// 🔍 Example Categories You Might Use:
// Rent
// Utility Bills (Electricity, Internet)
// Transport / Delivery
// Purchase of Tools
// Packaging
// Employee Salary
// Maintenance (Repair Tools, Workshop stuff)
// Marketing
// Miscellaneous


