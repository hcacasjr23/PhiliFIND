import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Grid } from '@mui/material';
import PostTemplate from '../../PostTemplate/foundPostTemplate';

const Data = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch("http://localhost/philiFIND/getFoundData.php")
            .then(result => result.json())
            .then(
                (res) => {
                    setItem(res);
                }
            )
    }, [])

    // Function for getting value based on ID
    const getValue = (specId) => {
        console.log(specId)

    }
    return (
        <div className='row'>
            <div className="title">
                <h2>Found Data List</h2>
                <div className="item-container">
                    {/* Container for item listing */}
                    <Grid item={true} xs={12}>
                        {/* // Call and list data from database 1 by 1*/}
                        {item.map(item => (
                            <div>
                                <PostTemplate
                                    key={item.id}
                                    itemId={item.id}
                                    image={item.fd_image}
                                    itemName={item.fd_item}
                                    itemBrand={item.fd_brand}
                                    itemColor={item.fd_color}
                                    location={item.fd_place} 
                                />

                            </div>


                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Data;