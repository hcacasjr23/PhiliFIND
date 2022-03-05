import React, { useEffect, useState } from 'react';
import { useParams, useHistory, generatePath } from 'react-router-dom';

// Import components
import { Button, responsiveFontSizes } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import DataTable from '../../DataTable.js';
import SideNavBar from '../../SideNavBar/SideNavBar.js';

// Import Css
import './Admin.css'

// Import Login Form
import LoginForm from '../LoginForm/LoginForm';
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
    customClass: ({
      popup: 'admin-popup',
    })
  })

  const [state, setState] = useState({
    status: true
  })


  async function LoginMethod(user, pass) {
    let s = new FormData();
    s.append('username', user);
    s.append('password', pass);
    let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/Login/startSession.php', s)
    let data = res.data
    console.log(data)
    console.log(res.status)

  }
  async function LogoutMethod() {
    let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/Login/destroySession.php')
    let data = res.data
    console.log(data)
    console.log(res.status)

  }
  async function setFalseMethod() {
    let res = await axios.post('http://localhost/PhiliFIND/Client/src/api/Login/setFalseSession.php')
    let data = res.data
    console.log(data)
    console.log(res.status)

  }




  const Login = details => {

    console.log(details)
    setFalseMethod();
    if (details.userName == adminUser.userName && details.password == adminUser.password) {
      LoginMethod(adminUser.userName, adminUser.password)
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
    LogoutMethod();
    console.log("Logout")
    setUser({ userName: "" })
  }


  // Getting Data
  const [foundItem, setFoundItem] = useState([])
  const [lostItem, setLostItem] = useState([])
  const [foundDeletedData, setFoundDeletedData] = useState([])
  const [lostDeletedData, setLostDeletedData] = useState([])

  const getData = async (url, type) => {
    await axios.get(url).then(function (response) {
      if (type === 'foundItem') {
        console.log(response.data);
        setFoundItem(response.data);
      } else if (type === 'lostItem') {
        console.log(response.data);
        setLostItem(response.data);
      } else if (type === 'foundDeletedData') {
        console.log(response.data);
        setFoundDeletedData(response.data);
      } else if (type === 'lostDeletedData') {
        console.log(response.data);
        setLostDeletedData(response.data);
      }
    });
  }

  useEffect(() => {
    getData('http://localhost/PhiliFIND/Client/src/api/GetData/getFoundData.php', 'foundItem');
  }, [setFoundItem])

  useEffect(() => {
    getData('http://localhost/PhiliFIND/Client/src/api/GetData/getLostData.php', 'lostItem');
  }, [setLostItem])

  useEffect(() => {
    getData('http://localhost/PhiliFIND/Client/src/api/GetData/getFoundDeletedData.php', 'foundDeletedData');
  }, [setFoundDeletedData])

  useEffect(() => {
    getData('http://localhost/PhiliFIND/Client/src/api/GetData/getLostDeletedData.php', 'lostDeletedData');
  }, [setLostDeletedData])

  // Request Deletion/Hide of Posts
  async function foundDeleteRequest(event) {
    const fd = new FormData()
    fd.append('id', event)
    const res = await axios.post('http://localhost/PhiliFIND/Client/src/api/DeleteData/foundDelete.php', fd)
    const data = res.data
    console.log(data)
    console.log(res.status)
  }


  async function lostDeleteRequest(event) {

    const lt = new FormData()
    lt.append('id', event)
    const res = await axios.post('http://localhost/PhiliFIND/Client/src/api/DeleteData/lostDelete.php', lt)
    const data = res.data
    console.log(data)
    console.log(res.status)
  }

  // Constant Function for manipulating show => delete
  const foundDeleteData = (id) => {
    console.log('delete', id)
    setFoundItem(foundItem.filter((fItem) => fItem.id !== id))
    foundDeleteRequest(id)

  }

  const lostDeleteData = (id) => {
    console.log('delete', id)
    setLostItem(lostItem.filter((lItem) => lItem.id !== id))
    lostDeleteRequest(id)

  }

  // Constant Function for manipulating deleted => show

  async function foundRestoreRequest(event) {

    const foundID = new FormData()
    foundID.append('id', event)
    const res = await axios.post('http://localhost/PhiliFIND/Client/src/api/RestoreData/foundRestore.php', foundID)
    const data = res.data
    console.log(data)
    console.log(res.status)
  }
  async function lostRestoreRequest(event) {

    const lostID = new FormData()
    lostID.append('id', event)
    const res = await axios.post('http://localhost/PhiliFIND/Client/src/api/RestoreData/lostRestore.php', lostID)
    const data = res.data
    console.log(data)
    console.log(res.status)
  }
  const foundRestoreData = (id) => {
    console.log('restore', id)
    setFoundDeletedData(foundDeletedData.filter((frData) => frData.id !== id))
    foundRestoreRequest(id)
  }

  const lostRestoreData = (id) => {
    console.log('restore', id)
    setLostDeletedData(lostDeletedData.filter((lrData) => lrData.id !== id))
    lostRestoreRequest(id)
  }

  const [showLiveLost, setShowLiveLost] = useState(true);
  const [showLiveFound, setShowLiveFound] = useState(false);
  const [showDeletedLost, setShowDeletedLost] = useState(false);
  const [showDeletedFound, setShowDeletedFound] = useState(false);

  const handleShow = (show) => {
    if (show === 'showLiveLost' && showLiveLost === false) {
      setShowLiveLost(true);
      setShowLiveFound(false);
      setShowDeletedLost(false);
      setShowDeletedFound(false);
    } else if (show === 'showLiveFound' && showLiveFound === false) {
      setShowLiveLost(false);
      setShowLiveFound(true);
      setShowDeletedLost(false);
      setShowDeletedFound(false);
    } else if (show === 'showDeletedLost' && showDeletedLost === false) {
      setShowLiveLost(false);
      setShowLiveFound(false);
      setShowDeletedLost(true);
      setShowDeletedFound(false);
    } else if (show === 'showDeletedFound' && showDeletedFound === false) {
      setShowLiveLost(false);
      setShowLiveFound(false);
      setShowDeletedLost(false);
      setShowDeletedFound(true);
    }
  }

  return (
    <>
      {/* if Logged in this will show */}
      {(user.userName == 'admin') ? (

        <div className="admin">

          <div className='column'>
            <SideNavBar
              handleShow={handleShow}
              Logout={Logout}
            />
          </div>

          <div className='column'>
            {showLiveLost && (<DataTable
              itemType={'Lost'}
              itemData={lostItem}
              itemPrefix={'lt'}
              tableHeader={'Live'}
              buttonType={'delete'}
              handleEvent={lostDeleteData}
            />)}
            {showLiveFound && (<DataTable
              itemType={'Found'}
              itemData={foundItem}
              itemPrefix={'fd'}
              tableHeader={'Live'}
              buttonType={'delete'}
              handleEvent={foundDeleteData}
            />)}
            {showDeletedLost && (<DataTable
              itemType={'Lost'}
              itemData={lostDeletedData}
              itemPrefix={'lt'}
              tableHeader={'Deleted'}
              buttonType={'restore'}
              handleEvent={lostRestoreData}
            />)}
            {showDeletedFound && (<DataTable
              itemType={'Found'}
              itemData={foundDeletedData}
              itemPrefix={'fd'}
              tableHeader={'Deleted'}
              buttonType={'restore'}
              handleEvent={foundRestoreData}
            />)}
          </div>
        </div>
        // If not yet logged in, auto redirected to login form
      ) : (
        <LoginForm Login={Login} />
      )}
    </>
  )
}

export default AdminPage;