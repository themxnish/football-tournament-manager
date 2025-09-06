import express from "express"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./route/authRoutes";
import teamRoutes from "./route/teamRoutes";
import scheduleRoutes from "./route/scheduleRoutes";

const app = express();
 
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/schedule', scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});