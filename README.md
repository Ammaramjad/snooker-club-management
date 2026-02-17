# 🎱 Snooker Club Management System

A comprehensive, production-ready snooker club management system with real-time table status, payment integration, POS system, analytics, membership, tournaments, and multi-branch support.

---

## 🚀 Quick Start (2 Minutes)

**See the system in action immediately** - No database required for the demo!

```bash
# 1. Install backend dependencies
cd server
npm install
npm run dev

# 2. In a NEW terminal, install and start frontend
cd client
npm install
npm start
```

**That's it!** The dashboard will open at `http://localhost:3000` showing 6 tables with real-time status updates.

**Try it:** Click any status button to see instant updates! 🎯

### 📚 Documentation
- 📖 **[RUN.md](RUN.md)** - Simplest run commands (30 seconds)
- 📖 **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Visual step-by-step with diagrams  
- 📖 **[TESTING.md](TESTING.md)** - Complete testing guide
- 📖 **[docs/QUICK_START.md](docs/QUICK_START.md)** - Full setup with database

---

## 🌟 Features

### Phase 1 - Core System ✅ (In Progress)
- ✅ **Real-Time Table Status System**
  - 4 status types: 🟢 Available, 🔴 In Use, 🟡 Reserved, ⚫ Maintenance
  - Admin manual status control
  - Auto-switching based on booking time
  - Real-time updates via Socket.io
  - Visual dashboard with color-coded status
  
- 🚧 **Advanced Booking System** (Planned)
  - Booking overlap prevention
  - Time slot validation
  - Multi-table booking support
  - Booking modification and cancellation
  - Booking history tracking

- 🚧 **Admin Dashboard** (Planned)
  - Overview of all bookings
  - Table management
  - User management
  - Quick actions

### Phase 2 - Business System (Planned)
- Payment Integration (Stripe)
- Live Timer System with Overtime Handling
- POS System for Snacks/Cafe
- Revenue & Analytics Dashboard
- Bill/Invoice Generator

### Phase 3 - Growth Features (Planned)
- Membership System
- Discount & Coupon System
- Advanced Booking Calendar
- WhatsApp/SMS Notifications
- Tournament Mode
- Rating & Feedback
- Gamification & Loyalty Points
- Multi-Branch Support
- Staff Roles & Permissions
- CCTV Snapshot/Evidence Logging
- Security Features

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS
- Socket.io-client for real-time updates
- React Query for state management
- Axios for API calls

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL database
- Prisma ORM
- Socket.io for WebSockets
- JWT for authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Ammaramjad/snooker-club-management.git
cd snooker-club-management
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env
# Edit .env with your database credentials and other settings
```

4. **Setup Database**
```bash
# Create PostgreSQL database
createdb snooker_club

# Run Prisma migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

5. **Setup Frontend**
```bash
cd ../client
npm install
```

6. **Create .env file for client**
```bash
# client/.env
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

**Start Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Start Frontend:**
```bash
cd client
npm start
```
Client will run on `http://localhost:3000`

### Production Mode

**Build Backend:**
```bash
cd server
npm run build
npm start
```

**Build Frontend:**
```bash
cd client
npm run build
```

## 📁 Project Structure

```
snooker-club-management/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── admin/       # Admin components
│   │   │   ├── booking/     # Booking components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   └── ...
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── hooks/           # Custom hooks
│   │   └── App.tsx
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   ├── config/           # Configuration
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── package.json
│
├── shared/                    # Shared types/utilities
├── docs/                      # Documentation
└── README.md
```

## 🗄️ Database Schema

The system uses PostgreSQL with Prisma ORM. Key models include:

- **User** - Customer and staff accounts
- **Branch** - Multiple branch support
- **Table** - Snooker tables with status
- **Booking** - Table bookings
- **Payment** - Payment processing
- **Invoice** - Bill generation
- **Product** - POS items
- **Membership** - Membership plans
- **Tournament** - Tournament management
- **Rating** - Customer feedback
- **LoyaltyPoint** - Gamification
- **Incident** - Damage tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tables
- `GET /api/tables` - Get all tables
- `GET /api/tables/:id` - Get table by ID
- `PUT /api/tables/:id/status` - Update table status

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🔄 Real-time Events

The system uses Socket.io for real-time updates:

- `table:statusChange` - Emit when table status changes
- `table:statusUpdated` - Listen for table status updates
- `timer:update` - Emit timer updates
- `timer:updated` - Listen for timer updates
- `booking:update` - Emit booking changes
- `booking:updated` - Listen for booking changes

## 🎨 UI/UX Features

- **Color-coded table status**
  - 🟢 Green = Available
  - 🔴 Red = In Use
  - 🟡 Yellow = Reserved
  - ⚫ Gray = Maintenance

- **Responsive design** - Works on mobile, tablet, and desktop
- **Real-time updates** - No page refresh needed
- **Admin controls** - Quick status change buttons
- **Status summary** - Dashboard showing counts for each status

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation
- SQL injection prevention (Prisma ORM)
- CORS configuration
- Rate limiting (planned)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/snooker_club
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_...
TWILIO_ACCOUNT_SID=...
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

**Ammar Amjad**

## 🆘 Support

For support, email support@snookerclub.com or open an issue in the repository.

## 🗺️ Roadmap

- [x] Project setup and structure
- [x] Database schema design
- [x] Real-time table status system
- [ ] Authentication system
- [ ] Booking system with overlap prevention
- [ ] Payment integration (Stripe)
- [ ] Live timer and POS system
- [ ] Analytics dashboard
- [ ] Invoice generation
- [ ] Membership system
- [ ] Tournament mode
- [ ] Multi-branch support
- [ ] Mobile app (future)

## 📸 Screenshots

### Table Dashboard
![Table Dashboard](docs/screenshots/dashboard.png)

*Real-time table status monitoring with color-coded cards*

---

**Built with ❤️ for snooker clubs worldwide**
