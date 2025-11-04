import express from "express"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./route/authRoutes";
import teamRoutes from "./route/teamRoutes";
import scheduleRoutes from "./route/scheduleRoutes";
import playRoutes from "./route/playRoutes";

const app = express();
 
const PORT = process.env.PORT || 8000;

const clients = [process.env.CLIENT_URL, 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if(!origin || clients.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/play', playRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});