# Quick Start Guide - Snooker Club Management System

## 🚀 Getting Started in 5 Minutes

This guide will help you get the Snooker Club Management System up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

Verify installations:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
psql --version  # Should show PostgreSQL 14.x or higher
```

## Step 1: Clone the Repository

```bash
git clone https://github.com/Ammaramjad/snooker-club-management.git
cd snooker-club-management
```

## Step 2: Setup Backend

### Install Dependencies
```bash
cd server
npm install
```

### Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/snooker_club?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### Setup Database

**Option 1: Create Database Manually**
```bash
# Open PostgreSQL terminal
psql -U postgres

# Create database
CREATE DATABASE snooker_club;

# Exit
\q
```

**Option 2: Using createdb command**
```bash
createdb snooker_club
```

### Generate Prisma Client
```bash
npm run prisma:generate
```

### Run Database Migrations (When Ready)
```bash
# This will create all tables in your database
npm run prisma:migrate
```

### Start Backend Server
```bash
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📡 Socket.io is ready for real-time updates
```

## Step 3: Setup Frontend

Open a new terminal window:

```bash
cd client
npm install
```

### Configure Environment Variables
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

### Start Frontend Application
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## 🎉 You're All Set!

The dashboard should now be displaying with 6 sample tables showing different statuses.

## Testing the Features

### 1. View Table Status
- The dashboard displays all tables with color-coded status
- Green = Available
- Red = In Use
- Yellow = Reserved
- Gray = Maintenance

### 2. Change Table Status (Admin)
- Click any status button on a table card
- Watch the real-time update across all status indicators
- The summary counts update automatically

### 3. Real-Time Updates
- Open the dashboard in multiple browser windows
- Change a table status in one window
- See it update immediately in all other windows (via Socket.io)

## Common Issues & Solutions

### Issue: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change the port in server/.env
PORT=5001
```

### Issue: Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
1. Ensure PostgreSQL is running:
   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   
   # Windows
   # Start PostgreSQL service from Services app
   ```

2. Verify DATABASE_URL in `.env` is correct
3. Test connection:
   ```bash
   psql -U your_username -d snooker_club
   ```

### Issue: Module Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd server
npm run prisma:generate
npm install
```

### Issue: Tailwind CSS Not Working

**Error:** Styles not appearing

**Solution:**
```bash
cd client
npm install -D tailwindcss@3 postcss@8 autoprefixer@10
npm start
```

## Production Deployment

### Build for Production

**Backend:**
```bash
cd server
npm run build
NODE_ENV=production npm start
```

**Frontend:**
```bash
cd client
npm run build
# Deploy the build/ folder
```

### Environment Variables for Production

Update these in your production environment:
```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=very-secure-random-string
CLIENT_URL=https://your-frontend-domain.com
```

## Next Steps

Now that you have the system running, you can:

1. **Explore the Code**
   - Check out `client/src/components/dashboard/` for UI components
   - Review `server/src/server.ts` for backend logic
   - Examine `server/prisma/schema.prisma` for database schema

2. **Read Documentation**
   - See `docs/IMPLEMENTATION.md` for detailed architecture
   - Check `README.md` for feature roadmap

3. **Start Development**
   - Implement authentication system
   - Add booking API endpoints
   - Connect database to UI
   - Build additional features

## Useful Commands

### Backend
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run prisma:studio   # Open Prisma Studio (database GUI)
npm run prisma:migrate  # Run database migrations
```

### Frontend
```bash
npm start               # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## Getting Help

- **Documentation:** Check the `docs/` folder
- **Issues:** Open a GitHub issue
- **Discussions:** Use GitHub Discussions
- **Email:** support@snookerclub.com

## What's Next?

The current implementation includes:
- ✅ Real-time table status system
- ✅ Color-coded dashboard
- ✅ Socket.io integration
- ✅ Complete database schema

Coming soon:
- 🚧 Authentication system
- 🚧 Booking API with overlap prevention
- 🚧 Payment integration
- 🚧 Live timer and POS system
- 🚧 Analytics dashboard
- 🚧 And 12 more advanced features!

---

**Happy Coding! 🎱**
