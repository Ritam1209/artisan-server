import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import FeaturedSlider from "../components/FeaturedSlider";
import { getProducts } from "../services/api";

function Featured(){

const [products,setProducts] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(null);


/* fetch featured products */

useEffect(()=>{

getProducts(4)

.then(data=>{

console.log("Featured API Response:", data);

if(data?.products){

setProducts(data.products);

}else{

setProducts([]);

}

})

.catch(err=>{

console.error(err);

setError("Failed to load featured works");

})

.finally(()=>{

setLoading(false);

});

},[]);



return(

<>

{/* HERO SECTION */}

<section className="featured-hero fade-up">

<div className="hero-overlay"></div>

<div className="featured-hero-content fade-up">

<div className="featured-badge fade-up">

<span>✨</span>

<p>EXCLUSIVE</p>

<span>✨</span>

</div>


<h1 className="hero-title gradient-text fade-up">

Featured Works

</h1>


<p className="hero-subtitle fade-up">

Our most prestigious and sought-after pieces. These exceptional works represent the pinnacle of artistic achievement and design excellence.

</p>


<div className="featured-icons fade-up">


<div className="icon-item">

<span>🏛</span>

<p>Museum Quality</p>

</div>


<div className="icon-item">

<span>💎</span>

<p>Investment Grade</p>

</div>


<div className="icon-item">

<span>⭐</span>

<p>Limited Edition</p>

</div>


<div className="icon-item">

<span>📜</span>

<p>Certificate of Authenticity</p>

</div>


</div>

</div>

</section>



{/* PRODUCT SECTION */}

<section className="products-section fade-up">

{loading && (

<h2 style={{textAlign:"center"}}>

Loading featured works...

</h2>

)}


{error && (

<h2 style={{textAlign:"center",color:"red"}}>

{error}

</h2>

)}


{!loading && !error && products.length === 0 && (

<h2 style={{textAlign:"center"}}>

No featured works available

</h2>

)}


{!loading && !error && products.length > 0 && (

<ProductGrid products={products}/>

)}

</section>




{/* COLLECTOR SECTION */}

<section className="collectors-section fade-up">

<h2>For Serious Collectors</h2>

<p>

Each featured work comes with comprehensive provenance documentation and authentication

</p>



<div className="collector-grid">



<div className="collector-card fade-up">

<div className="collector-number">1</div>

<h3>Expert Curation</h3>

<p>

Hand-selected by renowned art historians and design experts.

</p>

</div>



<div className="collector-card fade-up">

<div className="collector-number">2</div>

<h3>Investment Potential</h3>

<p>

Works with documented appreciation and market demand.

</p>

</div>



<div className="collector-card fade-up">

<div className="collector-number">3</div>

<h3>White Glove Service</h3>

<p>

Premium installation, insurance, and ongoing conservation support.

</p>

</div>



</div>

</section>




{/* CTA SECTION */}

<section className="featured-cta fade-up">

<h2>Schedule a Private Viewing</h2>

<p>

Connect with our art advisors for exclusive access to our featured collection and personalized acquisition guidance.

</p>



<a

href="#"

onClick={(e)=>{

e.preventDefault();


const number = import.meta.env.VITE_ADMIN_WHATSAPP;


if(!number){

alert("WhatsApp number not configured");

return;

}


const message = encodeURIComponent(

"Hello Artellier, I would like to schedule a private viewing for featured artworks."

);


const url = `https://wa.me/${number}?text=${message}`;


window.open(url,"_blank");

}}

className="cta-whatsapp-btn"

>

Contact Our Art Advisors

</a>

</section>




{/* FEATURED IMAGE GALLERY */}

<div className="fade-up">

<FeaturedSlider/>

</div>


</>

);

}

export default Featured;