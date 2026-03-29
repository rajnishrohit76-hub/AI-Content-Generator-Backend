# 🚀 AI SaaS Platform — Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A production-ready **RESTful API** powering the AI SaaS content generation platform. Built with Express.js and MongoDB, it handles authentication, AI content generation via Google Gemini, and subscription payments via Razorpay.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Architecture](#-architecture)
- [Scripts](#-scripts)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with bcrypt password hashing
- 🤖 **AI Content Generation** — Powered by Google Gemini (`@google/generative-ai`)
- 💳 **Payment Integration** — Razorpay order creation & payment verification
- 📧 **Contact Form** — Stores user inquiries to MongoDB
- 🛡️ **Protected Routes** — Middleware-based auth guard for private endpoints
- 📦 **Modular Architecture** — Clean separation via controllers, services, routes & schemas
- 🌐 **CORS Enabled** — Ready for cross-origin frontend consumption

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Runtime     | Node.js                             |
| Framework   | Express.js v5                       |
| Database    | MongoDB + Mongoose v9               |
| AI Engine   | Google Generative AI (Gemini)       |
| Payments    | Razorpay                            |
| Auth        | JWT (`jsonwebtoken`) + bcryptjs     |
| Dev Tools   | Nodemon, dotenv                     |

---

## 📁 Project Structure

```
Backend/
├── config/
│   └── razorpay.js           # Razorpay instance configuration
├── controllers/
│   ├── aiController.js       # AI generation & history handlers
│   ├── authController.js     # Register, login, getMe handlers
│   ├── contactController.js  # Contact form submission handler
│   └── paymentController.js  # Create order & verify payment handlers
├── middleware/
│   └── authMiddleware.js     # JWT protect middleware
├── routes/
│   ├── aiRoutes.js           # /api/ai routes
│   ├── authRoutes.js         # /api/auth routes
│   ├── contactRoute.js       # /api/contact routes
│   └── paymentRoute.js       # /api/payment routes
├── schema/
│   ├── Contact.js            # Contact form Mongoose schema
│   ├── Content.js            # Generated content Mongoose schema
│   └── User.js               # User Mongoose schema
├── services/
│   ├── aiContentGeneration.js # Core Gemini API call logic
│   ├── aiService.js           # AI service layer (generate + history)
│   ├── authService.js         # Auth service layer (register, login, getMe)
│   ├── contactService.js      # Contact service layer
│   └── paymentService.js      # Payment service layer
├── .env                      # Environment variables (not committed)
├── package.json
└── server.js                 # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A running **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A **Google AI Studio** API key ([Get one here](https://aistudio.google.com/))
- A **Razorpay** account ([Sign up here](https://razorpay.com/))

### Installation

1. **Clone the repository and navigate to the backend:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example and fill in your values
   cp .env.example .env
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The API will be running at `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file in the root of the `Backend/` directory with the following keys:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

> ⚠️ **Never commit your `.env` file.** Ensure it is listed in `.gitignore`.

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

---

### 🔑 Auth Routes — `/api/auth`

| Method | Endpoint          | Auth Required | Description                     |
|--------|-------------------|---------------|---------------------------------|
| POST   | `/register`       | ❌            | Register a new user             |
| POST   | `/login`          | ❌            | Login and receive a JWT token   |
| GET    | `/me`             | ✅            | Get current authenticated user  |

#### POST `/api/auth/register`
```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### POST `/api/auth/login`
```json
// Request Body
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🤖 AI Routes — `/api/ai`

> All routes require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint          | Auth Required | Description                          |
|--------|-------------------|---------------|--------------------------------------|
| POST   | `/generate`       | ✅            | Generate AI content using Gemini     |
| GET    | `/history`        | ✅            | Fetch user's content generation history |

#### POST `/api/ai/generate`
```json
// Request Body
{
  "prompt": "Write a product description for wireless earbuds",
  "type": "product-description"
}
```

---

### 💳 Payment Routes — `/api/payment`

> All routes require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint            | Auth Required | Description                        |
|--------|---------------------|---------------|------------------------------------|
| POST   | `/create-order`     | ✅            | Create a Razorpay order            |
| POST   | `/verify-payment`   | ✅            | Verify & confirm a payment         |

#### POST `/api/payment/create-order`
```json
// Request Body
{
  "amount": 49900,
  "plan": "pro"
}
```

#### POST `/api/payment/verify-payment`
```json
// Request Body
{
  "razorpay_order_id": "order_xxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxx",
  "razorpay_signature": "signature_string"
}
```

---

### 📧 Contact Routes — `/api/contact`

| Method | Endpoint   | Auth Required | Description                  |
|--------|------------|---------------|------------------------------|
| POST   | `/`        | ❌            | Submit a contact form        |

#### POST `/api/contact`
```json
// Request Body
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I'd love to learn more about the Pro plan."
}
```

---

## 🗄️ Database Schema

### User
```js
{
  name:      String,
  email:     String (unique),
  password:  String (hashed),
  credits:   Number (default: 5),
  plan:      String (default: "free"),
  createdAt: Date,
  updatedAt: Date
}
```

### Content (Generated History)
```js
{
  userId:    ObjectId (ref: User),
  prompt:    String,
  result:    String,
  type:      String,
  createdAt: Date
}
```

### Contact
```js
{
  name:      String,
  email:     String,
  message:   String,
  createdAt: Date
}
```

---

## 🏗️ Architecture

```
Client Request
      │
      ▼
  Express Router
      │
      ▼
  Middleware (authMiddleware — JWT verify)
      │
      ▼
  Controller (validates request, calls service)
      │
      ▼
  Service (business logic)
      │
      ▼
  Schema / Model (Mongoose — MongoDB)
```

This layered architecture ensures:
- **Separation of concerns** — Each layer has a single responsibility
- **Testability** — Services can be unit-tested independently
- **Scalability** — Easy to add new features without disrupting existing code

---

## 📜 Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm start`     | Start the server with Node.js            |
| `npm run dev`   | Start the server with Nodemon (hot reload)|

---

## 🔗 Related

- **Frontend Repository:** [`../Frontend`](../Frontend/README.md) — React + Vite frontend for this platform.

---

<div align="center">
  <p>Built with ❤️ using Node.js, Express, and MongoDB</p>
</div>
