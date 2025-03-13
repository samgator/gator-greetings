import {useState} from "react";
function Login() {
    //useStates determine loaded page (login/signup)
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPassword_Confirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(null);

    function loadLogin(){
        setPage(prevPage => "login");
    }
    function loadSignUp(){
        setPage(prevPage => "signup");
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
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError("");
       
        const response = await fetch("http://localhost:5050/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        console.log(data);
    }

    // function to use login route upon user signup
    async function handleLogin() {
        const response = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);
    }

    if(page == "login"){
        return (
            <div className="container">
                <div className="card">
                    <img src="/src/assets/logo.png" alt="GatorGreetings Logo" className="logo"/> 
                    <h1 className="title">Welcome to GatorGreetings</h1>
                    <h2 className="subtitle">Please log in or sign up below</h2>
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
                    <div style = {{color:"red"}}>{passwordError}</div>
                    <button className="blue-btn" onClick={addUser}>Create Account</button>
                    <button className="orange-btn" onClick={loadLogin}>Back to Login</button>
                </div>
            </div>
        );
    }
}
    

export default Login;