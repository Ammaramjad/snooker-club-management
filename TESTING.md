# 🧪 Testing Guide - Snooker Club Management System

## Table of Contents
- [Quick Demo (No Database Required)](#quick-demo-no-database-required)
- [Running Tests](#running-tests)
- [Manual Testing](#manual-testing)
- [Testing Features](#testing-features)

---

## Quick Demo (No Database Required)

Want to see the system in action immediately? Follow these steps:

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies (in a new terminal)
cd client
npm install
```

### 2. Start Backend Server

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📡 Socket.io is ready for real-time updates
```

### 3. Start Frontend Application

Open a **new terminal** and run:

```bash
cd client
npm start
```

The browser will automatically open at `http://localhost:3000`

### 4. See It in Action!

The dashboard will display **6 sample tables** with different statuses:
- 🟢 Table 1 & 5 - Available
- 🔴 Table 2 & 6 - In Use  
- 🟡 Table 3 - Reserved
- ⚫ Table 4 - Maintenance

**Try changing a table status:**
1. Click any status button on a table card
2. Watch it update in real-time!
3. Open in multiple browser windows to see live synchronization

---

## Running Tests

### Frontend Tests

```bash
cd client
npm test
```

**Run all tests:**
```bash
npm test -- --watchAll=false
```

**Run tests with coverage:**
```bash
npm test -- --coverage --watchAll=false
```

### Backend Tests

```bash
cd server
npm test
```

_(Note: Backend tests will be added in future phases)_

---

## Manual Testing

### Test Real-Time Updates

1. **Open Multiple Browser Windows:**
   ```bash
   # Window 1: http://localhost:3000
   # Window 2: http://localhost:3000 (new window/tab)
   ```

2. **Change Table Status:**
   - In Window 1, click a status button on any table
   - Watch Window 2 update automatically!

3. **Verify Status Counts:**
   - Check that the summary bar updates correctly
   - Example: Change Table 1 from Available → In Use
   - "Available" count should decrease by 1
   - "In Use" count should increase by 1

### Test Different Status Types

Test all 4 status changes:

| Status | Color | Icon | Expected Behavior |
|--------|-------|------|-------------------|
| Available | Green | 🟢 | Table ready for booking |
| In Use | Red | 🔴 | Table currently occupied |
| Reserved | Yellow | 🟡 | Table has a booking |
| Maintenance | Gray | ⚫ | Table under maintenance |

### Test Responsive Design

Check the dashboard on different screen sizes:
- **Mobile** (< 768px): 1 column layout
- **Tablet** (768-1024px): 2 column layout
- **Desktop** (> 1024px): 3 column layout

Use browser dev tools to test:
```
Chrome: F12 → Toggle Device Toolbar
Safari: Develop → Enter Responsive Design Mode
```

---

## Testing Features

### ✅ Real-Time Table Status

**Test Steps:**
1. Start both backend and frontend
2. Open dashboard in browser
3. Verify all 6 tables are displayed
4. Click "IN_USE" button on Table 1 (currently Available)
5. Verify:
   - ✅ Table 1 card changes to red background
   - ✅ Status badge shows "IN_USE"
   - ✅ Summary count updates (Available: 2→1, In Use: 2→3)
   - ✅ IN_USE button becomes disabled
   - ✅ Other status buttons remain clickable

**Expected Result:** Status changes instantly with visual feedback

### ✅ Socket.io Real-Time Sync

**Test Steps:**
1. Open dashboard in 2 browser windows side by side
2. In Window 1, change Table 2 status to "MAINTENANCE"
3. Verify in Window 2:
   - ✅ Table 2 updates automatically without refresh
   - ✅ Summary counts update in both windows
   - ✅ No delay or lag

**Expected Result:** Both windows stay synchronized in real-time

### ✅ Optimistic UI Updates

**Test Steps:**
1. Open browser Network tab (F12 → Network)
2. Throttle network to "Slow 3G"
3. Click a status change button
4. Observe:
   - ✅ UI updates immediately (optimistic)
   - ✅ Socket event sent to server
   - ✅ Server broadcasts to all clients

**Expected Result:** UI feels instant even on slow connections

---

## Build Testing

### Test Frontend Build

```bash
cd client
npm run build
```

**Expected Output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:
  75.3 kB  build/static/js/main.xxx.js
  2.91 kB  build/static/css/main.xxx.css
```

**Verify Build:**
```bash
# Serve the built files
npx serve -s build
```

Visit `http://localhost:3000` to test the production build.

### Test Backend Build

```bash
cd server
npm run build
```

**Expected Output:**
```
> server@1.0.0 build
> tsc

(no errors)
```

**Verify Build:**
```bash
# Check dist folder was created
ls dist/
# Should show: config/  server.js
```

---

## Testing Checklist

Before submitting changes, verify:

- [ ] Frontend runs without errors (`npm start`)
- [ ] Backend runs without errors (`npm run dev`)
- [ ] All tests pass (`npm test`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend builds successfully (`npm run build`)
- [ ] Dashboard displays all 6 tables
- [ ] Status changes work for all 4 status types
- [ ] Real-time updates work across multiple windows
- [ ] Summary counts update correctly
- [ ] No console errors in browser
- [ ] No errors in terminal/server logs

---

## Troubleshooting

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### Module Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd server
npm run prisma:generate
npm install
```

### Tailwind Styles Not Loading

**Error:** Styles not appearing in UI

**Solution:**
```bash
cd client
# Verify Tailwind version
npm list tailwindcss
# Should be v3.x.x

# Restart dev server
npm start
```

### WebSocket Connection Failed

**Error:** `WebSocket connection to 'ws://localhost:5000' failed`

**Solution:**
1. Ensure backend server is running
2. Check backend logs for errors
3. Verify `REACT_APP_API_URL` in `client/.env`

---

## Performance Testing

### Load Testing

Test with multiple concurrent users:

```bash
# Install artillery (load testing tool)
npm install -g artillery

# Create test script (test-load.yml)
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "View Dashboard"
    flow:
      - get:
          url: "/"
```

Run load test:
```bash
artillery run test-load.yml
```

### Monitor Performance

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with dashboard (change statuses)
5. Stop recording
6. Analyze:
   - Frame rate should stay > 30fps
   - JavaScript execution < 100ms
   - No memory leaks

---

## Test Coverage

### Current Coverage

Run coverage report:
```bash
cd client
npm test -- --coverage --watchAll=false
```

**Current Status:**
- App.tsx: ✅ 100% coverage
- TableDashboard.tsx: ⚠️ Needs tests
- TableCard.tsx: ⚠️ Needs tests

### Adding Tests

Example test for TableCard:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import TableCard from './TableCard';
import { TableStatus } from '../../types';

test('changes status when button clicked', () => {
  const mockTable = {
    id: '1',
    tableNumber: '1',
    status: TableStatus.AVAILABLE,
    hourlyRate: 15,
    // ... other fields
  };
  
  const mockOnStatusChange = jest.fn();
  
  render(
    <TableCard 
      table={mockTable} 
      onStatusChange={mockOnStatusChange}
      isAdmin={true}
    />
  );
  
  const inUseButton = screen.getByText(/IN_USE/);
  fireEvent.click(inUseButton);
  
  expect(mockOnStatusChange).toHaveBeenCalledWith('1', TableStatus.IN_USE);
});
```

---

## Automated Testing (Future)

### E2E Tests with Playwright

```bash
# Install Playwright (future)
npm install -D @playwright/test

# Run E2E tests
npx playwright test
```

### Integration Tests

```bash
# Test API endpoints (future)
npm run test:integration
```

---

## Need Help?

- **Documentation:** Check `docs/` folder
- **Quick Start:** See `docs/QUICK_START.md`
- **Issues:** Open a GitHub issue
- **Email:** support@snookerclub.com

---

**Happy Testing! 🎱**
