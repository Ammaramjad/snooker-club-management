# 🎯 Visual Quick Start Guide

## How to Run the Snooker Club Management System

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP-BY-STEP GUIDE                       │
└─────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════╗
║  TERMINAL 1: Backend Server                               ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  $ cd server                                              ║
║  $ npm install                                            ║
║  $ npm run dev                                            ║
║                                                           ║
║  ✅ Output:                                               ║
║  🚀 Server is running on port 5000                        ║
║  📡 Socket.io is ready for real-time updates              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

                        ⬇️

╔═══════════════════════════════════════════════════════════╗
║  TERMINAL 2: Frontend Application                         ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  $ cd client                                              ║
║  $ npm install                                            ║
║  $ npm start                                              ║
║                                                           ║
║  ✅ Output:                                               ║
║  Compiled successfully!                                   ║
║  webpack compiled with 0 warnings                         ║
║                                                           ║
║  🌐 Browser opens: http://localhost:3000                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

                        ⬇️

┌─────────────────────────────────────────────────────────────┐
│  🎉 SUCCESS! Dashboard is now running                      │
│                                                             │
│  You should see:                                            │
│  • 6 tables with different status colors                   │
│  • Status summary bar at the top                           │
│  • Admin controls on each table card                       │
│                                                             │
│  Try clicking a status button to see real-time updates! 🎯 │
└─────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
                    WHAT YOU'LL SEE
═══════════════════════════════════════════════════════════════

┌──────────────────── Browser: http://localhost:3000 ────────────────────┐
│                                                                         │
│  🎱 Snooker Club Dashboard                                              │
│  Real-time table status monitoring                                     │
│                                                                         │
│  ┌──────────┬──────────┬──────────┬──────────┐                        │
│  │ 🟢       │ 🔴       │ 🟡       │ ⚫       │                        │
│  │Available │  In Use  │ Reserved │Maintenance│                        │
│  │    2     │    2     │    1     │    1     │                        │
│  └──────────┴──────────┴──────────┴──────────┘                        │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ 🟢 Table 1   │  │ 🔴 Table 2   │  │ 🟡 Table 3   │                │
│  │ AVAILABLE    │  │ IN_USE       │  │ RESERVED     │                │
│  │ $15/hour     │  │ $15/hour     │  │ $15/hour     │                │
│  │ [🟢][🔴]     │  │ [🟢][🔴]     │  │ [🟢][🔴]     │                │
│  │ [🟡][⚫]     │  │ [🟡][⚫]     │  │ [🟡][⚫]     │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ ⚫ Table 4    │  │ 🟢 Table 5   │  │ 🔴 Table 6   │                │
│  │ MAINTENANCE  │  │ AVAILABLE    │  │ IN_USE       │                │
│  │ $15/hour     │  │ $20/hour     │  │ $20/hour     │                │
│  │ Replacing... │  │ [🟢][🔴]     │  │ [🟢][🔴]     │                │
│  │ [🟢][🔴]     │  │ [🟡][⚫]     │  │ [🟡][⚫]     │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
                    TESTING FEATURES
═══════════════════════════════════════════════════════════════

🧪 Test 1: Change Table Status
────────────────────────────────
1. Click the "🔴 IN_USE" button on Table 1 (currently Available)
2. Watch it change from green to red instantly!
3. Notice the summary bar updates: Available: 2→1, In Use: 2→3

🧪 Test 2: Real-Time Sync
──────────────────────────
1. Open the same URL in 2 browser windows side by side
2. Change a status in Window 1
3. Watch Window 2 update automatically! ✨

🧪 Test 3: All Status Types
────────────────────────────
Try changing any table to:
  🟢 AVAILABLE   - Green background
  🔴 IN_USE      - Red background
  🟡 RESERVED    - Yellow background
  ⚫ MAINTENANCE - Gray background


═══════════════════════════════════════════════════════════════
                   TROUBLESHOOTING
═══════════════════════════════════════════════════════════════

❌ Port Already in Use?
   → lsof -ti:5000 | xargs kill -9

❌ Module Not Found?
   → cd server && npm install && npm run prisma:generate

❌ Styles Not Loading?
   → cd client && npm install && npm start

❌ Browser Doesn't Open?
   → Manually visit: http://localhost:3000


═══════════════════════════════════════════════════════════════
                   NEED MORE HELP?
═══════════════════════════════════════════════════════════════

📖 Detailed Testing Guide → TESTING.md
📖 Complete Setup Guide → docs/QUICK_START.md
📖 Technical Documentation → docs/IMPLEMENTATION.md
📖 Project Overview → README.md

💬 Questions? Open an issue on GitHub!


═══════════════════════════════════════════════════════════════
                   RUNNING TESTS
═══════════════════════════════════════════════════════════════

Run Frontend Tests:
  $ cd client
  $ npm test

Build for Production:
  $ cd server && npm run build
  $ cd client && npm run build

Check Test Coverage:
  $ cd client
  $ npm test -- --coverage --watchAll=false


═══════════════════════════════════════════════════════════════

                    🎱 Happy Coding! 🎱

═══════════════════════════════════════════════════════════════
