import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Footer() {

const { isSignedIn, isLoaded } = useUser();

const navigate = useNavigate();

/* common protected navigation */

const handleProtectedRoute = (path) => {

if (!isLoaded) return;

if (isSignedIn) {

navigate(path);

} 
else {

navigate(`/login?redirect=${path}`);

}

};


/* existing functions kept */

const handleHomeClick = () => {

handleProtectedRoute("/home");

};


const handleSculptureClick = () => {

handleProtectedRoute("/sculpture");

};


return (

<footer className="footer">

  <div className="footer-container">

    <div className="footer-col">

      <h2 className="footer-logo">ARTELLIER</h2>

      <p>

        Sculpting Spaces. Creating Art. Elevating your living experience
        with premium art and interior design.

      </p>

    </div>


    <div className="footer-col">

      <h3>Quick Links</h3>

      <ul>

        <li
        onClick={handleHomeClick}
        style={{cursor:"pointer"}}
        >

          Home

        </li>


        <li
        onClick={handleSculptureClick}
        style={{cursor:"pointer"}}
        >

          Sculpture

        </li>


        <li
        onClick={()=>handleProtectedRoute("/painting")}
        style={{cursor:"pointer"}}
        >

          Painting

        </li>


        <li
        onClick={()=>handleProtectedRoute("/interior")}
        style={{cursor:"pointer"}}
        >

          Interior Design

        </li>


        <li
        onClick={()=>handleProtectedRoute("/featured")}
        style={{cursor:"pointer"}}
        >

          Featured Works

        </li>

      </ul>

    </div>


    <div className="footer-col">

      <h3>Contact</h3>

      <p>info@artellier.com</p>

      <p>+1 (555) 123-4567</p>

      <p>123 Art District, Creative City</p>

    </div>


    <div className="footer-col">

      <h3>Follow Us</h3>

      <p>Subscribe to our newsletter for exclusive updates.</p>
<div className="social-icons">

<a
href="https://instagram.com"
target="_blank"
rel="noreferrer"
className="social-icon instagram"
>

<i className="fab fa-instagram"></i>

</a>


<a
href="https://facebook.com"
target="_blank"
rel="noreferrer"
className="social-icon facebook"
>

<i className="fab fa-facebook-f"></i>

</a>


<a
href="https://twitter.com"
target="_blank"
rel="noreferrer"
className="social-icon twitter"
>

<i className="fab fa-twitter"></i>

</a>

</div>
    </div>

  </div>


  <div className="footer-bottom">

    © 2026 Artellier. All rights reserved.

  </div>


</footer>

);

}

export default Footer;