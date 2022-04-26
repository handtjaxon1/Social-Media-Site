import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import NavAuthToggle from "./NavAuthToggle";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function Navigation(props) {
    const { isLoggedIn, setIsLoggedIn } = props;

    return (
        <Navbar>
            <NavbarBrand>
                <img src="..." alt="Company Logo" />
            </NavbarBrand>
            <Nav className="row">
                <NavItem>
                    <Link to={CLIENT_URLS.posts}>Feed</Link>
                </NavItem>
                <NavItem>
                    <Link to={CLIENT_URLS.profile}>Profile</Link>
                </NavItem>
                <NavAuthToggle isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Nav>
        </Navbar>
    );
}