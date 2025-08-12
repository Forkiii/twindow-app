import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './Routes/AuthRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// UPDATED CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Add this middleware to handle preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoute);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

async function cleanupDB() {
  try {
    await mongoose.connection.db.dropCollection('users');
    console.log('Dropped index');
  } catch (error) {
    console.log('Index already dropped or does not exist');
  }
}

connectDB().then(() => {
  // cleanupDB();
});