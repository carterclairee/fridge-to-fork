import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import '../App.css'

export default function Navbar() {
    
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            <span className="navbar-text ms-2">Fridge to Fork</span>🍴
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!isLoggedIn && (

                <>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/Register">
                      Sign up!
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/Login">
                      Login
                    </NavLink>
                  </li>



                  </>
                )}


                

                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        Profile
                      </NavLink>
                    </li>


                    <li className="nav-item">
                      <NavLink className="nav-link" to="/fridge">
                        Fridge
                      </NavLink>
                    </li>

                    <li className="nav-item" onClick={() => logout()}>
                      <NavLink className="nav-link">
                      Logout
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    }