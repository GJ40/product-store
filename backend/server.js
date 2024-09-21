import express from 'express';
const app = express();

import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
app.use(express.json()); // allows us to accept json data in req.body

app.use("/api/products", productRoutes);

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT,() => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});

