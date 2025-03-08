import {useState} from "react";
function Login() {
    //useStates determine loaded page (login/signup)
    const [page, setPage] = useState("login")
    function loadLogin(){
        setPage(prevPage => "login")
    }
    function loadSignUp(){
        setPage(prevPage => "signup")
    }

    if(page == "login"){
        return (
            <div className="container">
                <div className="card">
                    <img src="/src/assets/logo.png" alt="GatorGreetings Logo" className="logo"/> 
                    <h1 className="title">Welcome to GatorGreetings</h1>
                    <h2 className="subtitle">Please log in or sign up below</h2>
                    <div>
                        <input type="email" placeholder="Email address" className="input-field"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input-field"/>
                    </div>
                    <button className="blue-btn">Log In</button>
                    <button className="orange-btn" onClick={loadSignUp}>Sign Up</button>
                    <button><img src="/src/assets/google.png" height={30} width={30}></img> 
                    Sign in with Google
                    </button>
                </div>
            </div>
        );
    }
    else if(page == "signup"){
        return (
            <div className="container">
                <div className="card">
                    <img src="/src/assets/logo.png" alt="GatorGreetings Logo" className="logo"/> 
                    <h1 className="title">Create Your<br/>GatorGreetings Account</h1>
                    <div>
                        <input type="text" placeholder="Username" className="input-field"/>
                    </div>
                    <div>
                        <input type="email" placeholder="Email address" className="input-field"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input-field"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" className="input-field"/>
                    </div>
                    <button className="blue-btn">Create Account</button>
                    <button className="orange-btn" onClick={loadLogin}>Back to Login</button>
                </div>
            </div>
        );
    }
}
    

export default Login;