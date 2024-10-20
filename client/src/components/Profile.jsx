import { useState, useEffect } from "react";
import axios from "axios";
// import {Register, Login} from './components/Login';

// export default function Profile() {
//     const [user, setUser] = useState(null);
//     // get the profile data
//     const requestData = async () => {
//       try {
//         const { data } = await axios("/api/auth/profile", {
//           headers: {
//             authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });
//         setUser(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     useEffect(() => {
//       requestData();
//     }, []);
  
//     return (
//       <div>
//         This is the user profile
//         {user && <p>{user.message}</p>}
//       </div>
//     );
//   }

function Profile() {


    return (
      <>
          <h1>Fridge to fork</h1>
      </>
    )
  }










export default Profile