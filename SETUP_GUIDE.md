# Complete Setup Instructions - MERN Bus Booking System

This guide provides step-by-step instructions to get the Bus Ticket Booking System running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** - Download from https://nodejs.org/
   - Recommended: LTS version (v16+)
   - Verify installation:
   ```bash
   node --version
   npm --version
   ```

2. **MongoDB** - Choose one option:
   - **Local Installation**: https://www.mongodb.com/try/download/community
   - **MongoDB Atlas Cloud**: https://www.mongodb.com/cloud/atlas
   - Recommended: Start with Atlas for easier setup

3. **Git** - Download from https://git-scm.com/
   - Verify installation:
   ```bash
   git --version
   ```

4. **Code Editor** - Recommended:
   - Visual Studio Code: https://code.visualstudio.com/
   - Install Extensions:
     - ES7+ React/Redux/React-Native snippets
     - Prettier
     - ESLint
     - Thunder Client (for API testing)

## 🔧 MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Sign Up"
   - Fill in email, password, and project details

2. **Create a Project**
   - Click "Create a New Project"
   - Name it "Bus-Booking"

3. **Create a Cluster**
   - Click "Create a Cluster"
   - Choose "FREE" tier
   - Select region closest to you
   - Click "Create Cluster"
   - Wait 5-10 minutes for cluster creation

4. **Add User**
   - Click "Database Access"
   - Click "Add a New Database User"
   - Username: `busadmin`
   - Password: Create strong password
   - Click "Add User"

5. **Add IP Whitelist**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get Connection String**
   - Click "Clusters" → "Connect"
   - Click "Connect your application"
   - Copy connection string
   - Replace `<username>` and `<password>` with your credentials
   - Replace `myFirstDatabase` with `bus-booking`

### Option 2: Local MongoDB

1. **Install MongoDB Community Edition**
   - Windows: Download MSI installer
   - Mac: Use Homebrew
   - Linux: Follow official docs

2. **Start MongoDB Service**
   - Windows: `mongod` in Command Prompt
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Connection String**
   ```
   mongodb://localhost:27017/bus-booking
   ```

## 🚀 Project Setup

### Step 1: Clone or Download Project

```bash
# If you have Git
git clone <repository-url>
cd bus-booking-app

# Or extract downloaded ZIP file
```

### Step 2: Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs:
   - express
   - mongoose
   - dotenv
   - cors
   - bcryptjs
   - jsonwebtoken
   - morgan
   - nodemon (dev)

3. **Configure Environment Variables**
   
   The `.env` file is already created. Edit it:
   ```bash
   # Open .env file in your editor
   ```
   
   Update values:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://busadmin:password@cluster.mongodb.net/bus-booking
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

   **Important**: 
   - Replace `password` with your MongoDB password
   - Replace connection string if using local MongoDB
   - Keep JWT_SECRET secure and change in production

4. **Verify Backend**
   ```bash
   npm start
   # Expected output: "Server running on port 5000"
   ```

5. **Keep Backend Running**
   ```bash
   npm run dev
   # This runs with auto-reload on file changes
   ```

### Step 3: Frontend Setup

1. **Open new terminal/command prompt**

2. **Navigate to frontend**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   This installs:
   - react
   - react-dom
   - react-router-dom
   - axios
   - react-hot-toast
   - tailwindcss
   - And more...

4. **Configure Environment Variables**
   
   The `.env` file is already created. Verify it has:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start Frontend**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   VITE v4.4.9  ready in 234 ms

   ➜  Local:   http://localhost:3000/
   ➜  press h to show help
   ```

6. **Browser Opens**
   - Application opens at http://localhost:3000
   - If not, manually open the URL

## ✅ Verification Checklist

- [ ] Node.js installed and verified
- [ ] MongoDB running and accessible
- [ ] Backend dependencies installed
- [ ] .env files configured correctly
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Application opens in browser
- [ ] No console errors

## 🧪 Testing the Application

### 1. Test Registration

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: password123
4. Click "Register"
5. Should see success message

### 2. Test Login

1. Click "Logout" (if already logged in)
2. Click "Login"
3. Enter credentials:
   - Email: john@example.com
   - Password: password123
4. Click "Login"
5. Should redirect to home page

### 3. Test API with Postman (Optional)

1. Download Postman: https://www.postman.com/downloads/

2. **Test Register Endpoint**
   - Method: POST
   - URL: http://localhost:5000/api/auth/register
   - Body (JSON):
   ```json
   {
     "name": "Jane Doe",
     "email": "jane@example.com",
     "phone": "9876543211",
     "password": "password123"
   }
   ```
   - Click "Send"
   - Should return token and user data

3. **Test Login Endpoint**
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body (JSON):
   ```json
   {
     "email": "jane@example.com",
     "password": "password123"
   }
   ```
   - Click "Send"

## 🚪 Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend App | http://localhost:3000 | User interface |
| Backend API | http://localhost:5000 | API endpoints |
| API Health Check | http://localhost:5000/health | Verify backend running |
| MongoDB Atlas | https://cloud.mongodb.com | Database management |

## 🔑 Default Admin Credentials

For testing admin features, register with:
```
Email: admin@example.com
Password: admin123
```

Then update the user role in MongoDB to `admin`:

1. Go to MongoDB Atlas
2. Click "Collections"
3. Find User collection
4. Update user: Set `role` field to `admin`

## 📱 First Steps After Setup

1. **Explore Home Page**
   - See features overview
   - Click "Search Buses"

2. **Search Buses**
   - Enter any city names
   - Select a date
   - Click "Search Buses"
   - Note: No buses yet (need to add via admin)

3. **Create Test Data (Admin)**
   - As admin user, you can add buses and routes
   - Then users can search and book

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB is running
- Check connection string in .env
- For Atlas, verify IP whitelist includes your machine
- Try connection string in MongoDB Compass

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in backend/.env to 5001
- Or kill process using port 5000

### Issue: "Port 3000 already in use"
**Solution:**
- Vite automatically tries next port (3001, 3002...)
- Or kill process using port 3000

### Issue: "Cannot GET /api/routes/search"
**Solution:**
- Ensure backend server is running
- Check API URL in frontend/.env
- Verify endpoint exists in backend

### Issue: "401 Unauthorized"
**Solution:**
- User not logged in
- Token expired - logout and login again
- Check token in localStorage (DevTools)

### Issue: "CORS error in browser"
**Solution:**
- Verify backend has CORS enabled
- Restart backend server
- Check VITE_API_URL in .env

### Issue: "npm install fails"
**Solution:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again
- Try `npm install --legacy-peer-deps`

## 🔄 Daily Workflow

**Every time you start development:**

1. **Terminal 1 - Start MongoDB** (if using local)
   ```bash
   mongod
   ```

2. **Terminal 2 - Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   Wait for: "Server running on port 5000"

3. **Terminal 3 - Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Wait for: Local running at http://localhost:3000

4. **Open Browser**
   - Go to http://localhost:3000
   - Application ready to use

## 📚 Project Documentation

- Main README: [README.md](../README.md)
- Backend Docs: [backend/README.md](../backend/README.md)
- Frontend Docs: [frontend/README.md](../frontend/README.md)

## 🔐 Security Notes

1. **Never commit .env files** to Git
2. **Change JWT_SECRET** in production
3. **Use strong passwords** for MongoDB
4. **Enable IP whitelist** on MongoDB Atlas
5. **Use HTTPS** in production
6. **Keep dependencies updated**: `npm update`

## 📦 Project Dependencies Summary

### Backend
- express (API framework)
- mongoose (MongoDB ODM)
- bcryptjs (Password hashing)
- jsonwebtoken (Authentication)
- cors (Cross-origin)
- morgan (Logging)
- dotenv (Environment variables)

### Frontend
- react (UI library)
- react-router-dom (Routing)
- axios (HTTP client)
- react-hot-toast (Notifications)
- tailwindcss (Styling)
- react-icons (Icons)

## 💡 Tips & Tricks

1. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear cookies and cache
   - Reload page

2. **Clear localStorage**
   - Open DevTools (F12)
   - Go to Application
   - Delete all localStorage items

3. **Check Network Requests**
   - Open DevTools (F12)
   - Go to Network tab
   - Perform an action
   - See API calls

4. **Enable API Logging**
   - Backend uses Morgan for logging
   - Check terminal for API logs
   - Useful for debugging

5. **Database Inspection**
   - Use MongoDB Compass (GUI client)
   - Or use MongoDB Atlas web interface
   - View, edit, and test data

## ✨ Next Steps

After successful setup:

1. **Explore the Code**
   - Read component files
   - Understand file structure
   - Study API endpoints

2. **Add Features**
   - Payment integration
   - Email notifications
   - Advanced filtering

3. **Improve UI**
   - Add more components
   - Better seat layout
   - Dark mode

4. **Deploy**
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify
   - Set up CI/CD

## 📞 Need Help?

1. Check the README files in each folder
2. Review console errors (DevTools)
3. Check server logs (terminal)
4. Read API documentation
5. Test with Postman

---

**Congratulations! You have successfully set up the MERN Bus Booking System! 🎉**

Now you can:
- Register and login
- Search for buses
- Make bookings
- Manage bookings
- And much more!

Happy coding! 🚀
