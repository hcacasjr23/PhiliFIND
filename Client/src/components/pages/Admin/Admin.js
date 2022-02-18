import React, { useState } from 'react';

// Import components
import { Button } from '@mui/material';
import { Admin, Resource, useDataProvider } from 'react-admin';
import lb4Provider from 'react-admin-lb4';
import Swal from 'sweetalert2';

// Import Login Form
import LoginForm from '../LoginForm/LoginForm';
import DataList from '../../DataList/dataList';




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
  }

  const Logout = () => {
    console.log("Logout")
    setUser({ userName: "" })
  }


  return (
    <div>
      {/* if Logged in this will show */}
      {(user.userName != "") ? (
        <div className="welcome-container">

          <Admin dataProvider={'http://localhost/philiFIND/getData.php'}>
            <Resource name='data' list={DataList}/>
          </Admin>

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