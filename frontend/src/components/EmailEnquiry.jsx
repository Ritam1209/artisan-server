import React, { useState } from "react";

const EmailEnquiry = ({ product }) => {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [message,setMessage] = useState("");

const handleSend = async () => {

try{

const res = await fetch("http://localhost:5000/api/contact/send-email",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
message,
product: product?.name || "Artwork enquiry"
})

});

const data = await res.json();

if(data.success){
alert("Enquiry sent successfully!");
}

}catch(error){
console.error(error);
alert("Failed to send enquiry");
}

};

return (

<div className="email-enquiry">

<h3>Send Email Enquiry</h3>

<input
type="text"
placeholder="Your Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Your Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<textarea
placeholder="Your Message"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={handleSend}>
Send Enquiry
</button>

</div>

);

};

export default EmailEnquiry;