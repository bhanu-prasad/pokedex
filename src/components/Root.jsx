
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function Root() {
  const [activeItem, setActiveItem] = useState("home");
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigator = useNavigate();
  useEffect(() => {
    setActiveItem(window.location.pathname);
  });
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const handleSearch = () => {
    navigator("details/" + searchTerm);
  };

  return (
    <div>
      <Menu color={"blue"} inverted style={{ borderRadius: "0px" }}>
        <Menu.Item
          name="Search"
          as={NavLink}
          to="/"
          active={activeItem === "Search"}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          name="List"
          to="/list"
          active={activeItem === "List"}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          name="Bookmarks"
          to="/bookmarks"
          active={activeItem === "Bookmarks"}
          onClick={handleItemClick}
        />
      </Menu>
      <Outlet context={[handleSearch, setSearchTerm]} />
    </div>
  );
}
