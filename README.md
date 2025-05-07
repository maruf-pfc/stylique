# Stylique 🛍️

Stylique is a full-stack e-commerce web application designed to deliver a seamless online shopping experience. Built with modern web technologies, it includes both a robust RESTful API backend and a dynamic, responsive frontend.

## 📁 Project Structure

```tree
stylique/
├── client/    # Frontend (React, Tailwind CSS, JavaScript)
├── server/    # Backend (Node.js, Express, MongoDB)
└── README.md  # Root readme

```

## 🌐 Live Demo

Check out the live demo of Stylique at [stylique.vercel.app](https://stylique.vercel.app).

## 📦 Tech Stack

**Frontend (client):**

- React
- Javascript
- Tailwind CSS
- Axios
- Sooner
- Redux Toolkit

**Backend (server):**

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image upload)
- Swagger (API Docs)

## 🚀 Getting Started

Follow the steps below to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/maruf-pfc/stylique.git
cd stylique
```

## 🖥️ Frontend Setup (Client)

```bash
cd client
pnpm install
pnpm dev
```

The client will start at: `http://localhost:3000`

> Ensure you configure the environment variables (e.g. API base URL) in `.env.local` inside the `client` directory.

## 🧪 Backend Setup (Server)

```bash
cd server
pnpm install
pnpm dev
```

The server will run at: `http://localhost:5000`

> Make sure to create a `.env` file in the `server` directory. You can find a sample in the [server README](./server/README.md).

You can also access the API documentation at:
`http://localhost:5000/api-docs`

## 🔐 Authentication

The API uses JWT for authentication. Tokens must be included in the `Authorization` header:

```http
Authorization: Bearer <token>
```

## 📄 Additional Documentation

- [Server README](./server/README.md) — API setup, endpoints, and server details.
- [Client README](./client/README.md) — Frontend setup, components, and styling details.

## 📬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📃 License

This project is licensed under the [Apache License](./LICENSE).

## 🙌 Acknowledgments

This project is developed and maintained by [Md. Maruf Sarker](https://github.com/maruf-pfc).
