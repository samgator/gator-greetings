import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Login() {
    //useStates determine loaded page (login/signup)
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPassword_Confirm] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(null);

    function loadLogin(){
        setPage(prevPage => "login");
        setMessage(<>Create Your<br/>GatorGreetings Account</>);
    }
    function loadSignUp(){
        setPage(prevPage => "signup");
        setMessage("Please log in or sign up below");
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePassword_ConfirmChange = (e) => {
        setPassword_Confirm(e.target.value);
    };

    // function to use register route upon user signup
    async function addUser() {

        if (password != password_confirm){
            setMessage("Passwords do not match");
            return;
        }
       
        const response = await fetch("http://localhost:5050/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        
        if (response.ok) {
            setMessage("Account created successfully!");
            loadLogin();
        } else {
            setMessage(data.message || "Sign Up Failed.");
        }
    }

    // function to use login route upon user signup
    const navigate = useNavigate();
    async function handleLogin() {
        const response = await fetch("http://localhost:5050/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data._id);
            navigate('home');
        } else {
            setMessage(data.message || "Login Failed.");
        }
    }

    if(page == "login"){
        return (
            <div className="container">
                <div className="card">
                    <img src="/src/assets/logo.png" alt="GatorGreetings Logo" className="logo"/> 
                    <h1 className="title">Welcome to GatorGreetings</h1>
                    <h2 className="subtitle">{message || "Please log in or sign up below"}</h2>
                    <div>
                        <input type="email" value={email} placeholder="Email address" className="input-field" onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <input type="password" value={password} placeholder="Password" className="input-field" onChange={handlePasswordChange}/>
                    </div>
                    <button className="blue-btn" onClick={handleLogin}>Log In</button>
                    <button className="orange-btn" onClick={loadSignUp}>Sign Up</button>
                    <button className="google-signin">
                        <img src="/src/assets/google.png" height={30} width={30}></img> 
                        <div>Sign in with Google</div>
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
                    <h2 className="subtitle">{message || <>Create Your<br/>GatorGreetings Account</>}</h2>
                    <div>
                        <input type="text" value={username} placeholder="Username" className="input-field" onChange={handleUsernameChange}/>
                    </div>
                    <div>
                        <input type="email" value={email} placeholder="Email address" className="input-field" onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <input type="password" value={password} placeholder="Password" className="input-field" onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <input type="password" value={password_confirm} placeholder="Confirm Password" className="input-field" onChange={handlePassword_ConfirmChange}/>
                    </div>
                    <button className="blue-btn" onClick={addUser}>Create Account</button>
                    <button className="orange-btn" onClick={loadLogin}>Back to Login</button>
                </div>
            </div>
        );
    }
}
    

export default Login;