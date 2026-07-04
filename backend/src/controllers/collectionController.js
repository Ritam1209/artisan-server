import { safeQuery as query } from "../config/db.js";


/* ADD TO COLLECTION */

export const addToCollection = async (req,res)=>{

try{

const { user_email, product_id } = req.body;

if(!user_email || !product_id){

return res.status(400).json({

success:false,
message:"Missing data"

});

}


/* prevent duplicate */

const exists = await query(

`SELECT id FROM collections
WHERE user_email=$1
AND product_id=$2`,

[user_email, Number(product_id)]

);


if(exists.rows.length > 0){

return res.json({

success:true,
message:"Already added"

});

}


/* insert */

await query(

`INSERT INTO collections
(user_email, product_id)

VALUES($1,$2)`,

[user_email, Number(product_id)]

);


res.json({

success:true,
message:"Added to collection"

});

}

catch(error){

console.log("addToCollection error:", error);

res.status(500).json({

success:false,
message:"Server error"

});

}

};



/* GET USER COLLECTION */

export const getCollection = async (req,res)=>{

try{

const { email } = req.params;

if(!email){

return res.status(400).json({

success:false

});

}


const result = await query(

`SELECT
products.*

FROM collections

JOIN products
ON collections.product_id = products.id

WHERE collections.user_email=$1

ORDER BY collections.created_at DESC`,

[email]

);


res.json({

success:true,
products: result.rows

});

}

catch(error){

console.log("getCollection error:", error);

res.status(500).json({

success:false

});

}

};



/* REMOVE FROM COLLECTION */

export const removeFromCollection =
async (req,res)=>{

try{

const { user_email, product_id } = req.body;

if(!user_email || !product_id){

return res.status(400).json({

success:false

});

}


await query(

`DELETE FROM collections
WHERE user_email=$1
AND product_id=$2`,

[user_email, Number(product_id)]

);


res.json({

success:true

});

}

catch(error){

console.log("removeFromCollection error:", error);

res.status(500).json({

success:false

});

}

};