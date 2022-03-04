import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import LostPostTemplate from '../../PostTemplate/LostPostTemplate';

import './ItemLists.css'

const LostItemList = (props) => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getLostData.php")
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
                    {item.filter((val) => {
                        if (props.searchTerm.trim() === '') {
                            return val
                        } else if (val.lt_item.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map(item => (
                        <LostPostTemplate
                            key={item.id}
                            itemImage={item.lt_image}
                            itemName={item.lt_item}
                            itemBrand={item.lt_brand}
                            itemColor={item.lt_color}
                            itemCategory={item.lt_category}
                            itemLocation={item.lt_place}
                            itemDate={item.lt_date}
                            itemTime={item.lt_time}
                            itemInfo={item.lt_addinfo}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default LostItemList;