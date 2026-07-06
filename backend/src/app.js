import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

/* ADD THIS */
import collectionRoutes from "./routes/collectionRoutes.js";

dotenv.config();

const app = express();

/* ==============================
MIDDLEWARE
============================== */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://artellier1.netlify.app"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


/* ==============================
HEALTH CHECK
============================== */

app.get("/", (req, res) => {

res.status(200).json({

success: true,
message: "Artisan Backend API Running"

});

});


/* ==============================
ROUTES
============================== */

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/contact", contactRoutes);

/* ADD THIS LINE */
app.use("/api/collection", collectionRoutes);

app.use("/api/admin", adminRoutes);


/* ==============================
404
============================== */

app.use((req, res) => {

res.status(404).json({

success:false,
message:"Route not found"

});

});


/* ==============================
ERROR
============================== */

app.use((err, req, res, next) => {

console.error(err);

res.status(500).json({

success:false,
message:"Internal Server Error"

});

});


export default app;