import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaWhatsapp, FaHeart } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

import gmailIcon from "../assets/Gmail.png";
import certificateIcon from "../assets/Certificate.png";
import shippingIcon from "../assets/shipping.png";
import premiumIcon from "../assets/authentic.jpg";

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP;
const ADMIN_EMAIL = "triparnabhadra76@gmail.com";

function ProductDetails(){

const { id } = useParams();
const navigate = useNavigate();

/* FIX ADDED */
const { user } = useUser();

const [product,setProduct] = useState(null);
const [related,setRelated] = useState([]);
const [preview,setPreview] = useState(null);

const [loading,setLoading] = useState(true);
const [selectedImage,setSelectedImage] = useState(null);

const [wishlist,setWishlist] = useState(false);
const [zoomStyle,setZoomStyle] = useState({});

const carouselRef = useRef(null);


/* FETCH PRODUCT */

useEffect(()=>{

if(!id) return;

setLoading(true);

fetch(`http://localhost:5000/api/products/${Number(id)}`)
.then(res=>res.json())

.then(data=>{

const p = data.product || data;

setProduct(p);

if(p?.image_url){

setSelectedImage(p.image_url);

}

/* related products */

return fetch(
`http://localhost:5000/api/products?category=${Number(p.category_id)}`
);

})

.then(res=>res.json())

.then(data=>{

const list =
Array.isArray(data)
? data
: data.products || [];

setRelated(list);

})

.catch(console.log)

.finally(()=> setLoading(false));

},[id]);


/* SOLD OUT */

const isSoldOut =
Number(product?.quantity) === 0;


/* ADD TO COLLECTION */

const addToCollection = async ()=>{

try{

const response = await fetch(
"http://localhost:5000/api/collection/add",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

user_email:user.primaryEmailAddress.emailAddress,

product_id:id,

/* send full product info */

name:product.name,

price:product.price,

image_url:product.image_url,

category_id:product.category_id,

/* optional featured flag */

featured:product.featured || false

})

}
);


const data = await response.json();

if(!response.ok){

alert("Server error");

return;

}

alert(data.message);

}

catch(error){

console.log(error);

alert("Server connection failed");

}

};



/* IMAGE ZOOM */

const handleZoom = (e)=>{

const rect = e.target.getBoundingClientRect();

const x =
((e.clientX - rect.left) / rect.width) * 100;

const y =
((e.clientY - rect.top) / rect.height) * 100;

setZoomStyle({

transformOrigin:`${x}% ${y}%`,
transform:"scale(1.4)"

});

};

const resetZoom = ()=>{

setZoomStyle({

transform:"scale(1)"

});

};


/* WHATSAPP */

const handleWhatsApp = ()=>{

if(isSoldOut) return;

const msg = `Hello Artellier,

I am interested in:

${product.name}

Price: $${product.price}`;

window.open(

`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`,
"_blank"

);

};


/* EMAIL */

const handleEmail = ()=>{

if(isSoldOut) return;

const subject =
encodeURIComponent(`Enquiry for ${product.name}`);

const body =
encodeURIComponent(`Hello Artellier,

I am interested in:

${product.name}

Price: $${product.price}`);

window.open(

`https://mail.google.com/mail/?view=cm&fs=1&to=${ADMIN_EMAIL}&su=${subject}&body=${body}`,
"_blank"

);

};


/* RELATED FILTER */

const relatedFiltered =
related.filter(item =>

Number(item.category_id) === Number(product?.category_id)
&& Number(item.id) !== Number(product?.id)

);


/* SLIDER */

const scrollCarousel = (dir)=>{

carouselRef.current?.scrollBy({

left: dir==="left" ? -320 : 320,
behavior:"smooth"

});

};


/* AUTO SLIDE */

useEffect(()=>{

const slider = setInterval(()=>{

carouselRef.current?.scrollBy({

left:320,
behavior:"smooth"

});

const maxScroll =

carouselRef.current.scrollWidth -
carouselRef.current.clientWidth;

if(carouselRef.current.scrollLeft >= maxScroll){

carouselRef.current.scrollTo({

left:0,
behavior:"smooth"

});

}

},3500);

return ()=> clearInterval(slider);

},[]);


/* LOADING */

if(loading){

return(

<div className="skeleton-page">

<div className="skeleton-img"></div>
<div className="skeleton-text"></div>

</div>

);

}

if(!product){

return <h2>Product not found</h2>;

}


return(

<div className="product-page">

<div className="breadcrumb">

<span onClick={()=> navigate("/home")}>
Home
</span>

/

<span>
{product.name}
</span>

</div>


<div className="product-layout">

<div className="gallery">

<img
src={selectedImage}
className="main-image"
onMouseMove={handleZoom}
onMouseLeave={resetZoom}
onClick={()=> setPreview(product)}
style={zoomStyle}
/>

<div className="thumbnails">

{[1,2,3,4].map((i)=>(

<img
key={i}
src={product.image_url}
className="thumb"
onClick={()=> setSelectedImage(product.image_url)}
/>

))}

</div>

</div>


<div className="info">

<h1>{product.name}</h1>

<div className="rating">★★★★★</div>

<h2 className="price">${product.price}</h2>

{isSoldOut && (

<p className="sold-text">
Sold Out
</p>

)}

<p className="description">

{product.description ||
"Premium curated artwork for collectors"}

</p>


<div className="cta-row">

<button
className="cart-btn"
onClick={()=> addToCollection(product)}
>
Add to Collection
</button>


<button
className="whatsapp-btn"
onClick={handleWhatsApp}
disabled={isSoldOut}
>
<FaWhatsapp/>
WhatsApp
</button>


<button
className="email-btn"
onClick={handleEmail}
disabled={isSoldOut}
>
<img
src={gmailIcon}
className="gmail-icon"
/>
Email
</button>


<button
className={`wishlist ${wishlist ? "active":""}`}
onClick={()=> setWishlist(!wishlist)}
>
<FaHeart/>
</button>

</div>


<div className="product-highlights">

<div className="highlight-item">
<img src={certificateIcon}/>
Authentic curated artwork
</div>

<div className="highlight-item">
<img src={shippingIcon}/>
Safe worldwide shipping
</div>

<div className="highlight-item">
<img src={certificateIcon}/>
Certified original
</div>

<div className="highlight-item">
<img src={premiumIcon}/>
Premium collectible
</div>

</div>

</div>

</div>


<div className="related-section">

<h2>Related Artworks</h2>

<div className="carousel-container">

<button
className="arrow left"
onClick={()=> scrollCarousel("left")}
>
‹
</button>


<div
className="related-slider"
ref={carouselRef}
>

{relatedFiltered.map(item=>(

<div
key={item.id}
className="related-card"
>

<img src={item.image_url}/>

<div className="related-info">

<h4>{item.name}</h4>

<p>${item.price}</p>

<button
className="preview-btn"
onClick={(e)=>{

e.stopPropagation();
setPreview(item);

}}
>

Quick View

</button>

</div>

</div>

))}

</div>


<button
className="arrow right"
onClick={()=> scrollCarousel("right")}
>
›
</button>

</div>

</div>


{preview && (

<div
className="quickview-overlay"
onClick={()=> setPreview(null)}
>

<div
className="quickview-modal"
onClick={(e)=> e.stopPropagation()}
>

<div className="quickview-image-container">

<img
src={preview.image_url}
className="quickview-image"
/>

</div>

<div className="quickview-content">

<h2>{preview.name}</h2>

<p className="quickview-price">
${preview.price}
</p>

<button
className="quickview-btn"
onClick={()=>{

setPreview(null);
navigate(`/product/${preview.id}`);

}}
>

View Details

</button>

</div>

<button
className="quickview-close"
onClick={()=> setPreview(null)}
>
✕
</button>

</div>

</div>

)}

</div>

);

}

export default ProductDetails;