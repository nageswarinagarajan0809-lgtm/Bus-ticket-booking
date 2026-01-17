# 🔧 Troubleshooting Guide

Common issues and their solutions.

---

## 🚀 Startup Issues

### Issue: "npm install fails"

**Symptoms:**
- Installation hangs or shows errors
- Missing packages

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Try again
npm install

# If still failing, use legacy peer deps
npm install --legacy-peer-deps

# Or try specific Node version
nvm use 16  # If you have nvm installed
```

---

### Issue: "Node version incompatibility"

**Symptoms:**
- "Node version x.x.x not supported"
- Package installation fails

**Solutions:**
```bash
# Check current Node version
node --version

# Should be v14 or higher
# Download from https://nodejs.org/

# Or use NVM (Node Version Manager)
nvm install 16
nvm use 16
nvm alias default 16
```

---

### Issue: "Permission denied" errors

**Symptoms:**
- "EACCES: permission denied"
- On Mac/Linux

**Solutions:**
```bash
# Use sudo (not recommended)
sudo npm install

# Or fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

---

## 📦 Backend Issues

### Issue: "MongoDB connection failed"

**Symptoms:**
- "MongooseError: connection error"
- Backend starts but can't connect to DB

**Solutions:**

**If using local MongoDB:**
```bash
# Check if MongoDB is running
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Verify MongoDB is running
mongo --version
```

**If using MongoDB Atlas:**
1. Log into https://cloud.mongodb.com
2. Check cluster is running
3. Verify IP whitelist includes your IP
4. Update MONGO_URI in .env:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bus-booking
   ```
5. Replace username and password
6. Remove special characters from password or URL-encode them

**Test Connection:**
```bash
# Windows
mongo "mongodb://localhost:27017/bus-booking"

# macOS/Linux
mongosh "mongodb://localhost:27017/bus-booking"
```

---

### Issue: "Port 5000 already in use"

**Symptoms:**
- "EADDRINUSE: address already in use :::5000"
- Backend won't start

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

**Mac/Linux:**
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port
PORT=5001
```

---

### Issue: ".env file not being read"

**Symptoms:**
- "MONGO_URI is undefined"
- Environment variables not loading

**Solutions:**
```bash
# Ensure dotenv is installed
npm install dotenv

# Check .env file exists in backend/
ls backend/.env

# Check .env format (no quotes needed)
# Correct:
MONGO_URI=mongodb://localhost:27017/bus-booking
# Wrong:
MONGO_URI="mongodb://localhost:27017/bus-booking"

# Make sure dotenv is loaded first in server.js
require('dotenv').config();

# Restart server
npm run dev
```

---

### Issue: "CORS error on API calls"

**Symptoms:**
- "Access to XMLHttpRequest... CORS policy"
- Frontend can't call backend

**Solutions:**

**Check backend CORS setup:**
```javascript
// In server.js, make sure this exists:
const cors = require('cors');
app.use(cors());

// Or specific origin:
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

**Check frontend API URL:**
```javascript
// In frontend/.env
VITE_API_URL=http://localhost:5000/api

// Not https, not wrong port
```

**Restart both servers:**
```bash
# Terminal 1: Kill and restart backend
npm run dev

# Terminal 2: Kill and restart frontend
npm run dev
```

---

### Issue: "Cannot find module X"

**Symptoms:**
- "Cannot find module 'express'"
- After npm install

**Solutions:**
```bash
# Reinstall dependencies
npm install

# Verify installation
npm list express

# If specific package missing
npm install express

# Check package.json has all dependencies
cat package.json
```

---

## 🎨 Frontend Issues

### Issue: "Port 3000 already in use"

**Symptoms:**
- Vite shows "address already in use"
- App won't start

**Solutions:**
```bash
# Vite automatically tries next ports (3001, 3002...)
# But if you want to free port 3000:

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

---

### Issue: "Cannot connect to backend API"

**Symptoms:**
- Network request fails
- 404 on API endpoints
- CORS error

**Solutions:**

1. **Check API URL in .env:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Verify backend is running:**
   ```bash
   # Test in another terminal
   curl http://localhost:5000/health
   ```

3. **Check browser console:**
   - Open DevTools (F12)
   - Go to Network tab
   - Try API call
   - See if request was made
   - Check response status

4. **Check CORS in backend:**
   - Ensure `app.use(cors())` exists
   - Check backend hasn't crashed

---

### Issue: "Blank page or nothing loading"

**Symptoms:**
- Browser shows blank page
- No error in console

**Solutions:**
```bash
# Check if app is running
# Terminal should show:
# ➜  Local:   http://localhost:3000/

# Verify all dependencies installed
npm list

# Check for build errors
npm run build

# Clear cache
# DevTools → Application → Clear Site Data
# Or Ctrl+Shift+Delete

# Restart dev server
npm run dev

# Hard refresh
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

### Issue: "styles not loading" (Tailwind)

**Symptoms:**
- No styling applied
- Classes not working
- Page looks plain

**Solutions:**

1. **Check index.css imported:**
   ```javascript
   // In main.jsx
   import './index.css'
   ```

2. **Verify Tailwind config:**
   ```javascript
   // tailwind.config.js
   export default {
     content: [
       './index.html',
       './src/**/*.{js,jsx}',
     ],
     // ...
   }
   ```

3. **Clear Tailwind cache:**
   ```bash
   # Delete node_modules
   rm -rf node_modules

   # Reinstall
   npm install
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

### Issue: "Context is undefined"

**Symptoms:**
- "useAuth is not a function"
- Context value is null

**Solutions:**

1. **Check Provider wraps App:**
   ```javascript
   // main.jsx
   <AuthProvider>
     <App />
   </AuthProvider>
   ```

2. **Check Provider export:**
   ```javascript
   // AuthContext.jsx
   export const useAuth = () => {
     const context = React.useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth must be used within AuthProvider');
     }
     return context;
   };
   ```

3. **Make sure using correct hook:**
   ```javascript
   // Correct
   const { user } = useAuth();
   
   // Wrong - useContext is not the same
   const { user } = React.useContext(AuthContext);
   ```

---

### Issue: "useState not working"

**Symptoms:**
- State doesn't update
- Component not re-rendering

**Solutions:**

1. **Import useState:**
   ```javascript
   import { useState } from 'react';
   ```

2. **Use correct syntax:**
   ```javascript
   // Correct
   const [count, setCount] = useState(0);
   
   // Wrong - don't mutate state
   count = 1;  // Won't work
   ```

3. **Update state correctly:**
   ```javascript
   // Correct - new value
   setCount(count + 1);
   setCount(prev => prev + 1);
   
   // Wrong - mutating
   count++;
   ```

---

### Issue: "Routing not working"

**Symptoms:**
- Pages don't change
- URL doesn't update
- Links don't work

**Solutions:**

1. **Check BrowserRouter wraps app:**
   ```javascript
   // App.jsx
   <BrowserRouter>
     <Routes>
       {/* routes */}
     </Routes>
   </BrowserRouter>
   ```

2. **Check routes are defined:**
   ```javascript
   <Route path="/" element={<Home />} />
   <Route path="/login" element={<Login />} />
   ```

3. **Use Link, not <a>:**
   ```javascript
   // Correct
   <Link to="/login">Login</Link>
   
   // Wrong - causes page reload
   <a href="/login">Login</a>
   ```

4. **Navigate in code:**
   ```javascript
   import { useNavigate } from 'react-router-dom';
   
   const navigate = useNavigate();
   navigate('/');
   ```

---

## 🔐 Authentication Issues

### Issue: "Cannot login - 401 error"

**Symptoms:**
- Login fails
- Backend returns 401
- "Invalid email or password"

**Solutions:**

1. **Check credentials:**
   - Email is correct
   - Password is correct
   - User exists in database

2. **Check backend auth logic:**
   - authController.js login function
   - User.matchPassword method

3. **Verify test user exists:**
   ```bash
   # Use MongoDB Compass or Atlas
   # Check users collection
   # See if test user exists
   ```

4. **Reset user:**
   ```bash
   # Delete user from database
   # Register new user
   # Try login again
   ```

---

### Issue: "Token not saving to localStorage"

**Symptoms:**
- Login succeeds but user logged out after reload
- localStorage is empty

**Solutions:**

1. **Check token is returned:**
   - Login response has `token` field
   - Check Network tab in DevTools

2. **Check localStorage is used:**
   ```javascript
   // authService.js
   if (response.data.token) {
     localStorage.setItem('token', response.data.token);
   }
   ```

3. **Check browser allows localStorage:**
   - Not in private/incognito mode
   - LocalStorage not disabled

4. **Verify token is sent with requests:**
   ```javascript
   // apiClient.js
   apiClient.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

---

### Issue: "Protected route not working"

**Symptoms:**
- Can access protected pages without login
- Or can't access with valid token

**Solutions:**

1. **Check ProtectedRoute component:**
   ```javascript
   const ProtectedRoute = ({ children }) => {
     const { isAuthenticated } = useAuth();
     return isAuthenticated ? children : <Navigate to="/login" />;
   };
   ```

2. **Verify route uses ProtectedRoute:**
   ```javascript
   <Route
     path="/my-bookings"
     element={
       <ProtectedRoute>
         <MyBookings />
       </ProtectedRoute>
     }
   />
   ```

3. **Check Auth context loading state:**
   ```javascript
   if (loading) {
     return <div>Loading...</div>;
   }
   ```

---

## 📡 API Issues

### Issue: "API returns 404"

**Symptoms:**
- Endpoint not found
- GET /api/buses returns 404

**Solutions:**

1. **Check endpoint exists in backend:**
   ```bash
   # Check routes/ files for endpoint
   # Example: busRoutes.js has:
   router.get('/', busController.getAllBuses);
   ```

2. **Check full URL:**
   ```javascript
   // Correct
   http://localhost:5000/api/buses
   
   // Wrong
   http://localhost:5000/buses
   http://localhost:5000/api/buses/
   ```

3. **Check HTTP method:**
   ```bash
   # GET not POST
   curl http://localhost:5000/api/buses
   ```

---

### Issue: "API returns 500 error"

**Symptoms:**
- "Internal Server Error"
- Backend console shows error

**Solutions:**

1. **Check backend console:**
   - Look for error message
   - Check stack trace

2. **Common causes:**
   - Database not connected
   - Missing required field
   - Controller has error

3. **Debug with logging:**
   ```javascript
   // In controller
   console.log('Request:', req.body);
   console.log('Error:', error.message);
   ```

4. **Test with simpler request:**
   - Remove optional fields
   - Use valid data types

---

### Issue: "Validation error"

**Symptoms:**
- 400 Bad Request
- Missing required fields

**Solutions:**

1. **Check required fields:**
   ```javascript
   // Model defines required fields
   // Controller checks them
   ```

2. **Send all required data:**
   ```json
   {
     "name": "required",
     "email": "required",
     "password": "required"
   }
   ```

3. **Validate data types:**
   ```javascript
   // String not number
   // Email format correct
   // Date valid
   ```

---

## 💾 Database Issues

### Issue: "Cannot connect to MongoDB Atlas"

**Symptoms:**
- Connection times out
- "connection refused"

**Solutions:**

1. **Check IP whitelist:**
   - MongoDB Atlas dashboard
   - Security → Network Access
   - Add your IP or 0.0.0.0 (any IP)

2. **Check connection string:**
   ```env
   # Format:
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   
   # Replace:
   # username, password, cluster name, database name
   ```

3. **Check password:**
   - No special characters or URL-encode them
   - Check username is correct

4. **Test connection:**
   ```bash
   # Use MongoDB Compass
   # Paste connection string
   # Click Connect
   ```

---

### Issue: "Duplicate key error"

**Symptoms:**
- "E11000 duplicate key error"
- Can't register same email twice

**Solutions:**

1. **Check unique fields:**
   - email is unique in User model
   - busNumber is unique in Bus model

2. **For development:**
   - Use different email each time
   - Delete user from database
   - Register with new email

3. **For production:**
   - This is correct behavior
   - Handle duplicate error in frontend

---

### Issue: "Collection doesn't exist"

**Symptoms:**
- "ns does not exist" error
- No data returned

**Solutions:**

1. **Create test data:**
   - Register users
   - Create buses/routes via API

2. **Or insert data directly:**
   - Use MongoDB Compass
   - Or MongoDB Atlas web UI
   - Insert JSON documents

---

## 🧪 Testing Issues

### Issue: "Tests not running"

**Symptoms:**
- `npm test` doesn't work
- No test framework installed

**Solutions:**

This project doesn't have tests pre-configured. To add:

```bash
npm install --save-dev jest @testing-library/react

# Create test file:
# src/components/__tests__/Navbar.test.jsx

# Run tests:
npm test
```

---

## 🎯 General Debugging

### Enable Debug Mode

**Browser:**
```javascript
// Set in console
localStorage.setItem('debug', 'true');
```

**Backend:**
```bash
# Add logging
DEBUG=* npm run dev
```

---

### Check Everything is Running

```bash
# Terminal 1: Check backend
curl http://localhost:5000/health

# Terminal 2: Check frontend builds
curl http://localhost:3000

# Terminal 3: Check MongoDB
mongo --eval "db.adminCommand('ping')"
```

---

### Review Logs

**Backend logs:**
- Terminal where `npm run dev` runs
- Check for errors

**Frontend logs:**
- Browser DevTools → Console
- Check for errors/warnings

**Database logs:**
- MongoDB Compass → Profiler
- See database operations

---

## 📋 Debugging Checklist

- [ ] All 3 servers running (MongoDB, Backend, Frontend)?
- [ ] .env files configured correctly?
- [ ] Node version compatible (v14+)?
- [ ] All npm packages installed?
- [ ] No port conflicts?
- [ ] MongoDB connection working?
- [ ] CORS enabled on backend?
- [ ] Frontend pointing to correct API URL?
- [ ] Browser cache cleared?
- [ ] Console shows no errors?

---

## 📞 Still Stuck?

1. **Check Documentation**
   - README.md
   - SETUP_GUIDE.md
   - backend/README.md
   - frontend/README.md

2. **Review Code**
   - Find similar working code
   - Compare and fix

3. **Check Error Message**
   - Google the exact error
   - Look for solution

4. **Minimal Example**
   - Create simple test case
   - Isolate the problem

5. **Restart Everything**
   - Kill all servers
   - Clear cache
   - Start fresh

---

**Remember: Most issues have simple solutions! 🎉**
