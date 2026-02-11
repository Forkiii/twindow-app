import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './Routes/AuthRoute.js';
import userRoute from './Routes/UserRoute.js';
dotenv.config();
console.log('TOKEN_KEY exists:', !!process.env.TOKEN_KEY);
console.log('TOKEN_KEY length:', process.env.TOKEN_KEY?.length);


const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
app.use(cors({
  origin: ["http://localhost:5173",],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


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