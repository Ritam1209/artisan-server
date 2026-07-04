import { useEffect, useState } from "react";

function Admin() {

/* ---------------- STATE ---------------- */

const [editId,setEditId] = useState(null);

const [products,setProducts] = useState([]);

const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [price,setPrice] = useState("");
const [imageUrl,setImageUrl] = useState("");
const [category,setCategory] = useState(1);

const [search,setSearch] = useState("");
const [filterCategory,setFilterCategory] = useState("");

const [currentPage,setCurrentPage] = useState(1);

const productsPerPage = 12;


/* ---------------- FETCH ---------------- */

const fetchProducts = async () => {

const res =
await fetch("/api/products?limit=1000");

const data =
await res.json();

setProducts(data.products || []);

};

useEffect(()=>{

fetchProducts();

},[]);


/* ---------------- FILTER ---------------- */

const filteredProducts = products.filter(product => {

const matchSearch =
product.name.toLowerCase()
.includes(search.toLowerCase());

const matchCategory =
filterCategory === ""
? true
: product.category_id == filterCategory;

return matchSearch && matchCategory;

});


/* ---------------- PAGINATION ---------------- */

const totalPages =
Math.ceil(filteredProducts.length / productsPerPage);

const lastIndex =
currentPage * productsPerPage;

const firstIndex =
lastIndex - productsPerPage;

const currentProducts =
filteredProducts.slice(firstIndex,lastIndex);


/* ---------------- TOTALS ---------------- */

const totalProducts = products.length;

const pageProductCount = currentProducts.length;

const filteredTotalValue =
filteredProducts.reduce(
(sum,p)=> sum + Number(p.price || 0),
0
);

const pageTotalValue =
currentProducts.reduce(
(sum,p)=> sum + Number(p.price || 0),
0
);


/* ---------------- GET TOKEN ---------------- */

async function getClerkToken(){

if(window.Clerk){

return await window.Clerk.session?.getToken();

}

return null;

}


/* ---------------- ADD PRODUCT ---------------- */

async function handleAddProduct(e){

e.preventDefault();

const token = await getClerkToken();

console.log("TOKEN:", token);

if(!token){

alert("Login again");

return;

}

const productData = {

name,
description,
price,
image_url:imageUrl,
category_id:Number(category),
is_featured:false

};


/* UPDATE */

if(editId){

await fetch(`/api/products/${editId}`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(productData)

});

alert("Product Updated");

}

/* ADD */

else{

await fetch("/api/products",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(productData)

});

alert("Product Added");

}

await fetchProducts();

setEditId(null);

setName("");
setDescription("");
setPrice("");
setImageUrl("");
setCategory(1);

}


/* ---------------- DELETE ---------------- */

async function handleDelete(id){

const token = await getClerkToken();

if(!token){

alert("Login again");

return;

}

await fetch(`/api/products/${id}`,{

method:"DELETE",

headers:{
Authorization:`Bearer ${token}`
}

});

await fetchProducts();

}


/* ---------------- UI ---------------- */

return(

<div className="admin-page">

<h1 className="admin-title">

Admin Dashboard

</h1>


{/* ANALYTICS */}

<div className="analytics-grid">

<div className="analytics-card">

<h3>Total Products</h3>

<p>{totalProducts}</p>

</div>


<div className="analytics-card">

<h3>Filtered Value</h3>

<p>${filteredTotalValue}</p>

</div>


<div className="analytics-card">

<h3>Page Value</h3>

<p>${pageTotalValue}</p>

</div>

</div>



{/* ADD PRODUCT */}

<div className="admin-card">

<form
className="admin-form"
onSubmit={handleAddProduct}
>

<div className="floating-input">

<input required value={name}
onChange={e=>setName(e.target.value)} />

<label>Product Name</label>

</div>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
required
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={e=>setPrice(e.target.value)}
min="0"
step="100"
required
/>

<input
type="file"
accept="image/*"
onChange={(e)=>{

const file = e.target.files[0];

if(file){

const imageURL = URL.createObjectURL(file);

setImageUrl(imageURL);

}

}}
required
/>
<select
value={category}
onChange={e=>setCategory(e.target.value)}
>

<option value="1">Sculpture</option>
<option value="2">Painting</option>
<option value="3">Interior</option>
<option value="4">Featured</option>

</select>


<button>

{editId
? "Update Product"
: "Add Product"}

</button>


</form>

</div>



{/* FILTER */}

<div className="admin-toolbar">

<input
placeholder="Search product..."
value={search}
onChange={(e)=>{

setSearch(e.target.value);

setCurrentPage(1);

}}
/>


<select
value={filterCategory}
onChange={(e)=>{

setFilterCategory(e.target.value);

setCurrentPage(1);

}}
>

<option value="">All Categories</option>

<option value="1">Sculpture</option>

<option value="2">Painting</option>

<option value="3">Interior</option>

<option value="4">Featured</option>

</select>

</div>


<p className="product-count">

Showing
{firstIndex + 1}
–
{Math.min(lastIndex, filteredProducts.length)}
of
{filteredProducts.length}
products

</p>



<div className="admin-card">

<table className="admin-table">

<thead>

<tr>

<th>Preview</th>
<th>Name</th>
<th>Price</th>
<th>Category</th>
<th>Action</th>
<th>Quantity</th>
</tr>

</thead>


<tbody>

{

currentProducts.map(product=>(

<tr key={product.id}>

<td>

<img
src={product.image_url}
className="table-img"
/>

</td>

<td>{product.name}</td>

<td>${product.price}</td>

<td>{product.category_id}</td>

<td>

<button
className="edit-btn"
onClick={()=>{

setEditId(product.id);

setName(product.name);
setDescription(product.description);
setPrice(product.price);
setImageUrl(product.image_url);
setCategory(product.category_id);

window.scrollTo({

top:0,
behavior:"smooth"

});

}}
>

Edit

</button>


<button
className="delete-btn"
onClick={()=>handleDelete(product.id)}
>

Delete

</button>

</td>


{/* ADD THIS LINE */}

<td>

{

product.category_id == 2

? (

<input
type="number"

min="0"
max="1"

step="1"

defaultValue={product.quantity ?? 1}

className="qty-input"

onBlur={async(e)=>{

const token = await getClerkToken();

const newQty = Number(e.target.value);

await fetch(`/api/products/${product.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

name:product.name,
description:product.description,
price:product.price,
image_url:product.image_url,
category_id:product.category_id,
quantity:newQty

})

});

fetchProducts();

}}

 />

)

: (

<span className="qty-text">

{product.quantity ?? 0}

</span>

)

}

</td>

</tr>

))

}

</tbody>

</table>

</div>



<button

type="button"

className="cancel-edit-btn"

onClick={()=>{

setEditId(null);

setName("");
setDescription("");
setPrice("");
setImageUrl("");
setCategory(1);

}}

>

Cancel Edit

</button>



<div className="pagination">

<button
className="page-btn"
disabled={currentPage === 1}
onClick={()=>setCurrentPage(currentPage - 1)}
>

Prev

</button>


{

Array.from(
{length: totalPages},
(_,index)=>(

<button

key={index}

className={

currentPage === index+1
? "page-number active"
: "page-number"

}

onClick={()=>setCurrentPage(index+1)}

>

{index+1}

</button>

))

}


<button
className="page-btn"
disabled={currentPage === totalPages}
onClick={()=>setCurrentPage(currentPage + 1)}
>

Next

</button>

</div>



</div>

);

}

export default Admin;