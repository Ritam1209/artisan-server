import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import {
FaTrash,
FaPaintBrush,
FaCubes,
FaCouch,
FaStar
} from "react-icons/fa";

function Collection(){

const navigate = useNavigate();
const { user } = useUser();

const [items,setItems] = useState([]);
const [loading,setLoading] = useState(true);
const [filter,setFilter] = useState("All");

const [loadedImages,setLoadedImages] = useState({});


/* EXACT mapping from your Neon DB */

const categoryMap={

1:"Sculpture",

2:"Painting",

3:"Interior",

4:"Featured"

};


/* icons */

const categoryIcons={

Painting:<FaPaintBrush/>,

Sculpture:<FaCubes/>,

Interior:<FaCouch/>,

Featured:<FaStar/>

};



/* FETCH COLLECTION */

useEffect(()=>{

if(!user) return;

fetch(
`http://localhost:5000/api/collection/${
user.primaryEmailAddress.emailAddress
}`
)

.then(res=>res.json())

.then(data=>{

const enriched = (data.products || []).map(item=>{

const categoryName = categoryMap[item.category_id];

return{

...item,

category:categoryName,

featured:item.category_id === 4

};

});

setItems(enriched);

})

.catch(()=>{

setItems([]);

})

.finally(()=>{

setLoading(false);

});

},[user]);



/* REMOVE */

const removeItem = async(id)=>{

if(!user) return;

await fetch(

"http://localhost:5000/api/collection/remove",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

user_email:user.primaryEmailAddress.emailAddress,

product_id:id

})

}

);

setItems(prev =>
prev.filter(item => item.id !== id)
);

};



/* FILTER */

const filteredItems = items.filter(item=>{

if(filter==="All")
return true;

return item.category === filter;

});



/* LOADING */

if(loading){

return(

<div className="collection-page">

<div className="collection-wrapper">

<h1 className="collection-title">

Your Collection

</h1>

<p>Loading...</p>

</div>

</div>

);

}



/* UI */

return(

<div className="collection-page">

<div className="collection-wrapper">

<h1 className="collection-title">

Your Collection

</h1>



<div className="collection-filters">

{["All","Painting","Sculpture","Interior","Featured"].map(cat=>(

<button

key={cat}

className={`filter-btn ${filter===cat?"active":""}`}

onClick={()=>setFilter(cat)}

>

{categoryIcons[cat]}

{cat}

</button>

))}

</div>



{filteredItems.length === 0 && (

<div className="empty-collection">

<p>No artworks available in this category</p>

<button
onClick={() => {

if(filter === "Painting")
navigate("/painting");

else if(filter === "Sculpture")
navigate("/sculpture");

else if(filter === "Interior")
navigate("/interior");

else if(filter === "Featured")
navigate("/featured");

else
navigate("/Home");

}}

className="browse-btn"
>

Browse Collection

</button>

</div>

)}



<div className="collection-grid">

{filteredItems.map((item,index)=>(

<div
key={item.id}
className={`collection-card ${item.featured ? "featured" : ""}`}
style={{animationDelay:`${index*0.05}s`}}
>


<div className="img-wrapper">


{!loadedImages[item.id] && (

<div className="skeleton"></div>

)}


<img

src={item.image_url}

alt={item.name}

className="collection-img"

onLoad={()=>setLoadedImages(prev=>({

...prev,

[item.id]:true

}))}

onClick={()=> navigate(`/product/${item.id}`)}

/>



<div className="overlay">

<span className="category-tag">

{categoryIcons[item.category]}

{item.category}

</span>

<h3>{item.name}</h3>

<p>${item.price}</p>

</div>


</div>



<div className="card-actions">

<button

onClick={()=> removeItem(item.id)}

className="remove-btn"

>

<FaTrash/>

Remove

</button>

</div>


</div>

))}

</div>


</div>

</div>

);

}

export default Collection;