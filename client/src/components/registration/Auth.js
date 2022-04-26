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
        <div>
            { isLogin ?
                <Login />
                :
                <Signup />
            }
            <Button onClick={switchMode} color="dark" className="text-light">
                { isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In" }
            </Button>
        </div>
    );
}