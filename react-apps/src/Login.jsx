import { useState } from "react";

function Login() {

    const [page, setPage] = useState("login")
    function loadLogin(){
        setPage(prevPage => "login")
    }
    function loadSignUp(){
        setPage(prevPage => "signup")
    }

    if(page == "login"){
        return(
            <div className="container">
                <div className="login">
                    <img src="https://placehold.co/200"></img> {/* Enter logo here later */}
                    <h1>Welcome to GatorGreetings</h1>
                    <h2>Please log in or sign up below</h2>
                    <div><input type="text" placeholder="Email address"/></div>
                    <div><input type="password" placeholder="Password"/></div>
                    <div>
                        <button className="loginBTN">Log In</button>
                        <button className="loginBTN" onClick={loadSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
    else if (page == "signup"){
        return(
            <div className="container">
            <div className="login">
                <img src="https://placehold.co/200"></img> {/* Enter logo here later */}
                <h1>Create Your<br/>GatorGreetings Account</h1>
                <div><input type="text" placeholder="Email address"/></div>
                <div><input type="password" placeholder="Password"/></div>
                <div><input type="password" placeholder="Confirm Password"/></div>
                <div>
                    <button className="loginBTN">Create Account</button>
                    <button className="loginBTN" onClick={loadLogin}>Back to Login</button>
                </div>
            </div>
        </div>
        );
    }
    
}

export default Login