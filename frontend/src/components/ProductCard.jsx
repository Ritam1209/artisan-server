import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import gmailIcon from "../assets/Gmail.png";
const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP;
const ADMIN_EMAIL = "triparnabhadra76@gmail.com";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const isOutOfStock =
    Number(product?.quantity) === 0;


  const goToDetails = () => {

    console.log("CLICK WORKED:", product.id);

    navigate(`/product/${product.id}`);

  };


  const handleWhatsApp = (e) => {

    e.stopPropagation();

    if(isOutOfStock) return;

    const message = `
Hello Artellier,

I am interested in:
${product.name}

Price: $${product.price}
`;

    window.open(
      `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

  };


  const handleEmail = (e) => {

    e.stopPropagation();

    if(isOutOfStock) return;

    const subject = encodeURIComponent(
      `Enquiry about ${product.name}`
    );

    const body = encodeURIComponent(
`Hello Artellier,

I am interested in:

${product.name}

Price: $${product.price}

Please provide more details.
`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${ADMIN_EMAIL}&su=${subject}&body=${body}`,
      "_blank"
    );

  };



  return(

    <div className="product-card">

      <div className="product-image-wrapper">
   {isOutOfStock && (
          <div className="sold-badge">
            Sold Out
          </div>
        )}
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
          onClick={goToDetails}
          style={{cursor:"pointer"}}
        />

      </div>


      <div className="product-info">

        <h3 className="product-title">
          {product.name}
        </h3>

        <p className="price">
          ${product.price}
        </p>


        <div className="action-buttons">

          <button
            className="whatsapp-btn"
            onClick={handleWhatsApp}
            disabled={isOutOfStock}
          >
            <FaWhatsapp/> WhatsApp
          </button>


     <button
className="email-btn"
onClick={handleEmail}
disabled={isOutOfStock}
>

<img
src={gmailIcon}
alt="gmail"
className="gmail-icon"
/>

Email

</button>

        </div>

      </div>

    </div>

  );

};

export default ProductCard;