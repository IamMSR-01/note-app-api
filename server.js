import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/auth.route.js"
import noteRoutes from "./routes/note.route.js"


const app = express()


dotenv.config();
const PORT = process.env.PORT || 7000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/notes", noteRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
})