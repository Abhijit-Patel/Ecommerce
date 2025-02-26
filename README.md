# Backend Ecommerce

This is the backend service for the Ecommerce application. It provides APIs for managing products, orders, users.

## Features

- User authentication and authorization
- Product management
- Order management
- Cart management

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed

### Installation

1. Clone the repository:
    'https://github.com/Abhijit-Patel/Ecommerce.git'

2. Install dependencies:
    'npm install'

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    PORT=5000
    MONGODB_URI=mongodb+srv://abhijit:A1abhijit@cluster0.rvhew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=secret_key

### Running the Application

1. Start the development server:
    npm start

2. The server will be running at `http://localhost:5000`.

### Production Deployment url
https://backend-ecommerce-wine.vercel.app/

## API Documentation

| Endpoint                        | Method | Description                 |
|---------------------------------|--------|-----------------------------|
| `/api/auth/signup`              | POST   | Register a new user         |
| `/api/auth/login`               | POST   | User login |
| `/api/auth/logout`              | POST   | User logout |
| `/api/products`                 | GET    | Fetch all products          |
| `/api/cart/add`                 | POST   | Add items to the cart       | 
| `/api/cart/remove`              | POST   | Remove items from the cart  |
| `/api/order/checkout`           | POST   | Place an order              |
