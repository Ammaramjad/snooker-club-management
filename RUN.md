# 🏃 How to Run - Snooker Club Management System

## The Simplest Way (No Database)

### Step 1: Start Backend

```bash
cd server
npm install
npm run dev
```

Wait for:
```
🚀 Server is running on port 5000
📡 Socket.io is ready for real-time updates
```

### Step 2: Start Frontend

**Open a NEW terminal window** and run:

```bash
cd client
npm install
npm start
```

Browser opens automatically at `http://localhost:3000`

---

## ✅ You're Done!

The dashboard shows 6 tables with different statuses. **Click any button to change status in real-time!**

---

## 🧪 Run Tests

```bash
cd client
npm test
```

---

## 📦 Build for Production

```bash
# Backend
cd server
npm run build

# Frontend  
cd client
npm run build
```

---

## 🆘 Troubleshooting

### Port Already in Use?

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Not Working?

1. Make sure you have Node.js v18+ installed
2. Check both terminals for errors
3. See [TESTING.md](TESTING.md) for detailed troubleshooting

---

## 📚 More Documentation

- **Complete Testing Guide:** [TESTING.md](TESTING.md)
- **Full Setup with Database:** [docs/QUICK_START.md](docs/QUICK_START.md)  
- **Technical Details:** [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md)
- **Project Overview:** [README.md](README.md)

---

**Need help?** Open an issue on GitHub!
