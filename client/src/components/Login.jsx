import React, {useState}from "react";
{/*import { use } from "../../../routes/users"; */}


function Register(){

    const [UserName, setUserName] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Preference, setPreference] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);
    

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ UserName, FirstName, LastName, Email, Password, Preference }),
            });

            if (response.ok){
                console.log("registration");
            } else {
                setErrorMessage("Registration failed");
            }
            } catch (error) {
                setErrorMessage(error.message);
            }
      
        };

   return (
    <form onSubmit={handleRegisterSubmit}>

        <input 
        type="text"
        placeholder= "Choose a user name" 
        value={UserName} onChange={(e) => setUserName(e.target.value)} />
        <input 
        type="text"
        placeholder= " First name" 
        value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
        <input 
        type="text"
        placeholder= " Last name"
        value={LastName} onChange={(e) => setLastName(e.target.value)} />
        <input
        type="text"
        placeholder= "Add your Email"
        value={Email} onChange={(e) => setEmail(e.target.value)} />
        <input 
        type="password"
        placeholder= "choose a password"
        value={Password} onChange={(e) => setPassword(e.target.value)} />
        
        <select 
        value={Preference} onChange={(e) => setPreference(e.target.value)}>

        <option value="" disabled>Select your preference</option>
        <option value="Vegan">Vegan</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Glutenfree">Glutenfree</option>
        <option value="Diabetesfriendly">Diabetes friendly</option>
        <option value="Lactosfree">Lactosfree</option>
        <option value="Kidsfriendly">Kids friendly</option>
        <option value="">Anything goes!</option>
         </select>

        <button type="submit">Register</button>
      {errorMessage && <p>{errorMessage}</p>}


    </form>
   );     

   }

function Login(){

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleLoginSubmit = async (event) => {
        event.preventDefault(); 
    
        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ UserName, Password }),
              });
       
         if (response.ok) {
            console.log("Login successful");
        }else {
            setErrorMessage("Login failed");
        }   
    } catch (error){
        setErrorMessage(error.message);
    }
};

return (
    
    <form onSubmit={handleLoginSubmit}>
      
      <input 
      type="text"
      placeholder= "Username" 
      value={UserName} onChange={(e) => setUserName(e.target.value)}/>
      <input 
      type="password"
      placeholder= "Password"
      value={Password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>


);
}
export { Register, Login }; 