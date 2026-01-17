# API Testing Examples

Use these examples with Postman, Insomnia, or curl to test the API endpoints.

## 🔑 Authentication

### 1. Register New User

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 2. Login User

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 3. Get Current User (Protected)

**Method:** GET  
**URL:** `http://localhost:5000/api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🚌 Bus Management (Admin Only)

### 1. Get All Buses

**Method:** GET  
**URL:** `http://localhost:5000/api/buses`

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "buses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "busNumber": "BUS001",
      "busName": "Express Services",
      "type": "AC",
      "totalSeats": 50,
      "availableSeats": 45,
      "amenities": ["WiFi", "Charging", "AC"],
      "operatorName": "XYZ Travels",
      "pricePerSeat": 1200,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Bus by ID

**Method:** GET  
**URL:** `http://localhost:5000/api/buses/507f1f77bcf86cd799439012`

**Response:**
```json
{
  "success": true,
  "bus": {
    "_id": "507f1f77bcf86cd799439012",
    "busNumber": "BUS001",
    "busName": "Express Services",
    "type": "AC",
    "totalSeats": 50,
    "availableSeats": 45,
    "amenities": ["WiFi", "Charging", "AC"],
    "operatorName": "XYZ Travels",
    "pricePerSeat": 1200
  }
}
```

---

### 3. Create Bus (Admin Only)

**Method:** POST  
**URL:** `http://localhost:5000/api/buses`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "busNumber": "BUS001",
  "busName": "Express Services",
  "type": "AC",
  "totalSeats": 50,
  "amenities": ["WiFi", "Charging", "AC", "Toilet"],
  "operatorName": "XYZ Travels",
  "pricePerSeat": 1200
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bus created successfully",
  "bus": {
    "_id": "507f1f77bcf86cd799439012",
    "busNumber": "BUS001",
    "busName": "Express Services",
    "type": "AC",
    "totalSeats": 50,
    "availableSeats": 50,
    "amenities": ["WiFi", "Charging", "AC", "Toilet"],
    "operatorName": "XYZ Travels",
    "pricePerSeat": 1200
  }
}
```

---

### 4. Update Bus (Admin Only)

**Method:** PUT  
**URL:** `http://localhost:5000/api/buses/507f1f77bcf86cd799439012`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "pricePerSeat": 1300,
  "amenities": ["WiFi", "Charging", "AC", "Blanket"]
}
```

---

### 5. Delete Bus (Admin Only)

**Method:** DELETE  
**URL:** `http://localhost:5000/api/buses/507f1f77bcf86cd799439012`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

## 🛣️ Route Management (Admin Only)

### 1. Search Routes

**Method:** GET  
**URL:** `http://localhost:5000/api/routes/search?from=Delhi&to=Mumbai&journeyDate=2024-01-20`

**Response:**
```json
{
  "success": true,
  "count": 1,
  "routes": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "from": "Delhi",
      "to": "Mumbai",
      "distance": 1400,
      "duration": "18h 30m",
      "departureTime": "08:00",
      "arrivalTime": "02:30",
      "baseFare": 1200,
      "bus": {
        "_id": "507f1f77bcf86cd799439012",
        "busNumber": "BUS001",
        "busName": "Express Services",
        "type": "AC",
        "availableSeats": 45
      },
      "journeyDate": "2024-01-20T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Route by ID

**Method:** GET  
**URL:** `http://localhost:5000/api/routes/507f1f77bcf86cd799439013`

**Response:**
```json
{
  "success": true,
  "route": {
    "_id": "507f1f77bcf86cd799439013",
    "from": "Delhi",
    "to": "Mumbai",
    "distance": 1400,
    "duration": "18h 30m",
    "departureTime": "08:00",
    "arrivalTime": "02:30",
    "baseFare": 1200,
    "bus": { ... }
  }
}
```

---

### 3. Create Route (Admin Only)

**Method:** POST  
**URL:** `http://localhost:5000/api/routes`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "from": "Delhi",
  "to": "Mumbai",
  "distance": 1400,
  "duration": "18h 30m",
  "departureTime": "08:00",
  "arrivalTime": "02:30",
  "baseFare": 1200,
  "bus": "507f1f77bcf86cd799439012",
  "journeyDate": "2024-01-20"
}
```

---

### 4. Update Route (Admin Only)

**Method:** PUT  
**URL:** `http://localhost:5000/api/routes/507f1f77bcf86cd799439013`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "baseFare": 1300,
  "departureTime": "09:00"
}
```

---

### 5. Delete Route (Admin Only)

**Method:** DELETE  
**URL:** `http://localhost:5000/api/routes/507f1f77bcf86cd799439013`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

## 🎟️ Booking Management

### 1. Create Booking (Protected)

**Method:** POST  
**URL:** `http://localhost:5000/api/bookings`

**Headers:**
```
Authorization: Bearer USER_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "busId": "507f1f77bcf86cd799439012",
  "routeId": "507f1f77bcf86cd799439013",
  "seats": [1, 2, 3],
  "journeyDate": "2024-01-20",
  "passengerDetails": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543211"
    },
    {
      "name": "Bob Smith",
      "email": "bob@example.com",
      "phone": "9876543212"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "bus": {
      "_id": "507f1f77bcf86cd799439012",
      "busName": "Express Services"
    },
    "route": { ... },
    "seats": [1, 2, 3],
    "journeyDate": "2024-01-20",
    "totalFare": 3600,
    "status": "confirmed",
    "passengerDetails": [ ... ],
    "bookingDate": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get User Bookings (Protected)

**Method:** GET  
**URL:** `http://localhost:5000/api/bookings/user/507f1f77bcf86cd799439011`

**Headers:**
```
Authorization: Bearer USER_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "user": { ... },
      "bus": { ... },
      "route": { ... },
      "seats": [1, 2, 3],
      "totalFare": 3600,
      "status": "confirmed"
    }
  ]
}
```

---

### 3. Get Booking by ID (Protected)

**Method:** GET  
**URL:** `http://localhost:5000/api/bookings/507f1f77bcf86cd799439014`

**Headers:**
```
Authorization: Bearer USER_JWT_TOKEN
```

---

### 4. Cancel Booking (Protected)

**Method:** DELETE  
**URL:** `http://localhost:5000/api/bookings/507f1f77bcf86cd799439014`

**Headers:**
```
Authorization: Bearer USER_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439014",
    "status": "cancelled"
  }
}
```

---

### 5. Get All Bookings (Admin Only)

**Method:** GET  
**URL:** `http://localhost:5000/api/bookings`

**Headers:**
```
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

## 🧪 curl Examples

### Register with curl
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'
```

### Login with curl
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get current user with curl
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Search routes with curl
```bash
curl "http://localhost:5000/api/routes/search?from=Delhi&to=Mumbai&journeyDate=2024-01-20"
```

### Get all buses with curl
```bash
curl http://localhost:5000/api/buses
```

---

## 📊 Testing Workflow

1. **Register User**
   - Call register endpoint
   - Save the token

2. **Search Buses** (Optional - no buses without admin)
   - Use saved token
   - Search for buses

3. **Get All Buses**
   - Check available buses

4. **Create Booking** (If buses exist)
   - Use saved user token
   - Create booking with selected seats

5. **Get My Bookings**
   - Use saved token
   - View user's bookings

6. **Cancel Booking**
   - Use booking ID
   - Cancel the booking

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Bus not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 💾 Save Sample Data

### Admin User (Create manually)
- Email: admin@example.com
- Password: admin123
- Set role to "admin" in database

### Test Bus (Create via API)
- Bus Number: BUS001
- Bus Name: Express Services
- Type: AC
- Total Seats: 50
- Price: 1200

### Test Route (Create via API)
- From: Delhi
- To: Mumbai
- Distance: 1400
- Departure: 08:00
- Arrival: 02:30
- Fare: 1200

---

**Keep this file for testing different scenarios! 🧪**
