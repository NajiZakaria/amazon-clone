import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../ReactContextApi/StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    } else {
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://1079life.com/wp-content/uploads/2018/12/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="header__navOption">
            <span className="header__navOptionLineOne">
              Hello {user?.email}
            </span>
            <span className="header__navOptionLineTwo">
              {!user ? "Sign In" : "Sign Out"}
            </span>
          </div>
        </Link>
        <Link to={"/orders"}>
          <div className="header__navOption">
            <span className="header__navOptionLineOne">Return</span>
            <span className="header__navOptionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__navOption">
          <span className="header__navOptionLineOne">Your</span>
          <span className="header__navOptionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="headerOptionBasket">
            <ShoppingBasketIcon />
            <span className="header__navOptionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
