import React, {useState, useEffect} from 'react';

// Import Components
import {TextField} from '@mui/material';

// Import CSS
import './styles.css';

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
  return (
      
    <div>
      ViewPost
      {dataItem.map(dataItem => (
        <div className='container' key={dataItem.id}>
          <div className="itemName-container">
            <TextField
              label={dataItem.fd_item}
              disabled
              variant='outlined'
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ViewPost;