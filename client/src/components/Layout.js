import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

// This component serves purely as a "wrapper" around the main page content
export default function Layout(props) {
    return (
        <Container className="py-5">
            <Outlet />
        </Container>
    );
}