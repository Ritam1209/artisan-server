import app from "./src/app.js";
import pool from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

pool.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed", err));