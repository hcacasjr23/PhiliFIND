import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PostTemplateLost from '../../PostTemplate/lostPostTemplate';

const Data = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch("http://localhost/PhiliFIND/Client/src/api/getLostData.php")
            .then(result => result.json())
            .then(
                (res) => {
                    setItem(res);
                }
            )
    }, [])
    return (
        <div className='row'>
            <div className="title">
                <h2>Lost Data List</h2>
                <div className="item-container">
                    {/* Container for item listing */}
                    <Grid item={true} xs={12}>
                        {/* // Call and list data from database 1 by 1*/}
                        {item.map(item => (
                            <PostTemplateLost key={item.id} image={item.lt_image} itemName={item.lt_item} itemBrand={item.lt_brand} itemColor={item.lt_color} location={item.lt_place} />
                        ),
                            console.log(item.id)
                        
                        )}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Data;