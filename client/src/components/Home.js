import React from "react";
import { Row, Col } from "reactstrap";
import Auth from "./registration/Auth";

export default function Home(props) {
    return(
        <div>
            <Row className="g-5 justify-content-between flex-column flex-md-row">
                <Col className="col-12 col-lg-5">
                    <h1 className="display-1 mb-5">OurSpace</h1>
                    <p className="display-4">
                        Where your world and our world collide.
                    </p>
                </Col>
                <Col className="col-12 col-lg-5">
                    <Auth />
                </Col>
            </Row>
        </div>
    );
}