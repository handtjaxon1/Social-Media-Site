import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";

export default function Navigation(props) {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    function isTokenValid() {
        return token && token !== "" && token !== undefined;
    }

    function handleLogout(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Navbar className="shadow border border-secondary">
            <Container className="d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand">
                    <img src="/imgs/ourspace.png" alt="Company Logo" style={{ height: "64px", width: "64px" }}/>
                </Link>
                <Nav>
                { isTokenValid() &&
                    <>
                    <NavItem className="me-3">
                        <Link to="/posts">Feed</Link>
                    </NavItem>
                    <NavItem className="me-3">
                        <Link to="/profile">Profile</Link>
                    </NavItem>
                    <NavItem className="me-3">
                        <Link to="" onClick={handleLogout}>Logout</Link>
                    </NavItem>
                    </>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}