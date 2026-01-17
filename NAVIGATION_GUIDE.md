# 🗺️ Project Navigation Guide

A visual guide to navigate and understand your MERN Bus Booking System.

---

## 📍 Where to Start?

```
START HERE
    ↓
[README.md] ← Main overview and features
    ↓
[SETUP_GUIDE.md] ← Installation steps
    ↓
[QUICK_REFERENCE.md] ← Quick commands
    ↓
Run: npm run dev (both terminals)
    ↓
READY TO USE! 🎉
```

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────┐
│           MERN BUS BOOKING SYSTEM           │
└─────────────────────────────────────────────┘
            ↓            ↓            ↓
        ┌───────┐   ┌─────────┐   ┌──────────┐
        │Frontend│   │Backend  │   │Database  │
        │(React) │   │(Express)│   │(MongoDB) │
        └───┬───┘   └────┬────┘   └──────────┘
            │            │
        Port:3000    Port:5000
```

---

## 🗂️ File Organization Map

### Root Level (Documentation)
```
📄 README.md ..................... Start here!
📄 SETUP_GUIDE.md ................ Installation
📄 QUICK_REFERENCE.md ........... Commands
📄 API_TESTING.md ............... API examples
📄 TROUBLESHOOTING.md ........... Issues & fixes
📄 FILE_INVENTORY.md ............ File listing
📄 COMPLETION_SUMMARY.md ........ What was done
```

### Backend Structure
```
backend/
├── 📄 server.js ................. Starts here
├── 📄 .env ....................... Configuration
├── config/
│   └── database.js .............. MongoDB setup
├── models/
│   ├── User.js .................. User schema
│   ├── Bus.js ................... Bus schema
│   ├── Route.js ................. Route schema
│   └── Booking.js ............... Booking schema
├── controllers/
│   ├── authController.js ........ Auth logic
│   ├── busController.js ......... Bus operations
│   ├── routeController.js ....... Route operations
│   └── bookingController.js ..... Booking operations
├── routes/
│   ├── authRoutes.js ............ Auth endpoints
│   ├── busRoutes.js ............. Bus endpoints
│   ├── routeRoutes.js ........... Route endpoints
│   └── bookingRoutes.js ......... Booking endpoints
└── middleware/
    ├── auth.js .................. Token verification
    ├── admin.js ................. Admin check
    └── errorHandler.js .......... Error handling
```

### Frontend Structure
```
frontend/
├── 📄 App.jsx ................... Main component
├── 📄 main.jsx .................. Entry point
├── 📄 index.css ................. Styles
├── src/
│   ├── components/
│   │   ├── Navbar.jsx .......... Navigation
│   │   ├── Login.jsx ........... Login form
│   │   └── Register.jsx ........ Registration
│   ├── pages/
│   │   ├── Home.jsx ............ Home page
│   │   ├── SearchBuses.jsx ..... Search page
│   │   ├── MyBookings.jsx ...... Bookings page
│   │   └── NotFound.jsx ........ 404 page
│   ├── services/
│   │   ├── apiClient.js ........ HTTP setup
│   │   ├── authService.js ...... Auth calls
│   │   ├── busService.js ....... Bus calls
│   │   ├── routeService.js ..... Route calls
│   │   └── bookingService.js ... Booking calls
│   ├── context/
│   │   ├── AuthContext.jsx ..... Auth state
│   │   └── BookingContext.jsx .. Booking state
│   └── utils/
│       └── helpers.js .......... Helper functions
```

---

## 🔄 Request Flow

### User Registration Flow
```
User fills form
    ↓
Register.jsx
    ↓
authService.register()
    ↓
POST /api/auth/register
    ↓
authController.register()
    ↓
Create User model
    ↓
Generate JWT token
    ↓
Response with token
    ↓
Save token to localStorage
    ↓
Redirect to home
```

### Bus Search Flow
```
User searches
    ↓
SearchBuses.jsx
    ↓
routeService.searchRoutes()
    ↓
GET /api/routes/search?from=X&to=Y
    ↓
routeController.searchRoutes()
    ↓
Query database
    ↓
Populate bus data
    ↓
Return results
    ↓
Display bus list
```

### Booking Flow
```
User selects seats
    ↓
CreateBooking form
    ↓
bookingService.createBooking()
    ↓
POST /api/bookings
    ↓
authMiddleware (verify token)
    ↓
bookingController.createBooking()
    ↓
Create Booking model
    ↓
Update available seats
    ↓
Response with booking ID
    ↓
Show confirmation
```

---

## 📊 Data Model Relationships

```
┌─────────────────────────────────────────────┐
│                   USER                      │
│  ├─ name, email, password, phone, role      │
│  └─ Can have multiple bookings              │
│        ↓                                     │
│     BOOKING                                 │
│     ├─ user (FK)                            │
│     ├─ bus (FK)                             │
│     ├─ route (FK)                           │
│     ├─ seats, fare, status                  │
│     └─ Contains passenger details           │
│                                             │
└─────────────────────────────────────────────┘

        ↓                       ↓

┌──────────────────┐   ┌─────────────────────┐
│       BUS        │   │       ROUTE         │
│ ├─ busNumber     │   │ ├─ from, to         │
│ ├─ busName       │   │ ├─ distance         │
│ ├─ type          │   │ ├─ departureTime    │
│ ├─ totalSeats    │   │ ├─ arrivalTime      │
│ ├─ amenities     │   │ ├─ baseFare         │
│ └─ pricePerSeat  │   │ ├─ bus (FK)         │
│                  │   │ └─ journeyDate      │
└──────────────────┘   └─────────────────────┘
```

---

## 🔌 API Endpoint Map

### Auth Endpoints
```
POST /api/auth/register
  Input: name, email, phone, password
  Output: token, user
  
POST /api/auth/login
  Input: email, password
  Output: token, user
  
GET /api/auth/me
  Auth: Bearer token
  Output: user data
```

### Bus Endpoints
```
GET /api/buses
  Output: all buses
  
GET /api/buses/:id
  Output: single bus
  
POST /api/buses (Admin)
  Input: bus data
  Output: created bus
  
PUT /api/buses/:id (Admin)
  Input: updated fields
  Output: updated bus
  
DELETE /api/buses/:id (Admin)
  Output: success message
```

### Route Endpoints
```
GET /api/routes/search
  Query: from, to, journeyDate
  Output: matching routes
  
GET /api/routes/:id
  Output: single route
  
POST /api/routes (Admin)
  Input: route data
  Output: created route
  
PUT /api/routes/:id (Admin)
  Input: updated fields
  Output: updated route
  
DELETE /api/routes/:id (Admin)
  Output: success message
```

### Booking Endpoints
```
POST /api/bookings
  Auth: Bearer token
  Input: busId, routeId, seats, journeyDate
  Output: booking confirmation
  
GET /api/bookings/user/:userId
  Auth: Bearer token
  Output: user's bookings
  
GET /api/bookings/:id
  Auth: Bearer token
  Output: single booking
  
DELETE /api/bookings/:id
  Auth: Bearer token
  Output: cancellation confirmation
  
GET /api/bookings (Admin)
  Auth: Bearer admin token
  Output: all bookings
```

---

## 🎨 Frontend Routes Map

```
/ (Home)
├── [Public] Hero, Features, CTA
├── Link: /search
└── Link: /login, /register

/login (Login)
├── [Public] Login form
├── Success: Redirect to /
└── Link: /register

/register (Register)
├── [Public] Registration form
├── Success: Redirect to /
└── Link: /login

/search (Search)
├── [Public] Search form
├── [Public] Bus list
└── Link: Booking page (need token)

/my-bookings (Bookings)
├── [Protected] User bookings list
├── [Protected] Booking details
├── [Protected] Cancel button
└── Redirect to /login if not authenticated

* (404)
├── Not found page
└── Link: Home
```

---

## 🔐 Authentication Flow

```
┌─────────────────┐
│  User Registers │
│    or Logs In   │
└────────┬────────┘
         │
    ┌────▼────────────────────────────────────┐
    │ Backend generates JWT token             │
    │ Token = {id: userId, role: userRole}   │
    └────┬────────────────────────────────────┘
         │
    ┌────▼─────────────────────┐
    │ Send token to frontend   │
    │ Frontend saves to        │
    │ localStorage             │
    └────┬─────────────────────┘
         │
    ┌────▼──────────────────────────────────────┐
    │ All future API requests include token     │
    │ Header: Authorization: Bearer {token}    │
    └────┬──────────────────────────────────────┘
         │
    ┌────▼──────────────────────────────────────┐
    │ Backend middleware verifies token         │
    │ If valid: Continue                        │
    │ If invalid: Return 401                    │
    └────┬──────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────┐
    │ Access Granted or Denied              │
    └──────────────────────────────────────┘
```

---

## 📚 Documentation Navigation

| Need | Read | Time |
|------|------|------|
| Quick start | QUICK_REFERENCE.md | 2 min |
| Setup | SETUP_GUIDE.md | 10 min |
| APIs | API_TESTING.md | 5 min |
| Issues | TROUBLESHOOTING.md | 10 min |
| Files | FILE_INVENTORY.md | 5 min |
| Backend | backend/README.md | 15 min |
| Frontend | frontend/README.md | 15 min |

---

## 🎯 Development Workflow

```
DAY 1: SETUP
├── Install Node.js & MongoDB
├── Clone/Extract project
├── Run: npm install (backend)
├── Run: npm install (frontend)
├── Update .env files
└── Test: npm run dev (both)

DAY 2: EXPLORE
├── Register & Login
├── Search for buses
├── Read source code
├── Understand structure
└── Test API endpoints

DAY 3: CUSTOMIZE
├── Modify styling
├── Add new features
├── Extend database
├── Test changes
└── Commit to Git

DAY 4: ENHANCE
├── Add validation
├── Improve UX
├── Add animations
├── Performance optimize
└── Ready for production
```

---

## 🔍 How to Find Things

### "I want to change the login form"
```
File: frontend/src/components/Login.jsx
Contains: Login form UI, validation, error handling
Related: authService.js, AuthContext.jsx
```

### "I want to add a new bus field"
```
File: backend/models/Bus.js
Add field to schema
Update busController.js
Update busRoutes.js
```

### "I want to modify search functionality"
```
File: backend/controllers/routeController.js
Method: searchRoutes()
Frontend: frontend/src/pages/SearchBuses.jsx
Service: frontend/src/services/routeService.js
```

### "I want to add validation"
```
Backend: backend/controllers/
Frontend: frontend/src/components/
Both: Add validation logic
```

---

## 🧪 Testing Checklist

```
□ User Registration
  - Register new user
  - Try duplicate email
  - Check error handling

□ User Login
  - Login with correct credentials
  - Try wrong password
  - Token saved to localStorage

□ Bus Search
  - Search with valid inputs
  - Try empty search
  - Check results display

□ Make Booking
  - Select seats
  - Fill passenger details
  - Confirm booking

□ View Bookings
  - See booking history
  - Check booking status
  - View booking details

□ Cancel Booking
  - Cancel valid booking
  - Check confirmation
  - Verify seat released
```

---

## 💾 File Dependency Map

```
main.jsx
  ↓
App.jsx
  ├─ AuthProvider (AuthContext.jsx)
  ├─ BookingProvider (BookingContext.jsx)
  └─ Routes:
     ├─ Navbar.jsx
     ├─ Home.jsx
     ├─ Login.jsx → authService.js
     ├─ Register.jsx → authService.js
     ├─ SearchBuses.jsx → routeService.js
     └─ MyBookings.jsx → bookingService.js

All services use apiClient.js
All components may use hooks from contexts
```

---

## 🚀 Quick Navigation

**Need help?** Choose your situation:

- **"App won't start"** → TROUBLESHOOTING.md
- **"Don't know setup"** → SETUP_GUIDE.md
- **"Quick commands"** → QUICK_REFERENCE.md
- **"Testing APIs"** → API_TESTING.md
- **"Backend details"** → backend/README.md
- **"Frontend details"** → frontend/README.md
- **"File locations"** → FILE_INVENTORY.md

---

## 🎓 Learning Path

```
BEGINNER
├─ Read README.md
├─ Follow SETUP_GUIDE.md
├─ Run the app
├─ Explore UI
└─ Read QUICK_REFERENCE.md

INTERMEDIATE
├─ Study backend models
├─ Review API endpoints
├─ Understand authentication
├─ Trace request flow
└─ Modify components

ADVANCED
├─ Add new features
├─ Optimize queries
├─ Improve UI/UX
├─ Add payment
└─ Deploy to production
```

---

## 📞 Getting Help

```
PROBLEM                 SOLUTION
────────────────────────────────────────
App won't start      → Check SETUP_GUIDE.md
API errors           → Check API_TESTING.md
Styling issues       → Check frontend/README.md
Database issues      → Check TROUBLESHOOTING.md
Code questions       → Check file comments
Best practices       → Check existing code
```

---

## ✅ Your Next Steps

1. ✅ Read this guide
2. → Open README.md
3. → Follow SETUP_GUIDE.md
4. → Run the application
5. → Test the features
6. → Read the code
7. → Customize features
8. → Deploy!

---

**Welcome to your MERN Bus Booking System! 🎉**

**You're ready to explore, learn, and build! Let's go! 🚀**
