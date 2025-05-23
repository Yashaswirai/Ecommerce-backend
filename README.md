
# Euphoria Genx - Ecommerce Backend Project

This project is a backend implementation for an Ecommerce platform provided by **Euphoria Genx**. The backend is built using **Node.js** and uses **EJS** for rendering the frontend views.

🌐 Live Demo: https://ecommerce-backend-u37u.onrender.com/


## Features

- User authentication and authorization
- Admin management
- Product management (CRUD operations)
- Shopping cart functionality
- Payment integration using Razorpay
- Profile management for users
- Order tracking and management by Admin

## Tech Stack

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: Database for storing user, product, and order data
- **EJS**: Templating engine for rendering HTML pages
- **Razorpay**: Payment gateway integration

## Packages Used

- `bcrypt`: Password hashing and verification
- `config`: Configuration management
- `connect-flash`: Flash messages for session
- `cookie-parser`: Parsing cookies attached to client requests
- `debug`: Debugging utility
- `dotenv`: Environment variable management
- `ejs`: Templating engine
- `express`: Web framework
- `express-session`: Session management
- `http`: HTTP server
- `jsonwebtoken`: JWT for authentication
- `mongoose`: MongoDB object modeling tool
- `multer`: Middleware for handling file uploads
- `razorpay`: Integration with Razorpay payment gateway

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yashaswirai/Ecommerce-backend.git
   cd Ecommerce-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EXPRESS_SESSION_SECRET=your_express_session_key
   JWT_SECRET=your_jwt_secret
   ADMIN_TOKEN=jwt_secret_for_admin
   ```
4. Configure the MongoDB URI:

   The MongoDB URI is configured in the `config/development.json` file. Update the URI in this file to connect to your MongoDB instance:

   ```json
   {
     "MONGODB_URI": "mongodb://localhost:27017"
   }

5. Start the application:

   ```bash
   npm start
   ```

## Project Structure

- `config/`: Configuration files for development and database connection
- `controllers/`: Controllers for handling requests and business logic
- `middlewares/`: Middleware functions for request handling
- `models/`: Mongoose models for MongoDB
- `routes/`: Route definitions for different modules (users, products, orders)
- `utils/`: Utility functions (e.g., token generation)
- `views/`: EJS templates for rendering the frontend
- `public/`: Static files like CSS, images

## Usage

1. **User Authentication**:
   - Users can sign up and log in.
   - Admin users have additional privileges to manage products and orders.

2. **Product Management**:
   - Admins can create, update, delete, and view products.

3. **Shopping Cart**:
   - Users can add products to their cart and proceed to checkout.

4. **Payment Integration**:
   - Users can make payments via Razorpay.

5. **Profile Management**:
   - Users can update their profiles and view their order history.

## Contributing

Contributions are welcome! Please follow the standard GitHub flow for contributions:
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature-branch`)
- Create a Pull Request

## Acknowledgements

- Special thanks to **Euphoria Genx** for providing the project framework.
- Thanks to the open-source community for the awesome packages used in this project.
