import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";
import NavAuthToggle from "./NavAuthToggle";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function Navigation(props) {
    return (
        <Navbar>
            <Container className="d-flex justify-content-between align-items-center">
                <NavbarBrand>
                    <Link to={CLIENT_URLS.home}>
                        <img src="..." alt="Company Logo" />
                    </Link>
                </NavbarBrand>
                <Nav>
                    <NavItem className="me-3">
                        <Link to={CLIENT_URLS.posts}>Feed</Link>
                    </NavItem>
                    <NavItem className="me-3">
                        <Link to={CLIENT_URLS.profile}>Profile</Link>
                    </NavItem>
                    <NavAuthToggle className="me-3" />
                </Nav>
            </Container>
        </Navbar>
    );
}