const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoutes.js')
const path = require('path')
const postRouter = require('./routes/postRoutes.js')

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json());

// Upload folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// For test
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// Test route
app.get('/',(req,res)=>{
    res.send('API is running....')
})


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });