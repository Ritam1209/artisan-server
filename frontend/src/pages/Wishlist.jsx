import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function Wishlist(){

const navigate = useNavigate();

const [items,setItems] = useState([]);

useEffect(()=>{

const stored =
JSON.parse(localStorage.getItem("wishlist")) || [];

setItems(stored);

},[]);


const removeItem = (id)=>{

const updated =
items.filter(item => item.id !== id);

setItems(updated);

localStorage.setItem(
"wishlist",
JSON.stringify(updated)
);

};


return(

<div className="wishlist-page">

<h1>Your Wishlist</h1>

{items.length === 0 && (

<p>No wishlist items</p>

)}


<div className="wishlist-grid">

{items.map(item=>(

<div key={item.id} className="wishlist-card">

<img
src={item.image_url}
onClick={()=> navigate(`/product/${item.id}`)}
/>

<h3>{item.name}</h3>

<p>${item.price}</p>


<button
onClick={()=> removeItem(item.id)}
className="remove-btn"
>
<FaTrash/>
Remove
</button>


</div>

))}

</div>

</div>

);

}

export default Wishlist;