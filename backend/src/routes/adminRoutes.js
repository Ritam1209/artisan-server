import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// ADMIN LOGIN

router.post("/login", async (req,res)=>{

try{

const { email,password } = req.body;


const result = await pool.query(

"SELECT * FROM admins WHERE email=$1 AND password=$2",

[email,password]

);


if(result.rows.length === 0){

return res.status(401).json({

success:false,

message:"Invalid admin credentials"

});

}


res.json({

success:true,

admin: result.rows[0]

});

}
catch(err){

console.log(err);

res.status(500).json({

success:false,

message:"Server error"

});

}

});


export default router;