import express from "express";
import { config } from "dotenv";
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import dbconnect from "./db/dbconnect.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); 
config();

const PORT = process.env.PORT || 5000;
//middleware
app.use(cookieParser())

//routes

app.get('/', (req, res)=>{
    res.send(`server is ready on port ${PORT}`);
})

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () =>{ 
    dbconnect();
    console.log(`server is running on port ${PORT}`)
})