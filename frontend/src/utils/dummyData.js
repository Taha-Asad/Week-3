export const dummyProducts = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 129.99, stock: 150 },
  { id: 2, name: 'Smartwatch X', category: 'Wearables', price: 199.99, stock: 75 },
  { id: 3, name: 'Ergonomic Office Chair', category: 'Furniture', price: 299.00, stock: 30 },
  { id: 4, name: '4K UHD Monitor', category: 'Electronics', price: 450.00, stock: 90 },
  { id: 5, name: 'Gaming Keyboard', category: 'Peripherals', price: 85.50, stock: 200 },
];

export const dummyOrders = [
  { id: 'ORD001', customer: 'Alice Smith', total: 259.98, status: 'Processing', date: '2023-07-28' },
  { id: 'ORD002', customer: 'Bob Johnson', total: 199.99, status: 'Shipped', date: '2023-07-27' },
  { id: 'ORD003', customer: 'Charlie Brown', total: 50.00, status: 'Delivered', date: '2023-07-26' },
  { id: 'ORD004', customer: 'Diana Prince', total: 384.49, status: 'Pending', date: '2023-07-25' },
];

export const dummyCustomers = [
  { id: 'CUST001', name: 'Alice Smith', email: 'alice@example.com', orders: 5, totalSpent: 750.20 },
  { id: 'CUST002', name: 'Bob Johnson', email: 'bob@example.com', orders: 3, totalSpent: 420.50 },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', orders: 1, totalSpent: 50.00 },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', orders: 2, totalSpent: 600.00 },
];
