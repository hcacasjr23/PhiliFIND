import React, { useEffect, useState } from 'react';

// Import components
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { Axios } from 'axios';


// Import Css
import './Admin.css'

// Import Login Form
import LoginForm from '../LoginForm/LoginForm';
import { Dashboard } from '@mui/icons-material';
import simpleRestProvider from 'ra-data-simple-rest';
import axios from 'axios';


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
    customClass: ({
      popup: 'admin-popup',
    })
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
        width: 300,
      })
    } else {
      //Failed Sign in Toast
      Toast.fire({
        icon: 'error',
        title: 'Incorrect Login Details',
        width: 305,
      })
    }
    console.log('http://localhost/PhiliFIND/Client/src/api/getFoundData.php')
  }

  const Logout = () => {
    console.log("Logout")
    setUser({ userName: "" })
  }

  const Debug = () => {
    console.log("")
  }
  const [foundItem, setFoundItem] = useState([])
  useEffect(() => {
    fetch("http://localhost/PhiliFIND/Client/src/api/getFoundData.php")
      .then(result => result.json())
      .then(
        (res) => {
          setFoundItem(res);
          console.log(res)
        }
      )
  }, [])

  const [status, setStatus] = useState ({
    retrieve: false,
    reported: false,
    delete_status: 'deleted' 
  })


  const deleteData = async (id) => {
    await fetch('http://localhost/PhiliFIND/Client/src/api/getFoundData.php/${id}', {
      method: 'DELETE'
    })
    console.log('delete', id)
    // setFoundItem(foundItem.filter((item) => item.id !== id))
    if (setFoundItem(foundItem.filter((item) => item.id !== id))){

      setFoundItem(foundItem.filter((status) => status.fd_status[id] == 'deleted'))
    }
    else {
      setFoundItem(foundItem.filter((status) => status.fd_status == 'show'))
    }

  }

  const changeStatus = (event) => {
    console.log('status', event)
    setFoundItem(foundItem.fd_status = status.delete_status)

  }


  const voidReport = (event) => {

    console.log('status', event)

    // Update to Database
    // axios.put('http://localhost/PhiliFIND/Client/src/api/delete.php')

    axios({
      method: 'PUT',
      url: 'http://localhost/PhiliFIND/Client/src/api/delete.php',
      headers: {
        'content-type': 'application/json'
      },
      data: foundItem.id
    })
    .then(result => {
      console.log(result.data)
    });


    // axios.put('http://localhost/philiFIND/getFoundData.php', foundItem.fd_status = statuss)
  }

  return (
    <div>
      {/* if Logged in this will show */}
      {(user.userName != "") ? (
        <div className="welcome-container">
          <h2>Welcome, <span>{user.userName}</span></h2>
          <Button variant="contained" color="error" onClick={Logout}>Logout</Button>
          <div className="title-container my-4 text-uppercase">
            <h1>Welcome to Admin Page, <span>{user.userName}</span></h1>
          </div>
          {/* Imma use table for this section */}
          <table className='data-table'>
            <thead className='thead-1'>
              <tr className='trow-1'>
                <th>Item Found</th>
                <th>Brand/Breed</th>
                <th>Date Found</th>
                <th>Time Found</th>
                <th>Color</th>
                <th>Category</th>
                <th>Additional Information</th>
                <th>Location/Place</th>
                <th>Name</th>
                <th>Email</th>
                <th>Primary Contact Information</th>
                <th>Secondary Contact Information</th>
                <th id='status-container'>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foundItem.map(item => (
                <tr key={item.id}>
                  <td>{item.fd_item}</td>
                  <td>{item.fd_brand}</td>
                  <td>{item.fd_date}</td>
                  <td>{item.fd_time}</td>
                  <td>{item.fd_color}</td>
                  <td>{item.fd_category}</td>
                  <td>{item.fd_addinfo}</td>
                  <td>{item.fd_place}</td>
                  <td>{item.fd_name}</td>
                  <td>{item.fd_email}</td>
                  <td>{item.fd_pcontact}</td>
                  <td>{item.fd_scontact}</td>
                  <td>
                    <Button id="void" variant="contained" color="secondary" style={{backgroundColor:"#2986cc"}} onClick={() => voidReport(item.fd_status = status.delete_status)}>Change Status</Button>
                    <Button id="delete"variant="contained" color="secondary" style={{backgroundColor:"#FF0000"}} onClick={() => deleteData(item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          <div className='side-navbar-placeholder'></div>
        </div>

        // If not yet logged in, auto redirected to login form
      ) : (
        <LoginForm Login={Login} />

      )}
    </div>
  )
}

export default AdminPage;