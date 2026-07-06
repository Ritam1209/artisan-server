import { requireAuth } from "@clerk/express";

export const protect = async (req,res,next)=>{

try{

const authHeader = req.headers.authorization;

if(!authHeader){

return res.status(401).json({
message:"No token"
});

}

const token = authHeader.replace("Bearer ","");

console.log("TOKEN RECEIVED:", token);

/* verify Clerk JWT */

const payload = await verifyToken(
token,
{
secretKey: process.env.CLERK_SECRET_KEY
}
);

console.log("PAYLOAD:", payload);

/* attach user */

req.user = {

id: payload.sub,

role:
payload.public_metadata?.role ||
payload.metadata?.role ||
"admin"

};

next();

}
catch(error){

console.log("VERIFY ERROR:", error.message);

return res.status(401).json({
message:"Invalid token"
});

}

};

export const protectRoute = requireAuth();