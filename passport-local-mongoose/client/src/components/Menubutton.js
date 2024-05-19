import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function MenuButton({ page }) {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  
  const onMouseEnter = () => {
    setOpenDropdown(true);
  }

  const onMouseLeave = () => {
    setOpenDropdown(false);
  }

  const closeDrop = () => {
    setOpenDropdown(false);
  }
  
  return (
    <li
      className="Menubutton"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDrop}>
      <Link to={page.url}>
        {page.title}
      </Link>
      {openDropdown && (
        <ul className="Menu-dropdown">
          {Array.isArray(page["subContent"]) && page["subContent"]
            .filter((subPage, yx) => (yx !== 0))
            .map((subPage, yxz) => (
              <li
                key={subPage.title + yxz}
                className="Menu-dropdown-button">
                <Link to={page.url + subPage.url}>
                  {subPage.title}
                </Link>
              </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuButton;


