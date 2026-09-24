import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { bookings_router } from './routes/bookings.routes.js';
import path from 'path'
import { fileURLToPath } from "url";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendIndex = path.resolve(__dirname, "../../frontend/dist/index.html");
const frontendDist = path.resolve(__dirname, "../../frontend/dist");


app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/bookings", bookings_router)
app.use(express.static(frontendDist));
app.use((req, res) => {
    res.sendFile(frontendIndex);
});
export default app;