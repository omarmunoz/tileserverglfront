import React, { useRef, useEffect }  from 'react';
import Button from 'react-bootstrap/Button';
import { AiOutlineUser } from "react-icons/ai";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
} from "reactstrap";

import './custom.scss';

const Header = (authToken,username) => {

  username = localStorage.getItem('username');
  authToken = localStorage.getItem('authToken');
  const headerRef = useRef(null);

  
  const handleLogout = () => {
    // Clear the stored token on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.reload();
  
  };

  useEffect(() => {
    console.log(headerRef.current.offsetHeight);
  }, []);

  const authLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className='navbar-text'>
            <strong style={{ marginRight: '10px' }}>
                <AiOutlineUser></AiOutlineUser>
                { username ? `${username}` : "" }
            </strong>
        </span>
        <li className="nav-item">
        <Button variant="danger" onClick={handleLogout} >
                Cerrar sesión
            </Button>
        </li>
    </ul>
);

const guestLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
            <p>Inicie sesión</p>
        </li>
    </ul>
);
  return (      
    <div ref={headerRef}>
      <Navbar color="cfe"  data-bs-theme="dark" light expand="md">
        <NavbarBrand href="/">
          <img alt="React Aplication" src="static/images/cfeBlanco.svg" width="145" className="d-inline-block align-top" />
        </NavbarBrand>
        {/* <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#">Menú 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Menú 2</NavLink>
          </NavItem>      
        </Nav> */}
        <NavbarText>
          <div>
            {authToken ? authLinks : guestLinks}
          </div>
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default Header;