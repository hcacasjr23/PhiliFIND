import React, {useState, useEffect} from 'react';

// Import Components
import {TextField} from '@mui/material';

// Import CSS
import './styles.css';
import { Button } from 'react-bootstrap';

function ViewPost ()  {
    const [dataItem, setDataItem] = useState([])
    useEffect(() => {
      fetch("http://localhost/philiFIND/getFoundData.php")
          .then(result => result.json())
          .then(
              (res) => {
                  setDataItem(res);
              }
          )
  }, [])

  const handleSubmit = (event) => {
    console.log(event)
  }
  return (
      
    <div>
      ViewPost
      {dataItem.map(dataItem => (
        <div key={dataItem.id} className='container'>
          <div className="itemName-container">
          {/* Will edit this on backend to get certain ID */}
            {/* <TextField
              value={dataItem.fd_item($row('selectedId'))}

            /> */}
            <TextField
              key={dataItem.id}
              value={dataItem.fd_item[0]}
              disabled
              variant='outlined'
            />
          </div>
          <Button>{dataItem.fd_item}</Button>
        </div>, 1
      ))}
    </div>
  )
}

export default ViewPost;