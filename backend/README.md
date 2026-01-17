# Bus Ticket Booking System - Backend

A Node.js/Express backend API for a complete bus ticket booking system using MongoDB and Mongoose.

## Features

- **User Authentication**: Register, login, JWT-based auth
- **Bus Management**: Create, update, and manage buses (Admin)
- **Route Management**: Create and manage routes (Admin)
- **Booking System**: Create, view, and cancel bookings
- **Seat Management**: Track available seats
- **Admin Panel**: Manage all buses, routes, and bookings
- **Security**: Password hashing with bcryptjs, JWT authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Logging**: Morgan
- **Environment**: dotenv

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── busController.js     # Bus operations
│   ├── routeController.js   # Route operations
│   └── bookingController.js # Booking operations
├── models/
│   ├── User.js              # User schema
│   ├── Bus.js               # Bus schema
│   ├── Route.js             # Route schema
│   └── Booking.js           # Booking schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── busRoutes.js         # Bus endpoints
│   ├── routeRoutes.js       # Route endpoints
│   └── bookingRoutes.js     # Booking endpoints
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── admin.js             # Admin check
│   └── errorHandler.js      # Error handling
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── server.js                # Entry point
└── package.json             # Dependencies
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   
   Edit `.env` file and update:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bus-booking
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bus-booking
   ```

3. **Start the Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

   Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Buses
- `GET /api/buses` - Get all buses
- `GET /api/buses/:id` - Get bus by ID
- `POST /api/buses` - Create bus (Admin only)
- `PUT /api/buses/:id` - Update bus (Admin only)
- `DELETE /api/buses/:id` - Delete bus (Admin only)

### Routes
- `GET /api/routes/search` - Search routes (query: from, to, journeyDate)
- `GET /api/routes/:id` - Get route by ID
- `POST /api/routes` - Create route (Admin only)
- `PUT /api/routes/:id` - Update route (Admin only)
- `DELETE /api/routes/:id` - Delete route (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/user/:userId` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)
- `GET /api/bookings` - Get all bookings (Admin only)

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Search Routes
```bash
GET /api/routes/search?from=Delhi&to=Mumbai&journeyDate=2024-01-20
Authorization: Bearer token

Response:
{
  "success": true,
  "count": 5,
  "routes": [
    {
      "_id": "...",
      "from": "Delhi",
      "to": "Mumbai",
      "distance": 1400,
      "duration": "18h 30m",
      "departureTime": "08:00",
      "arrivalTime": "02:30",
      "baseFare": 1200,
      "bus": { ... }
    }
  ]
}
```

### Create Booking
```bash
POST /api/bookings
Authorization: Bearer token
Content-Type: application/json

{
  "busId": "...",
  "routeId": "...",
  "seats": [1, 2, 3],
  "journeyDate": "2024-01-20",
  "passengerDetails": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    }
  ]
}

Response:
{
  "success": true,
  "message": "Booking created successfully",
  "booking": { ... }
}
```

## Database Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String (user/admin, default: user),
  createdAt: Date
}
```

### Bus Schema
```javascript
{
  busNumber: String (required, unique),
  busName: String (required),
  type: String (AC/Non-AC/Sleeper/Semi-Sleeper),
  totalSeats: Number (default: 50),
  availableSeats: Number,
  amenities: [String],
  operatorName: String (required),
  pricePerSeat: Number (required),
  createdAt: Date
}
```

### Route Schema
```javascript
{
  from: String (required),
  to: String (required),
  distance: Number (required),
  duration: String (required),
  departureTime: String (required),
  arrivalTime: String (required),
  baseFare: Number (required),
  bus: ObjectId (ref: Bus),
  journeyDate: Date (required),
  createdAt: Date
}
```

### Booking Schema
```javascript
{
  user: ObjectId (ref: User),
  bus: ObjectId (ref: Bus),
  route: ObjectId (ref: Route),
  seats: [Number],
  bookingDate: Date,
  journeyDate: Date (required),
  totalFare: Number (required),
  status: String (pending/confirmed/cancelled),
  passengerDetails: [Object],
  createdAt: Date
}
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "..." // Only in development
}
```

HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/bus-booking |
| JWT_SECRET | JWT secret key | your_secret_key |
| NODE_ENV | Environment | development/production |

## Running in Production

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Set proper `MONGO_URI` for your MongoDB instance
4. Deploy using PM2 or Docker
5. Set up proper logging and monitoring

## Testing the API

Use Postman or curl to test endpoints:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"9876543210","password":"pass"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass"}'

# Search Routes
curl http://localhost:5000/api/routes/search?from=Delhi&to=Mumbai&journeyDate=2024-01-20
```

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
