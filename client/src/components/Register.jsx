import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; 

function Register() {
    const [UserName, setUserName] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Preference, setPreference] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/users/register", {
                UserName,
                FirstName,
                LastName,
                Email,
                Password,
                Preference,
            });

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setErrorMessage(null);
            } else {
                setErrorMessage("Registration failed. Please try again.");
                setSuccessMessage(null);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
            setSuccessMessage(null);
        }
    };

    return (

        <div className="register-form-container">
        <form onSubmit={handleRegisterSubmit}>
            <input type="text" placeholder="Choose a username" value={UserName} onChange={(e) => setUserName(e.target.value)} />
            <input type="text" placeholder="First name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Choose a password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            <select value={Preference} onChange={(e) => setPreference(e.target.value)}>
                <option value="" disabled>Select your preference</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Glutenfree">Glutenfree</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
                <option value="">Anything goes!</option>
            </select>
            <button type="submit">Register</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
        </div>
    );
}

export default Register;
