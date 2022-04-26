import React, { useState } from "react";
import { Button } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth(props) {
    const [isLogin, setIsLogin] = useState(true);

    function switchMode(e) {
        e.preventDefault();
        setIsLogin(!isLogin);
    }

    return (
        <div>
            { isLogin ?
                <Login />
                :
                <Signup />
            }
            <Button onClick={switchMode} color="text-primary">
                { isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In" }
            </Button>
        </div>
    );
}