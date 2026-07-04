import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

const navigate = useNavigate();

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const handleLogin = async()=>{

const res = await fetch("/api/admin/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

password

})

});


const data = await res.json();


if(data.success){

localStorage.setItem("admin",true);

navigate("/admin");

}
else{

alert("Wrong admin credentials");

}

};


return(

<div className="admin-login">

<h1>Admin Login</h1>


<input

placeholder="Admin Email"

onChange={(e)=>setEmail(e.target.value)}

/>


<input

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>


<button onClick={handleLogin}>

Login as Admin

</button>

</div>

);

}

export default AdminLogin;