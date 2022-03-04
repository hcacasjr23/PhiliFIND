import React, { useEffect, useState} from 'react';
import { useParams, useHistory, generatePath } from 'react-router-dom';
// Import components
import { Button, responsiveFontSizes } from '@mui/material';
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
    console.log('http://localhost/PhiliFIND/Client/src/api/GetData/getFoundData.php')
  }

  const Logout = () => {
    console.log("Logout")
    setUser({ userName: "" })
  }

  const Debug = () => {
    console.log("")
  }

  function returnValue(value) {
    return value;
  }

  // Getting Data
  const [foundItem, setFoundItem] = useState([])
  useEffect(() => {
    fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getFoundData.php")
    .then(result => result.json())
    .then(
      (res) => {
        setFoundItem(res);
        console.log(res)
      }
      )
    }, [2])

    const [lostItem, setLostItem] = useState([])
    useEffect(() => {
      fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getLostData.php")
      .then(result => result.json())
      .then(
        (res) => {
          setLostItem(res);
          console.log(res)
        }
        )
      }, [])

      // Getting Deleted Data
    const [foundDeletedData, setFoundDeletedData] = useState([])
    useEffect(() => {
      fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getFoundDeletedData.php")
        .then(result => result.json())
        .then(
          (res) => {
            setFoundDeletedData(res);
            console.log(res)
          }
        )
    }, [])

    const [lostDeletedData, setLostDeletedData] = useState([])
    useEffect(() => {
      fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getLostDeletedData.php")
        .then(result => result.json())
        .then(
          (res) => {
            setLostDeletedData(res);
            console.log(res)
          }
        )
    }, [])


    // Request Deletion/Hide of Posts
    async function foundDeleteRequest (event) {
    
      let fd = new FormData()
      fd.append('id', event)
      let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/DeleteData/foundDelete.php', fd)
      let data = res.data
      console.log(data) 
      console.log(res.status)
    }
    async function lostDeleteRequest (event) {
    
      let lt = new FormData()
      lt.append('id', event)
      let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/DeleteData/lostDelete.php', lt)
      let data = res.data
      console.log(data) 
      console.log(res.status)
    }
    
    // Constant Function for manipulating show => delete
    const foundDeleteData =(id) => {
      console.log('delete', id)
      setFoundItem(foundItem.filter((fItem) => fItem.id !== id))
      foundDeleteRequest(id)
      
    }

    const lostDeleteData =(id) => {
      console.log('delete', id)
      setLostItem(lostItem.filter((lItem) => lItem.id !== id))
      lostDeleteRequest(id)
      
    }

     // Constant Function for manipulating deleted => show

     async function foundRestoreRequest (event) {
    
      let foundID = new FormData()
      foundID.append('id', event)
      let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/RestoreData/foundRestore.php', foundID)
      let data = res.data
      console.log(data) 
      console.log(res.status)
    }
    async function lostRestoreRequest (event) {
    
      let lostID = new FormData()
      lostID.append('id', event)
      let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/RestoreData/lostRestore.php', lostID)
      let data = res.data
      console.log(data) 
      console.log(res.status)
    }
    const foundRestoreData =(id) => {
      console.log('restore', id)
      // setFoundItem(foundItem.filter((frData) => frData.id !== id))
      foundRestoreRequest(id)
      
    }

    const lostRestoreData =(id) => {
      console.log('restore', id)
      setLostItem(lostItem.filter((lrData) => lrData.id !== id))
      lostRestoreRequest(id)
      
    }

    
    return (
      <div>
                {/* if Logged in this will show */}

      {(user.userName != "") ? (
        <div className="welcome-container">
          <h1>Found Data Table</h1>
          {/* Table for Found*/}
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
              {foundItem.map(fd_items => (
                <tr key={fd_items.id}>
                  <td>{fd_items.fd_item}</td>
                  <td>{fd_items.fd_brand}</td>
                  <td>{fd_items.fd_date}</td>
                  <td>{fd_items.fd_time}</td>
                  <td>{fd_items.fd_color}</td>
                  <td>{fd_items.fd_category}</td>
                  <td>{fd_items.fd_addinfo}</td>
                  <td>{fd_items.fd_place}</td>
                  <td>{fd_items.fd_name}</td>
                  <td>{fd_items.fd_email}</td>
                  <td>{fd_items.fd_pcontact}</td>
                  <td>{fd_items.fd_scontact}</td>
                  <td>{fd_items.fd_status}</td>
                  <td>
                    <Button id="delete"variant="contained" color="secondary" style={{backgroundColor:"#FF0000"}} onClick={() => foundDeleteData(fd_items.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>


            <h1>Lost Data Table</h1>
            <div className="lost-table">
              {/* Table for Lost*/}
              <table className='data-table'>
                <thead className='thead-1'>
                  <tr className='trow-1'>
                    <th>Item Lost</th>
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
                  {lostItem.map(lt_items => (
                    <tr key={lt_items.id}>
                      <td>{lt_items.lt_item}</td>
                      <td>{lt_items.lt_brand}</td>
                      <td>{lt_items.lt_date}</td>
                      <td>{lt_items.lt_time}</td>
                      <td>{lt_items.lt_color}</td>
                      <td>{lt_items.lt_category}</td>
                      <td>{lt_items.lt_addinfo}</td>
                      <td>{lt_items.lt_place}</td>
                      <td>{lt_items.lt_name}</td>
                      <td>{lt_items.lt_email}</td>
                      <td>{lt_items.lt_pcontact}</td>
                      <td>{lt_items.lt_scontact}</td>
                      <td>{lt_items.lt_status}</td>
                      <td>
                        <Button id="delete" variant="contained" color="secondary" style={{ backgroundColor: "#FF0000" }} onClick={() => lostDeleteData(lt_items.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
          </div>

          <h1>Deleted Data Table</h1>
          <div className="deleted-table">
              {/* Table for Lost*/}
              <table className='data-table'>
                <thead className='thead-1'>
                  <tr className='trow-1'>
                    <th>Item Lost</th>
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
                  {lostDeletedData.map(lost => (
                    <tr key={lost.id}>
                      <td>{lost.lt_item}</td>
                      <td>{lost.lt_brand}</td>
                      <td>{lost.lt_date}</td>
                      <td>{lost.lt_time}</td>
                      <td>{lost.lt_color}</td>
                      <td>{lost.lt_category}</td>
                      <td>{lost.lt_addinfo}</td>
                      <td>{lost.lt_place}</td>
                      <td>{lost.lt_name}</td>
                      <td>{lost.lt_email}</td>
                      <td>{lost.lt_pcontact}</td>
                      <td>{lost.lt_scontact}</td>
                      <td>{lost.lt_status}</td>
                      <td>
                        <Button id="restore" variant="contained" color="secondary" style={{ backgroundColor: "#98fb98" }} onClick={() => lostRestoreData(lost.id)}>Restore</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
                  {foundDeletedData.map(found => (
                    <tr key={found.id}>
                      <td>{found.fd_item}</td>
                      <td>{found.fd_brand}</td>
                      <td>{found.fd_date}</td>
                      <td>{found.fd_time}</td>
                      <td>{found.fd_color}</td>
                      <td>{found.fd_category}</td>
                      <td>{found.fd_addinfo}</td>
                      <td>{found.fd_place}</td>
                      <td>{found.fd_name}</td>
                      <td>{found.fd_email}</td>
                      <td>{found.fd_pcontact}</td>
                      <td>{found.fd_scontact}</td>
                      <td>{found.fd_status}</td>
                      <td>
                        <Button id="restore" variant="contained" color="secondary" style={{ backgroundColor: "#98fb98" }} onClick={() => foundRestoreData(found.id)}>Restore</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              
          </div>

          <Button variant="contained" color="error" className='logout-button' onClick={Logout}>Logout</Button>

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