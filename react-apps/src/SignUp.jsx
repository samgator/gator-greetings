function SignUp() {
    return(
        <div className="container">
            <div className="login">
                <img src="https://placehold.co/200"></img> {/* Enter logo here later */}
                <h1>Create Your<br/>GatorGreetings Account</h1>
                <div><input type="text" placeholder="Email address"/></div>
                <div><input type="password" placeholder="Password"/></div>
                <div><input type="password" placeholder="Confirm Password"/></div>
                <button className="loginBTN">Create Account</button>
            </div>
        </div>
    );
}

export default SignUp