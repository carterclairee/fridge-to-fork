import { useState, useEffect } from "react";
import axios from "axios";
import './css/Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch the profile data from the backend
  const requestData = async () => {
    try {
      const { data } = await axios.get("/api/users/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data);
      setEditData(data); // Set initial editData
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  // Handle input change for editing
  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Save the edited profile data
  const saveProfile = async () => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, editData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser({
        ...editData,
      }); // Update user with saved data from the backend
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  // Delete the user profile
  const deleteProfile = async () => {
    try {
      await axios.delete(`/api/users/${user.id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(null); // Clear user data after deletion
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  return (
    <div className="fridge-background">
      <div className="profile-form-container">
        <h4>Profile Settings</h4>
        {user ? (
          <div>
            {isEditing ? (
              <>
                <p className="labels">
                  User Name:{" "}
                  <input
                    type="text"
                    name="UserName"
                    value={editData.UserName}
                    onChange={handleEdit}
                    placeholder="Name"
                  />
                </p>
                <p className="labels">
                  First Name:{" "}
                  <input
                    type="text"
                    name="FirstName"
                    value={editData.FirstName}
                    onChange={handleEdit}
                  />
                </p>
                <p className="labels">
                  Last Name:{" "}
                  <input
                    type="text"
                    name="LastName"
                    value={editData.LastName}
                    onChange={handleEdit}
                  />
                </p>
                <p className="labels">
                  Email:{" "}
                  <input
                    type="email"
                    name="Email"
                    value={editData.Email}
                    onChange={handleEdit}
                  />
                </p>
                <p className="labels">
                  Preference:{" "}
                  <input
                    type="text"
                    name="Preference"
                    value={editData.Preference}
                    onChange={handleEdit}
                  />
                </p>
                <div class="button-container">
                <button className="profile-button" onClick={saveProfile}>
                  Save
                </button>
                <button className="profile-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                </div>
              </>
            ) : (
              <>
                <p className="labels">User Name: {user.UserName}</p>
                <p className="labels">First Name: {user.FirstName}</p>
                <p className="labels">Last Name: {user.LastName}</p>
                <p className="labels">Email: {user.Email}</p>
                <p className="labels">Preference: {user.Preference}</p>
                <div class="button-container">
                <button className="profile-button" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="profile-button" onClick={deleteProfile}>
                  Delete
                </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
    </div>
  );
}




















