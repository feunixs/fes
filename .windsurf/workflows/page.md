---
description: Page Flow
---

# Warehouse Management System

## 1. Authentication & Access Control

### 1.1 Login Page
- Username and password input
- Authentication against `users` table
- Role-based access control (based on `privilege` field)
- Redirect to Dashboard upon successful login

### 1.2 User Management (Admin only)
- Create/Edit/Delete users
- Assign privileges
- Manage access rights (using `access` and `form` tables)
- Reset passwords

## 2. Master Data Management

### 2.1 Products Management
- **Products (Barang)**
  - List view with search and filter
  - Create/Edit/Delete products
  - Link to manufacturer, category
  - View stock history

- **Product Categories (Golongan)**
  - List/Create/Edit/Delete categories

- **Manufacturers (Pabrik)**
  - List/Create/Edit/Delete manufacturers

- **Items**
  - Products packaged for sale
  - Create/Edit/Delete items
  - Set pack quantities

- **Bottles (Botol)**
  - Manage bottle inventory
  - Create/Edit/Delete bottle types
  - Track bottle stock

### 2.2 Price Management
- **Price Classes (Kelas Harga)**
  - Create/Edit/Delete price classes

- **Product Pricing**
  - Set prices for products by price class
  - Price history tracking
  - Valid date ranges for prices

- **Bottle Pricing**
  - Set bottle prices
  - Track bottle price history

### 2.3 Customer Management
- List of customers with search and filter
- Create/Edit/Delete customers
- View customer transaction history
- Assign price class to customers

### 2.4 Supplier Management
- List of suppliers with search and filter
- Create/Edit/Delete suppliers
- View supplier transaction history

### 2.5 Employee Management
- List of employees with search and filter
- Create/Edit/Delete employees
- Track employee information

## 3. Inventory Management

### 3.1 Stock Overview
- Current stock levels dashboard
- Stock alerts for low inventory
- Stock history and trends

### 3.2 Stock Adjustments
- Adjust stock quantities manually
- Record stock adjustment reasons
- Track stock adjustment history

### 3.3 Bottle Inventory
- Track bottle inventory
- Manage bottle returns and distributions
- View bottle stock history

## 4. Sales Process

### 4.1 Sales Order (SO) Creation
- Create new sales orders
- Select customer
- Add items with quantities
- Set delivery and payment terms
- Link to bottle returns (Embalasi In)

### 4.2 Sales Order Management
- List all sales orders with status
- Edit/View/Delete sales orders
- Print invoice and delivery order documents
- Track order history

### 4.3 Sales Payment Processing
- Record payments against sales orders
- Multiple payment types support
- View payment history
- Generate payment receipts

### 4.4 Bottle Returns (Embalasi In)
- Record bottle returns from customers
- Link bottle returns to sales orders
- Track bottle return history

## 5. Purchasing Process

### 5.1 Purchase Order (PO) Creation
- Create new purchase orders
- Select supplier
- Add products with quantities
- Set delivery and payment terms
- Link to bottle distribution (Embalasi Out)

### 5.2 Purchase Order Management
- List all purchase orders with status
- Edit/View/Delete purchase orders
- Track order history

### 5.3 Purchase Payment Processing
- Record payments to suppliers
- Multiple payment types support
- View payment history
- Generate payment vouchers

### 5.4 Bottle Distribution (Embalasi Out)
- Record bottle distribution to suppliers
- Link bottle distribution to purchase orders
- Track bottle distribution history

## 6. Reports

### 6.1 Sales Reports
- Daily/Weekly/Monthly/Yearly sales
- Sales by customer
- Sales by product/category
- Outstanding invoices report

### 6.2 Purchase Reports
- Purchase history by date range
- Purchases by supplier
- Purchases by product/category
- Outstanding payments report

### 6.3 Inventory Reports
- Current stock levels
- Stock movement history
- Stock valuation
- Low stock alerts

### 6.4 Bottle Management Reports
- Bottle inventory status
- Bottle movement history
- Bottle return and distribution summary

### 6.5 Financial Reports
- Accounts receivable aging
- Accounts payable aging
- Cash flow reports
- Profit and loss statement

## 7. System Settings

### 7.1 General Settings
- Company information
- System parameters
- Number sequence settings

### 7.2 Access Management
- Form access rights
- User permissions
- Audit logs and history

### 7.3 Data Backup & Restore
- Manual backup function
- Restore from backup
- Scheduled backup settings

## 8. Audit & History

### 8.1 Activity Logs
- User action history
- System-wide audit trails
- View historical changes to records

### 8.2 Document History
- Track changes to key documents
- View modification history
- Compare document versions