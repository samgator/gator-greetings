function Login() {
    return(
        <div className="container">
            <div className="login">
                <img src="https://placehold.co/200"></img> {/* Enter logo here later */}
                <h1>Welcome to GatorGreetings</h1>
                <h2>Please log in or sign up below</h2>
                <div><input type="text" placeholder="Email address"/></div>
                <div><input type="password" placeholder="Password"/></div>
            </div>
        </div>
    );
}

export default Login