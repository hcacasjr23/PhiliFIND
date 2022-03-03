import React, { useState, useEffect } from 'react';

// Import Components
import { TextField } from '@mui/material';

// Import CSS
import './styles.css';
import { Button } from 'react-bootstrap';

function ViewPost() {

  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost/PhiliFIND/Client/src/api/getFoundData.php")
      .then(result => result.json())
      .then(
        (res) => {
          item(res);
        }
      )
  }, [])

  return (
    <>
      ViewPost
      {item.map(item => (
        <div key={item.id} className='container'>
          <div className="itemName-container">
            <TextField
              key={item.id}
              value={item.fd_item[0]}
              disabled
              variant='outlined'
            />
          </div>
          <Button>{item.fd_item}</Button>
        </div>
      ))}
    </>
  )
}

export default ViewPost;