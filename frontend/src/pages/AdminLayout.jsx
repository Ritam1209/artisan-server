import { Outlet, NavLink } from "react-router-dom";

function AdminLayout(){

return(

<div className="admin-layout">

{/* SIDEBAR */}

<aside className="admin-sidebar">

<h2 className="sidebar-logo">
ARTELLIER
</h2>

<nav>

<NavLink to="/admin">
Dashboard
</NavLink>

<NavLink to="/admin/products">
Products
</NavLink>

<NavLink to="/admin/categories">
Categories
</NavLink>

<NavLink to="/admin/upload">
Bulk Upload
</NavLink>

<NavLink to="/admin/analytics">
Analytics
</NavLink>

</nav>

</aside>


{/* MAIN */}

<main className="admin-main">

<Outlet/>

</main>

</div>

);

}

export default AdminLayout;