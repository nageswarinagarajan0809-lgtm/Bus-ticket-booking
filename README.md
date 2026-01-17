# Bus Ticket Booking System - MERN Stack

A complete, production-ready bus ticket booking website built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 📋 Overview

This is a full-stack application for booking bus tickets with features like user authentication, bus search, seat selection, booking management, and admin panel.

### Live Demo
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## ✨ Features

### User Features
- ✅ User registration and authentication
- ✅ Search buses by route and date
- ✅ View available seats
- ✅ Book seats with passenger details
- ✅ View booking history
- ✅ Cancel bookings
- ✅ User dashboard

### Admin Features
- ✅ Manage buses (create, update, delete)
- ✅ Manage routes (create, update, delete)
- ✅ View all bookings
- ✅ Seat availability management
- ✅ Admin dashboard

### Technical Features
- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ MongoDB database with Mongoose
- ✅ Responsive design
- ✅ Error handling
- ✅ Real-time notifications
- ✅ Protected routes

## 🏗️ Project Structure

```
bus-booking-app/
├── backend/
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── .env                 # Environment variables
│   ├── .gitignore           # Git ignore rules
│   ├── server.js            # Entry point
│   ├── package.json         # Dependencies
│   └── README.md            # Backend docs
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Context providers
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── vite.config.js       # Vite config
│   ├── tailwind.config.js   # Tailwind config
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend docs
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bus-booking
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod

   # Or use MongoDB Atlas
   # Update MONGO_URI in .env with Atlas connection string
   ```

5. **Run backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   App opens at `http://localhost:3000`

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Bus
```javascript
{
  busNumber: String (unique),
  busName: String,
  type: String (AC/Non-AC/Sleeper),
  totalSeats: Number,
  availableSeats: Number,
  amenities: [String],
  operatorName: String,
  pricePerSeat: Number,
  createdAt: Date
}
```

### Route
```javascript
{
  from: String,
  to: String,
  distance: Number,
  duration: String,
  departureTime: String,
  arrivalTime: String,
  baseFare: Number,
  bus: ObjectId,
  journeyDate: Date,
  createdAt: Date
}
```

### Booking
```javascript
{
  user: ObjectId,
  bus: ObjectId,
  route: ObjectId,
  seats: [Number],
  journeyDate: Date,
  totalFare: Number,
  status: String (pending/confirmed/cancelled),
  passengerDetails: [Object],
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (Protected)
```

### Buses
```
GET    /api/buses              - Get all buses
GET    /api/buses/:id          - Get bus by ID
POST   /api/buses              - Create bus (Admin)
PUT    /api/buses/:id          - Update bus (Admin)
DELETE /api/buses/:id          - Delete bus (Admin)
```

### Routes
```
GET    /api/routes/search      - Search routes
GET    /api/routes/:id         - Get route by ID
POST   /api/routes             - Create route (Admin)
PUT    /api/routes/:id         - Update route (Admin)
DELETE /api/routes/:id         - Delete route (Admin)
```

### Bookings
```
POST   /api/bookings           - Create booking (Protected)
GET    /api/bookings/user/:id  - Get user bookings (Protected)
GET    /api/bookings/:id       - Get booking (Protected)
DELETE /api/bookings/:id       - Cancel booking (Protected)
GET    /api/bookings           - Get all bookings (Admin)
```

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with every request in `Authorization: Bearer <token>`
5. Backend verifies token for protected routes

## 🎨 Frontend Features

### Pages
- **Home** - Landing page with features
- **Search** - Search and list buses
- **MyBookings** - User's bookings
- **Login** - User login
- **Register** - User registration

### Components
- **Navbar** - Navigation and user menu
- **Login Form** - Login component
- **Register Form** - Registration component
- **Bus Cards** - Bus route display
- **Booking List** - User bookings

### Styling
- Tailwind CSS for responsive design
- Custom utility classes
- Mobile-first approach
- Consistent color scheme

## 🛠️ Development

### Running in Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Code Quality

**Lint code:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

## 📦 Production Build

### Backend
```bash
cd backend
npm start
# or use PM2
pm2 start server.js --name "bus-booking-api"
```

### Frontend
```bash
cd frontend
npm run build
# dist/ folder ready for deployment
```

## 🌐 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Push to Git
3. Deploy using platform CLI

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload dist/ or connect Git repo
```

## 📝 API Examples

### Register User
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

### Search Routes
```bash
curl 'http://localhost:5000/api/routes/search?from=Delhi&to=Mumbai&journeyDate=2024-01-20' \
  -H "Authorization: Bearer <token>"
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "busId": "...",
    "routeId": "...",
    "seats": [1, 2, 3],
    "journeyDate": "2024-01-20",
    "passengerDetails": [...]
  }'
```

## 🧪 Testing

### Test Backend Endpoints
- Use Postman or Insomnia
- Import API collection
- Set Authorization header with JWT token

### Test Frontend
- Open browser DevTools
- Check Console for errors
- Use React DevTools extension
- Test API calls in Network tab

## 📚 Documentation

- [Backend README](./backend/README.md) - Backend documentation
- [Frontend README](./frontend/README.md) - Frontend documentation

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env
- For Atlas, verify IP whitelist

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Vite will use next available port

### CORS Error
- Check backend CORS configuration
- Verify VITE_API_URL in frontend .env

### Authentication Issues
- Clear localStorage
- Re-login user
- Check JWT_SECRET matches

## 🔒 Security

- Passwords hashed with bcryptjs
- JWT for secure authentication
- Environment variables for secrets
- Protected routes with middleware
- Input validation
- Error handling

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Performance

- Code splitting with Vite
- Tree shaking
- CSS minification
- Image optimization
- API caching considerations

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
1. Check the README files
2. Review API documentation
3. Check browser console for errors
4. Review server logs

## 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced seat selection UI
- [ ] Booking cancellation policy
- [ ] Rating and reviews
- [ ] Filter and sorting options
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

## ✅ Checklist

- ✅ Backend setup complete
- ✅ Frontend setup complete
- ✅ Database models created
- ✅ API endpoints implemented
- ✅ Authentication system
- ✅ Error handling
- ✅ Response formatting
- ✅ Protected routes
- ✅ Frontend components
- ✅ Context API setup
- ✅ API services
- ✅ Responsive design
- ✅ Documentation

---

**Happy Coding! 🚀**
