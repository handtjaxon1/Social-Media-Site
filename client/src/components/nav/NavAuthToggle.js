import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "reactstrap";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function NavAuthToggle(props) {
    const {isLoggedIn, setIsLoggedIn} = props;
    const navigate = useNavigate();

    function toLogin(e) {
        e.preventDefault();
        setIsLoggedIn(true); // TODO Should only set this if the request is successful
        navigate(CLIENT_URLS.auth);
    }

    function toLogout(e) {
        e.preventDefault();
        setIsLoggedIn(false); // TODO Should only set this if the request is successful
        navigate(CLIENT_URLS.home);
    }

    return (
        <>
            <NavItem>
            { isLoggedIn ?
                <Link to={CLIENT_URLS.empty} onClick={toLogout}>Logout</Link>
                :
                <Link to={CLIENT_URLS.empty} onClick={toLogin}>Login</Link>
            }
            </NavItem>
        </>
    );
}