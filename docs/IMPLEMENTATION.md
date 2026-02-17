# Snooker Club Management System - Implementation Documentation

## Overview
This is a comprehensive snooker club management system built with modern web technologies, designed to handle all aspects of running a snooker club from booking to billing.

## Current Implementation Status

### ✅ Completed Features (Phase 1 - Core System)

#### 1. Real-Time Table Status System
The core feature of the system is now fully implemented with the following capabilities:

**4 Table Status Types:**
- 🟢 **Available (Green)** - Table is ready for booking
- 🔴 **In Use (Red)** - Table is currently occupied
- 🟡 **Reserved (Yellow)** - Table has been booked for a specific time
- ⚫ **Maintenance (Black/Gray)** - Table is under maintenance

**Features:**
- Real-time status updates using Socket.io
- Color-coded visual dashboard
- Admin controls for manual status changes
- Automatic status summary with counts
- Responsive design (mobile, tablet, desktop)
- Clean and intuitive UI with Tailwind CSS

**Technical Implementation:**
- Frontend: React 18 with TypeScript
- Backend: Node.js with Express.js and Socket.io
- Real-time communication via WebSocket
- Optimistic UI updates for instant feedback

#### 2. Project Structure
```
snooker-club-management/
├── client/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       ├── TableCard.tsx       # Individual table card component
│   │   │       └── TableDashboard.tsx  # Main dashboard component
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript type definitions
│   │   └── App.tsx
│   └── package.json
│
├── server/                    # Node.js TypeScript backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts            # Prisma client configuration
│   │   └── server.ts                  # Express server with Socket.io
│   ├── prisma/
│   │   └── schema.prisma              # Complete database schema
│   └── package.json
│
└── README.md
```

#### 3. Database Schema
Complete database schema designed with Prisma ORM including:
- **User** - Customer and staff accounts with role-based access
- **Branch** - Multi-branch support
- **Table** - Snooker tables with status tracking
- **Booking** - Advanced booking system
- **Payment** - Payment processing with multiple methods
- **Invoice** - Professional bill generation
- **Product** - POS items for snacks/cafe
- **Order** - Order management
- **Membership** - Membership tiers and benefits
- **Coupon** - Discount and promotion system
- **Tournament** - Tournament management
- **Match** - Match tracking and scoring
- **Rating** - Customer feedback system
- **LoyaltyPoint** - Gamification and rewards
- **Incident** - Damage and incident tracking
- **Notification** - Multi-channel notifications
- **AuditLog** - System activity logging

All 17 models from the requirements are defined and ready for implementation.

#### 4. Technology Stack

**Frontend:**
- React 18.3.1 with TypeScript
- Tailwind CSS v3 for styling
- Socket.io-client for real-time updates
- Axios for API calls
- React Query for state management (ready to implement)
- React Router for navigation (ready to implement)

**Backend:**
- Node.js with Express.js 5.2.1
- TypeScript for type safety
- Socket.io 4.8.3 for WebSockets
- Prisma ORM 7.4.0 with PostgreSQL
- JWT for authentication (ready to implement)
- Bcrypt for password hashing (ready to implement)
- CORS enabled

**Development Tools:**
- TypeScript strict mode enabled
- Nodemon for hot reloading
- React Scripts for development server
- ESM/CommonJS module support

## How to Run the Application

### Prerequisites
- Node.js v18 or higher
- PostgreSQL v14 or higher
- npm or yarn

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run prisma:generate

# Run migrations (when database is ready)
npm run prisma:migrate

# Start development server
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend Setup
```bash
cd client
npm install
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start development server
npm start
```
Client runs on `http://localhost:3000`

## Real-Time Features

### Socket.io Events

**Client → Server:**
- `table:statusChange` - Emit when admin changes table status
  ```typescript
  socket.emit('table:statusChange', {
    tableId: string,
    status: 'AVAILABLE' | 'IN_USE' | 'RESERVED' | 'MAINTENANCE'
  });
  ```

**Server → Client:**
- `table:statusUpdated` - Broadcast when table status changes
  ```typescript
  socket.on('table:statusUpdated', (data: {
    tableId: string,
    status: TableStatus
  }) => {
    // Update table status in UI
  });
  ```

### Optimistic Updates
The UI implements optimistic updates, meaning:
1. When admin clicks a status button, the UI updates immediately
2. Socket event is emitted to server
3. Server broadcasts to all connected clients
4. All dashboards update in real-time without page refresh

## UI/UX Features

### Dashboard Components

**TableCard Component:**
- Displays individual table information
- Color-coded based on status
- Shows table number and hourly rate
- Admin controls with 4 status buttons
- Displays maintenance notes when applicable
- Responsive card design with hover effects

**TableDashboard Component:**
- Overview section with status counts
- Grid layout of all table cards
- Real-time status summary
- Socket.io connection management
- Responsive grid (1 column mobile, 2 tablet, 3 desktop)

### Color Scheme
```
Available:    Green (#22c55e)   - bg-green-100, border-green-500
In Use:       Red (#ef4444)      - bg-red-100, border-red-500
Reserved:     Yellow (#eab308)   - bg-yellow-100, border-yellow-500
Maintenance:  Gray (#6b7280)     - bg-gray-100, border-gray-500
```

## API Endpoints (Ready for Implementation)

### Tables
- `GET /api/tables` - Get all tables
- `GET /api/tables/:id` - Get table by ID
- `PUT /api/tables/:id/status` - Update table status
- `POST /api/tables` - Create new table (admin)
- `PUT /api/tables/:id` - Update table details (admin)
- `DELETE /api/tables/:id` - Delete table (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `POST /api/bookings/:id/start` - Start game timer
- `POST /api/bookings/:id/end` - End game and generate bill

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Next Steps (Roadmap)

### Phase 1 - Remaining Core Features
1. **Database Setup**
   - PostgreSQL database creation
   - Run Prisma migrations
   - Seed initial data

2. **Authentication System**
   - User registration and login
   - JWT token generation and validation
   - Role-based middleware
   - Protected routes

3. **Table Management API**
   - Complete CRUD operations
   - Status update endpoints
   - Database integration

4. **Booking System**
   - Booking creation with overlap validation
   - Time slot availability checking
   - Booking modification and cancellation
   - Booking history

5. **Admin Dashboard Enhancement**
   - User management
   - Table management
   - Booking overview
   - Quick actions

### Phase 2 - Business Features
1. Payment Integration (Stripe)
2. Live Timer System with POS
3. Revenue Analytics Dashboard
4. Invoice Generation (PDF)
5. Snack/Cafe POS System

### Phase 3 - Advanced Features
1. Membership System
2. Tournament Mode
3. Multi-branch Support
4. WhatsApp/SMS Notifications
5. Rating & Feedback
6. Gamification & Loyalty

## Security Considerations

### Implemented
- CORS configuration
- Environment variables for sensitive data
- TypeScript for type safety
- Input sanitization via Prisma

### To Implement
- JWT authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Rate limiting
- Input validation middleware
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection

## Performance Optimizations

### Current
- Optimistic UI updates
- Component-level state management
- Efficient Socket.io event handling

### Planned
- React Query for caching
- Pagination for large datasets
- Lazy loading for routes
- Image optimization
- Database indexing (already in schema)
- Redis for session management

## Testing Strategy

### Unit Tests (To Implement)
- Component tests with Jest and React Testing Library
- Service tests for business logic
- Utility function tests

### Integration Tests (To Implement)
- API endpoint tests
- Database operation tests
- Authentication flow tests

### E2E Tests (To Implement)
- User journey tests with Cypress/Playwright
- Real-time feature tests
- Cross-browser testing

## Deployment

### Development
- Frontend: `npm start` (port 3000)
- Backend: `npm run dev` (port 5000)
- Hot reload enabled for both

### Production Build
```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
# Deploy build/ folder to CDN or static hosting
```

### Docker (To Implement)
- Dockerfile for backend
- Dockerfile for frontend
- docker-compose.yml for full stack
- PostgreSQL container

### Cloud Deployment (Recommended)
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Backend: AWS EC2, Heroku, or DigitalOcean
- Database: AWS RDS, Heroku Postgres, or DigitalOcean Managed Database
- Socket.io: Ensure WebSocket support in hosting platform

## Monitoring & Logging

### To Implement
- Error tracking (Sentry)
- Application monitoring (New Relic, DataDog)
- Log aggregation (ELK Stack, CloudWatch)
- Uptime monitoring
- Performance metrics

## Contributing

### Code Style
- TypeScript strict mode
- ESLint and Prettier (to be configured)
- Component naming conventions
- File structure conventions

### Git Workflow
- Feature branches
- Descriptive commit messages
- Pull request reviews
- Semantic versioning

## License
ISC

## Support
For questions or issues, please open a GitHub issue or contact the development team.

---

**Last Updated:** 2026-02-17
**Version:** 1.0.0-alpha
**Status:** Phase 1 - Core Features In Progress
