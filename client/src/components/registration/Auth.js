import React, { useState } from "react";
import { Button } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth(props) {
    const [isLogin, setIsLogin] = useState(true);

    function switchMode(e) {
        setIsLogin(!isLogin);
    }

    return (
        <div className="border-round bg-light p-4">
            { isLogin ?
                <Login />
                :
                <Signup />
            }
            <div className="d-flex justify-content-center">
                <Button onClick={switchMode} color="dark" className="text-light btn-login w-100 mt-2">
                    { isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In" }
                </Button>
            </div>
        </div>
    );
}