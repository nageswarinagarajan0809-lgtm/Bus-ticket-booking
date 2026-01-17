# Bus Ticket Booking System - Frontend

A modern React + Vite frontend for the bus ticket booking system with a beautiful UI built with Tailwind CSS.

## Features

- **User Authentication**: Register, login, logout
- **Bus Search**: Search buses by route and date
- **Interactive Seat Selection**: Visual seat layout
- **Booking Management**: View and cancel bookings
- **Admin Panel**: Manage buses and routes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Notifications**: Toast notifications for user feedback
- **State Management**: Context API for global state

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Login.jsx           # Login form
│   │   └── Register.jsx        # Registration form
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── SearchBuses.jsx     # Bus search page
│   │   ├── MyBookings.jsx      # User bookings
│   │   └── NotFound.jsx        # 404 page
│   ├── services/
│   │   ├── apiClient.js        # Axios instance
│   │   ├── authService.js      # Auth API calls
│   │   ├── busService.js       # Bus API calls
│   │   ├── routeService.js     # Route API calls
│   │   └── bookingService.js   # Booking API calls
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth context
│   │   └── BookingContext.jsx  # Booking context
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── .eslintrc.json              # ESLint config
├── .prettierrc.json            # Prettier config
├── index.html                  # HTML template
└── package.json                # Dependencies
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   App will open at `http://localhost:3000`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Pages & Components

### Home Page (`/`)
- Hero section with CTA
- Features showcase
- Quick access to search

### Search Buses (`/search`)
- Search form (from, to, date)
- List of available buses
- Booking button for each route
- Real-time search results

### My Bookings (`/my-bookings`) - Protected
- User's booking history
- Booking details and status
- Cancel booking option
- Booking status indicator

### Login (`/login`)
- Email and password fields
- Form validation
- Error handling
- Link to registration

### Register (`/register`)
- Name, email, phone, password fields
- Password confirmation
- Form validation
- Link to login

### Navbar
- Navigation links
- User menu (if authenticated)
- Responsive mobile menu
- Admin links (if admin role)

## Context API Usage

### AuthContext
```javascript
import { useAuth } from './context/AuthContext';

const { user, isAuthenticated, loading, login, register, logout } = useAuth();
```

### BookingContext
```javascript
import { useBooking } from './context/BookingContext';

const { bookingData, updateBookingData, clearBookingData } = useBooking();
```

## Services

### API Client Setup
```javascript
import apiClient from './services/apiClient';

// Automatically includes JWT token from localStorage
```

### Example API Call
```javascript
import authService from './services/authService';

const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

## Styling

### Tailwind CSS Classes

Custom utility classes in `index.css`:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger button
- `.card` - Card component
- `.input-field` - Input field

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Danger: Red (#EF4444)

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token automatically added to all API requests
5. User data stored in AuthContext
6. Protected routes check authentication
7. Logout clears token and user data

## Error Handling

```javascript
try {
  const response = await apiClient.get('/endpoint');
} catch (error) {
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
}
```

## Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Uses Tailwind's responsive prefixes: `md:`, `lg:`, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Building for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder. Deploy using:
- Vercel
- Netlify
- GitHub Pages
- Traditional hosting

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

## Code Quality

### ESLint
```bash
npm run lint
```

### Prettier
```bash
npm run format
```

## Performance Optimization

- Code splitting with React Router
- Lazy loading components
- Image optimization
- CSS minification via Tailwind
- Tree shaking with Vite

## Development Tips

1. **Hot Module Replacement**: Changes reflect instantly
2. **Browser DevTools**: React DevTools extension recommended
3. **API Testing**: Use Postman for backend testing
4. **Local Storage**: Check DevTools → Application → Local Storage

## Common Issues

### CORS Error
- Ensure backend has CORS enabled
- Check VITE_API_URL in .env

### 401 Unauthorized
- Token might be expired
- Try logging in again
- Check localStorage for token

### API Connection Failed
- Ensure backend is running
- Check backend URL in .env
- Verify network connectivity

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to hosting provider
```

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
