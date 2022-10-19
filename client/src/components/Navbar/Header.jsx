import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import Contact from "../Contact";
import { FiMenu,FiX,FiZ } from "react-icons/fi"
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuClicked,setMenuClicked] = useState(false)
  
  const toggleMenuClick=() => {
setMenuClicked(!menuClicked)
  }


  const onLogout = () => {
      navigate("/login")
      dispatch(logout());
      dispatch(reset());
    
  };

  return (
    <header className="header">

      <div >
        <Link className="text-link" to="/">
          <span className="logo">CarMarket</span>
        </Link>
      </div>
      {menuClicked? <FiX size={25} onClick={toggleMenuClick} className='header-menu'/>
      : <FiMenu size={25} className='header-menu' onClick={toggleMenuClick} />}
      {user && user.isAdmin? (
        <div>
          <Link className="text-link" to="/add">
            <FaUser /> Add Car
          </Link>
        </div>
      ) : (
        <><Link className="text-link" to="/contact">
        <FaUser /> Contact us
      </Link></>)}

      <div>
        {user ? (

          <div>
            <div className="text-link" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>

            ) : (

          <>
            <div>
              <Link className="text-link" to="/login">
                <FaSignInAlt /> Login
              </Link>
            </div>
            <div>
              <Link className="text-link" to="/register">
                <FaUser /> Register
              </Link>
            </div>
          </>)}

      </div>
    </header>
  );
};

export default Header;
