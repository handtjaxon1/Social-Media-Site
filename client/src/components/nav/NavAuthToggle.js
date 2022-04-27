import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "reactstrap";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function NavAuthToggle(props) {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    function isTokenValid() {
        return token && token !== "" && token !== undefined;
    }

    function toLogin(e) {
        e.preventDefault();
        navigate(CLIENT_URLS.auth);
    }

    function toLogout(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        navigate(CLIENT_URLS.home);
    }

    return (
        <>
            <NavItem>
            { isTokenValid() && <Link to={CLIENT_URLS.empty} onClick={toLogout}>Logout</Link> }
            </NavItem>
            {/* <NavItem>
            { isTokenValid() ?
                <Link to={CLIENT_URLS.empty} onClick={toLogout}>Logout</Link>
                :
                <Link to={CLIENT_URLS.empty} onClick={toLogin}>Login</Link>
            }
            </NavItem> */}
        </>
    );
}