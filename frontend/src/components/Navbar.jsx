import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";

const ADMIN_EMAIL = "ritambhadra.asx1573@gmail.com";

function Navbar() {

  const { isSignedIn, isLoaded, user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const buttonRef = useRef(null);

  /* =========================================
     BODY SCROLL LOCK
  ========================================= */

  useEffect(() => {

    if(menuOpen){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [menuOpen]);

  /* =========================================
     SCROLL EFFECT
  ========================================= */

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  /* =========================================
     CLOSE MENU
  ========================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================================
     CLOSE ON OUTSIDE CLICK
  ========================================= */

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        closeMenu();
      }

    };

    const handleEsc = (e) => {

      if (e.key === "Escape") {
        closeMenu();
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, []);

  /* =========================================
     NAVIGATION HELPERS
  ========================================= */

  const safeNavigate = (path) => {

    if (!isLoaded) return;

    if (!isSignedIn) {
      navigate(`/login?redirect=${path}`);
    } else {
      navigate(path);
    }

    closeMenu();
  };

  const handleHomeClick = () => {

    if (!isLoaded) return;

    if (isSignedIn) {
      navigate("/Home");
    } else {
      navigate("/login?redirect=/Home");
    }

    closeMenu();
  };

  const isAdmin =
    user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  return (

    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >

      <div className="navbar-container">

        {/* =========================================
           LOGO
        ========================================= */}

        <div className="navbar-logo">

          <Link
            to="/"
            className="logo-link"
            onClick={closeMenu}
          >
            ARTELLIER
          </Link>

        </div>

        {/* =========================================
           HAMBURGER
        ========================================= */}

        <button
          ref={buttonRef}
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

        {/* =========================================
           OVERLAY
        ========================================= */}

        <div
          className={`mobile-overlay ${menuOpen ? "active" : ""}`}
          onClick={closeMenu}
        />

        {/* =========================================
           MENU
        ========================================= */}

        <div
          id="nav-menu"
          className={`navbar-menu ${menuOpen ? "active" : ""}`}
          role="menu"
          aria-hidden={!menuOpen}
        >

          <button
            role="menuitem"
            className={`nav-btn ${
              location.pathname === "/Home"
                ? "active"
                : ""
            }`}
            onClick={handleHomeClick}
          >
            Home
          </button>

          <button
            role="menuitem"
            className={`nav-link-btn ${
              location.pathname === "/sculpture"
                ? "active"
                : ""
            }`}
            onClick={() => safeNavigate("/sculpture")}
          >
            Sculpture
          </button>

          <button
            role="menuitem"
            className={`nav-link-btn ${
              location.pathname === "/painting"
                ? "active"
                : ""
            }`}
            onClick={() => safeNavigate("/painting")}
          >
            Painting
          </button>

          <button
            role="menuitem"
            className={`nav-link-btn ${
              location.pathname === "/interior"
                ? "active"
                : ""
            }`}
            onClick={() => safeNavigate("/interior")}
          >
            Interior Design
          </button>

          <button
            role="menuitem"
            className={`nav-link-btn ${
              location.pathname === "/featured"
                ? "active"
                : ""
            }`}
            onClick={() => safeNavigate("/featured")}
          >
            Featured
          </button>

          <span
            role="menuitem"
            className={`special-link ${
              location.pathname === "/collection"
                ? "active-special"
                : ""
            }`}
            onClick={() => safeNavigate("/collection")}
          >
            Collection
          </span>

          {/* =========================================
             MOBILE AUTH
          ========================================= */}

          <div className="mobile-auth">

            <SignedOut>

              <Link
                to="/login"
                className="login-btn"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="signup-btn"
                onClick={closeMenu}
              >
                Sign Up
              </Link>

            </SignedOut>

            <SignedIn>

              <span className="user-greeting premium-user-name">

                Hi {isAdmin
                  ? "Admin"
                  : (user?.firstName || "User")}

              </span>

              {isAdmin && (

                <button
                  className="admin-btn"
                  onClick={() => {
                    navigate("/admin");
                    closeMenu();
                  }}
                >
                  Admin
                </button>

              )}

              <UserButton afterSignOutUrl="/" />

            </SignedIn>

          </div>

        </div>

        {/* =========================================
           DESKTOP AUTH
        ========================================= */}

        <div className="navbar-auth">

          <SignedOut>

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
            >
              Sign Up
            </Link>

          </SignedOut>

          <SignedIn>

            <span className="user-greeting premium-user-name">

              Hi {isAdmin
                ? "Admin"
                : (user?.firstName || "User")}

            </span>

            {isAdmin && (

              <button
                className="admin-btn"
                onClick={() => navigate("/admin")}
              >
                Admin
              </button>

            )}

            <UserButton afterSignOutUrl="/" />

          </SignedIn>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;