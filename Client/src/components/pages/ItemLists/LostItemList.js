import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PostTemplate from '../../PostTemplate/LostPostTemplate';

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
        <>
            <div className='header lost'>Lost</div>
            <div className="item-container">
                {/* Container for item listing */}
                <Grid item={true} xs={12}>
                    {/* // Call and list data from database 1 by 1*/}
                    {item.map(item => (
                        <PostTemplate
                            key={item.id}
                            itemId={item.id}
                            image={item.fd_image}
                            itemName={item.fd_item}
                            itemBrand={item.fd_brand}
                            itemColor={item.fd_color}
                            location={item.fd_place}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default Data;