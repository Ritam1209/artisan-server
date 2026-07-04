import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sculpture from "./pages/Sculpture";
import Painting from "./pages/Painting";
import Interior from "./pages/Interior";
import Featured from "./pages/Featured";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Collection from "./pages/Collection";
import Wishlist from "./pages/Wishlist";

function App(){

return(

<>

<Navbar/>

<Routes>

<Route path="/product/:id" element={<ProductDetails />} />

<Route
 path="/sculpture"
 element={
   <ProtectedRoute>
     <Sculpture/>
   </ProtectedRoute>
 }
/>

<Route path="/painting" element={<Painting/>}/>

<Route path="/interior" element={<Interior/>}/>

<Route path="/featured" element={<Featured/>}/>

<Route path="/admin-login" element={<AdminLogin/>}/>

<Route path="/admin" element={<Admin/>}/>

<Route path="/" element={<Landing/>}/>

<Route path="/home" element={<Home/>}/>

<Route path="/login/*" element={<Login/>}/>

<Route path="/signup/*" element={<Signup/>}/>
<Route path="/collection" element={<Collection/>}/>
<Route path="/wishlist" element={<Wishlist/>}/>
</Routes>

<Footer/>

</>

);

}

export default App;