import React, {useState}from "react";
import axios from "axios";
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
        <option value="Ketogenic">Ketogenic</option>
        <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
        <option value="Ovo-Vegetarian">Pescetarian</option>
        <option value="Pescetarian">Ovo-Vegetarian</option>
        <option value="Paleo">Paleo</option>
        <option value="Primal">Primal</option>
        <option value="Low FODMAP">Low FODMAP</option>
        <option value="Whole30">Whole30</option>
        <option value="">Anything goes!</option>
         </select>

        <button type="submit">Register</button>
      {errorMessage && <p>{errorMessage}</p>}


    </form>
   );     

   }
/*
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
*/


function Login() {
    const [credentials, setCredentials] = useState({
      UserName: "Test",
      Password: "Test",
    });
  
    const [data, setData] = useState(null);
  
    const { UserName, Password } = credentials;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
    const login = async () => {
      // send a POST request to /api/auth/login with the username and password
      try {
        // axios return a data object with the response from the server
        const { data } = await axios("/api/users/login", {
          method: "POST",
          data: credentials,
        });
  
        console.log(data);
        setData(data.message);
  
        //store it locally
        localStorage.setItem("token", data.token);
      } catch (error) {
        console.log(error);
        setData(error.message);
      }
    };

    const logout = () => {
        // remove the token from the local storage
        localStorage.removeItem("token");
        setData(null);
      };
    
      // get the profile data
      const requestData = async () => {
        try {
          const { data } = await axios("/api/users/profile", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
    
          console.log(data);
          setData(data.UserName);
        } catch (error) {
          console.log(error);
          setData(error.message);
        }
      };



/*
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


); */


return (
    <div>
      <div>
        <input
          value={UserName}
          onChange={handleChange}
          name="UserName"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={Password}
          onChange={handleChange}
          name="Password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );




}
export { Register, Login }; 