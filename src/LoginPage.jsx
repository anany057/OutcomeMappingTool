import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import './LoginPage.css';

const LoginForm = ({ onLogin }) => {
    // State variables to store username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle changes in the username input field
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle changes in the password input field
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Perform login validation here (e.g., check credentials against a database)
        // For demonstration purposes, let's assume valid login if both username and password are non-empty
        if (username.trim() !== "" && password.trim() !== "") {
            // Call the onLogin function passed as a prop
            onLogin();
        } else {
            alert("Invalid username or password."); // Replace this with actual login logic
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    <FaUserAlt className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <input type="checkbox" />
                    <label>Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account?<a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
