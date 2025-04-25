import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import logo from "D:/news-website/news-aggregator-main/client/src/assets/logo.png"; // Import logo

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light-theme" ? "dark-theme" : "light-theme"));
  }

  // Handle Log-out and update active status for all users
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message); // Optionally, show a success message
        // Redirect user to the login page or handle session clear
        window.location.href = '/login'; // Redirects the user to the login page
      } else {
        console.error('Error during logout:', result.message);
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <div className="absolute left-10 flex items-center gap-2 mb-5 mt-5">
          <img src={logo} alt="Logo" className="w-50 h-10" />
        </div>
        <div className="flex items-center justify-center md:basis-1/6 xs:basis-4/12 z-50 mb-5 mt-5 ml-40">
          <h3 className="relative heading font-bold text-2xl">Amrita News</h3>
        </div>
        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12  md:justify-end active" : "nav-ul flex gap-14  justify-end"}>
          <li>
            <Link className="no-underline font-semibold" to="/All-News" onClick={() => { setActive(!active); }}>All News</Link>
          </li>
          <li>
            <Link className="no-underline font-semibold" to="/saved-news" onClick={() => { setActive(!active); }}>Saved Articles</Link>
          </li>
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }} >
              Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); }}>
                  <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" type="btn" onClick={() => { setActive(!active); }}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }} >
              Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCountryDropdown ? "dropdown1 p-2 show-dropdown" : "dropdown1 p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => { setShowCountryDropdown(!showCountryDropdown); }}>
                  <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" type="btn" onClick={() => { setActive(!active); }}>
                    <img
                      src={element?.png}
                      srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                      alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={() => { toggleTheme(); }}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
          <li>
            <Link className="heading font-bold text-2xl" to="/about-us" onClick={() => { setActive(!active); }}>SRC</Link>
          </li>
          {/* Log-out link */}
          <Link className="heads font-bold text-2xl" to="/login" onClick={handleLogout}>Log-out</Link>
        </ul>
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active); }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
