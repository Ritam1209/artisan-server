import app from "./src/app.js";
import pool from "./src/config/db.js";

/* correct path */
import collectionRoutes from "./src/routes/collectionRoutes.js";


app.use("/api/collection", collectionRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

console.log(`Server running on port ${PORT}`);

});


/* DB TEST */

(async () => {

try{

await pool.query("SELECT 1");

console.log("Database connected successfully");

}

catch(err){

console.error(err.message);

}

})();