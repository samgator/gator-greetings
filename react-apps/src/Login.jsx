function Login() {
    return (
        <div className="container">
            <div className="login">
                <img src="https://placehold.co/200" alt="GatorGreetings Logo" className="logo"/> 
                <h1 className="title">Welcome to GatorGreetings</h1>
                <h2 className="subtitle">Please log in or sign up below</h2>
                <div>
                    <input type="email" placeholder="Email address" className="input-field"/>
                </div>
                <div>
                    <input type="password" placeholder="Password" className="input-field"/>
                </div>
                <button className="login-btn">Log In</button>
                <button className="signup-btn">Sign Up</button>
            </div>
        </div>
    );
}

export default Login;