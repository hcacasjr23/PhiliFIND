import React, { useEffect, useState } from 'react';

// Import components
import { Button } from '@mui/material';
import { Admin, Resource, fetchUtils } from 'react-admin';

import Swal from 'sweetalert2';

// Import Login Form
import LoginForm from '../LoginForm/LoginForm';
import DataList from '../../DataList/dataList';
import { Dashboard } from '@mui/icons-material';
import simpleRestProvider from 'ra-data-simple-rest';




function AdminPage() {
  const adminUser = {
    userName: 'admin',
    password: 'admin'
  }

  const [user, setUser] = useState({
    userName: ""
  })

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
  })

  const Login = details => {
    console.log(details)

    if (details.userName == adminUser.userName && details.password == adminUser.password) {
      console.log('Logged In');
      setUser({
        userName: details.userName
      });
      //Successful Sign in Toast
      Toast.fire({
        icon: 'success',
        title: 'Signed In Successfully',
      })
    } else {
      //Failed Sign in Toast
      Toast.fire({
        icon: 'error',
        title: 'Incorrect Login Details',
      })
    }
    console.log('http://localhost/philiFIND/getFoundData.php')
  }

  const Logout = () => {
    console.log("Logout")
    setUser({ userName: "" })
  }
  
  const Debug = () =>{
    console.log("")
  }
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch("http://localhost/philiFIND/getFoundData.php")
        .then(result => result.json())
        .then(
            (res) => {
                setItems(res);
            }
        )
}, [])



  return (
    <div>
      {/* if Logged in this will show */}
      {(user.userName != "") ? (
        <div className="welcome-container">
          {/* Imma use table for this section */}
          
          
        

          <h2>Welcome, <span>{user.userName}</span></h2>
          <Button variant="contained" color="error" onClick={Logout}>Logout</Button>
        </div>

        // If not yet logged in, auto redirected to login form
      ) : (
        <LoginForm Login={Login} />

      )}
    </div>
  )
}

export default AdminPage;