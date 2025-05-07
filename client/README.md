# 🛍️ Stylique E-Commerce Client (Frontend)

This is the **React-based frontend** for the E-Commerce platform. It supports both **user-facing features** (like product browsing and ordering) and **admin functionalities** (like managing users, orders, and products).

## 📁 Project Structure

```txt
📦src
┣ 📂assets                  # Static images and SVGs used throughout the UI
┣ 📂components              # Reusable UI components organized by feature
┃ ┣ 📂Admin                 # Admin-only components (dashboard, management panels)
┃ ┣ 📂Cart                  # Cart view, checkout form, and payment integration
┃ ┣ 📂Common                # Shared UI components (Header, Footer, Navbar, etc.)
┃ ┣ 📂Layout                # Page layout components and wrappers
┃ ┗ 📂Products              # Product listings, filters, and detail views
┣ 📂pages                   # Page-level components mapped to routes
┣ 📂redux                   # Redux slices for global state management
┃ ┗ 📂slices                # Logic for handling auth, products, cart, orders, etc.
┣ 📜App.jsx                 # Root component with route definitions
┣ 📜main.jsx                # Entry point rendering the App
┗ 📜index.css               # Global styles

```

## 🛠️ Tech Stack

- **React.js**
- **Redux Toolkit**
- **React Router**
- **Tailwind CSS**
- **PayPal JS SDK**
- **React Icons**

## 📌 Features

### 🔓 User Features

- Register and Login (with role-based access)
- Browse products and filter by gender or collection
- View detailed product pages
- Add to cart and checkout via PayPal
- View past orders and order details
- Update user profile

### 🛠️ Admin Features

- Add, edit, and delete products
- Manage all users and their roles
- View and manage customer orders

## 📦 Available Scripts

In the `client` directory, you can run:

```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
```

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-platform.git
   cd ecommerce-platform/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

## 🧩 Folder Highlights

- `components/Admin/`: All admin-related UIs (UserManagement, ProductManagement, etc.)
- `components/Cart/`: Checkout flow, cart state, PayPal button
- `components/Common/`: Layout elements used across the app (Navbar, Footer, etc.)
- `components/Layout/`: Layout wrappers including `AdminLayout` and `UserLayout`
- `components/Products/`: Product display logic including grid, filters, and sorting
- `redux/slices/`: Modular Redux slices for auth, cart, orders, products, etc.

## 📄 License

This project is open-source and available under the [Apache License](LICENSE).

## 👨‍💻 Author

Developed by **Md. Maruf Sarker**
📫 [Connect on LinkedIn](https://linkedin.com/in/mdmarufsarker)
