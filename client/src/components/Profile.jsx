import { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css';


export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...user });
    // get the profile data
    const requestData = async () => {
      try {
        const { data } = await axios("/api/users/profile", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      requestData();
    }, []);

    // Handle input change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };


  // Save the edited profile data
  const saveProfile = () => {
    setUser({ ...editData });
    setIsEditing(false);
  };

  // Delete user profile (reset to empty data)
  const deleteProfile = () => {
    setUser(null);
  };
  
    return (
      // <>
      <div className="profile-form-container">
            {/* <h4 class="text-right">Profile Settings</h4> */}
            <h4>Profile Settings</h4>
            {user && <div>
          {}
          <p class="labels"> User Name: {user.UserName}</p>
          <p class="labels">First Name: {user.FirstName}</p>
          <p class="labels">Last Name: {user.LastName}</p>
          <p class="labels">Email: {user.Email}</p>
          <p class="labels">Preference: {user.Preference}</p> 
          </div>}
          <div class="button-container">
          <button class="profile-edit-button" type="submit">Edit</button>
          <button class="profile-delete-button" type="submit">Delete</button>
          </div>
        {}
    
      </div>
      // </>
    );

    
  }












