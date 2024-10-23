import React, {useState, useContext}from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
{/*import { use } from "../../../routes/users"; */}


function Register(){

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
              console.log("Registration successful");
              setSuccessMessage(response.data.message); 
              setErrorMessage(null); 
            } else {
              setErrorMessage("Registration failed. Please try again.");
              setSuccessMessage(null);
            }
          } catch (error) {
            
            console.error("Error during registration:", error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
            setSuccessMessage(null);
          }
        };
            

            {/*if (response.ok){
                console.log("registration");
            } else {
                setErrorMessage("Registration failed");
            }
            } catch (error) {
                setErrorMessage(error.message);
            }
      
        }; */}

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
     
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

    </form>
   );     

   }


function Login() {
    const [credentials, setCredentials] = useState({
      UserName: "",
      Password: "",
    });
  
    { /*const [data, setData] = useState(null); */}
  
    const { UserName, Password } = credentials;

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
    const login = () => {
      auth.login(credentials);
      navigate("/")

    };

    const logout = () => {
      auth.logout();
    };


    {/*  try {
        
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
      }; */} 





return (
    <div>
      <div>
        <input
          value={UserName}
          onChange={handleChange}
          name="UserName"
          type="text"
          placeholder="User"
          className="form-control mb-2"
        />
        <input
          value={Password}
          onChange={handleChange}
          name="Password"
          type="password"
          placeholder="Password"
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
      
     {/* <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
      

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
      */}

    </div>
  );




}
export { Register, Login }; 