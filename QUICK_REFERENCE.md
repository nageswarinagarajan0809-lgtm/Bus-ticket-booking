# Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start MongoDB
```bash
mongod
# Or use MongoDB Atlas (no local setup needed)
```

### Terminal 2: Start Backend
```bash
cd backend
npm install  # First time only
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 3: Start Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
# App opens at http://localhost:3000
```

---

## 📁 File Structure Quick Reference

```
backend/
  server.js              ← Main entry point
  .env                   ← Configuration (update with MongoDB URI)
  config/database.js     ← Database connection
  models/                ← Schemas (User, Bus, Route, Booking)
  controllers/           ← Business logic
  routes/                ← API endpoints
  middleware/            ← Auth, errors

frontend/
  src/
    App.jsx              ← Main component
    main.jsx             ← Entry point
    components/          ← Reusable components (Login, Register, Navbar)
    pages/               ← Page components (Home, Search, MyBookings)
    services/            ← API calls (authService, busService, etc)
    context/             ← State management (AuthContext, BookingContext)
    utils/               ← Helper functions
  .env                   ← Configuration (API URL)
  vite.config.js         ← Vite configuration
```

---

## 🔑 Important Commands

### Backend
```bash
npm install              # Install dependencies
npm start                # Run production server
npm run dev              # Run with auto-reload
npm run lint             # Check code quality
npm run format           # Format code
```

### Frontend
```bash
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Create production build
npm run preview          # Preview build
npm run lint             # Check code quality
npm run format           # Format code
```

---

## 🔌 API Endpoints Cheat Sheet

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Buses
```
GET    /api/buses
GET    /api/buses/:id
POST   /api/buses (Admin)
PUT    /api/buses/:id (Admin)
DELETE /api/buses/:id (Admin)
```

### Routes
```
GET    /api/routes/search?from=X&to=Y&journeyDate=Z
GET    /api/routes/:id
POST   /api/routes (Admin)
PUT    /api/routes/:id (Admin)
DELETE /api/routes/:id (Admin)
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings/user/:userId
GET    /api/bookings/:id
DELETE /api/bookings/:id
GET    /api/bookings (Admin)
```

---

## 🔒 Authentication Flow

```
User Registration
    ↓
Password Hashed (bcryptjs)
    ↓
User Created in DB
    ↓
JWT Token Generated
    ↓
Token Stored in localStorage
    ↓
Token Sent with Every Request
    ↓
Backend Verifies Token
    ↓
Access Granted/Denied
```

---

## 📊 Database Models Quick View

### User
```javascript
name, email, password (hashed), phone, role, createdAt
```

### Bus
```javascript
busNumber, busName, type, totalSeats, availableSeats, amenities, operatorName, pricePerSeat
```

### Route
```javascript
from, to, distance, duration, departureTime, arrivalTime, baseFare, bus, journeyDate
```

### Booking
```javascript
user, bus, route, seats, journeyDate, totalFare, status, passengerDetails
```

---

## 🧪 Testing with Curl/Postman

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "pass123"
  }'
```

### Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "pass123"
  }'
```

### Use Token
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

---

## 🎨 Frontend Components Map

```
App.jsx (Router)
├── Navbar (All pages)
├── Home page
├── SearchBuses page
├── Login component
├── Register component
├── MyBookings page (Protected)
└── NotFound page
```

---

## 🔧 .env Files Template

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bus-booking
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check MONGO_URI, ensure MongoDB running |
| Port already in use | Change PORT in .env or kill process |
| CORS error | Check backend CORS, restart server |
| 401 Unauthorized | Login again, check localStorage token |
| npm install fails | `npm cache clean --force`, retry |
| Page won't load | Check console for errors, restart dev server |

---

## 🌍 Environment Variables

### Development
- Backend: `NODE_ENV=development`
- Backend: `JWT_SECRET=dev_key` (can be simple)
- Frontend: `VITE_API_URL=http://localhost:5000/api`

### Production
- Backend: `NODE_ENV=production`
- Backend: `JWT_SECRET=strong_random_key`
- Frontend: `VITE_API_URL=https://api.example.com/api`

---

## 📱 Frontend Routes

```
/                    → Home page
/login               → Login page
/register            → Registration page
/search              → Search buses
/my-bookings         → User bookings (Protected)
*                    → 404 Not found
```

---

## 🔄 Development Workflow

```
1. Start MongoDB (if local)
2. Start backend (npm run dev)
3. Start frontend (npm run dev)
4. Open http://localhost:3000
5. Code changes auto-reload
6. Test features
7. Check console for errors
8. Commit changes to Git
```

---

## 📦 Project Dependencies

### Backend (11 total)
```
express, mongoose, dotenv, cors, bcryptjs, 
jsonwebtoken, morgan, nodemon (dev)
```

### Frontend (7 total)
```
react, react-dom, react-router-dom, axios, 
react-hot-toast, tailwindcss
```

---

## 🚀 Useful Extensions (VS Code)

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (API testing)
- MongoDB for VS Code
- Tailwind CSS IntelliSense

---

## 📚 Documentation Files

- `README.md` - Main project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Frontend documentation
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies

---

## 🎯 Next Steps

1. ✅ Complete setup
2. ✅ Register and login
3. ✅ Explore the code
4. ✅ Test API endpoints
5. ✅ Add sample data
6. ✅ Test bookings
7. ✅ Customize features
8. ✅ Deploy project

---

## 💬 Common Questions

**Q: Where do I add a new page?**
A: Create component in `frontend/src/pages/`, add route in `App.jsx`

**Q: How to add admin features?**
A: Check user role, use `adminMiddleware` in backend, conditionally show in frontend

**Q: How to change styling?**
A: Edit `frontend/src/index.css` or `tailwind.config.js`

**Q: How to add database fields?**
A: Update schema in `backend/models/`, migrate data

---

## ⏱️ Common Commands by Time

**First time setup (15 min):**
```bash
git clone ...
cd backend && npm install
cd ../frontend && npm install
# Update .env files
```

**Daily development (3 commands):**
```bash
npm run dev  # backend
npm run dev  # frontend
# Open browser
```

**Deployment prep (5 min):**
```bash
npm run lint
npm run format
npm run build  # frontend
# Commit to Git
```

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Keep this guide handy for quick reference! 📌**
