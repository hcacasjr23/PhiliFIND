import React, { useState, useEffect } from 'react';

import FoundPostTemplate from '../../PostTemplate/FoundPostTemplate';

import { Grid } from '@mui/material';

import './ItemLists.css'

function FoundItemList(props) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch("http://localhost/PhiliFIND/Client/src/api/GetData/getFoundData.php")
            .then(result => result.json())
            .then(
                (res) => {
                    setItem(res);
                }
            )
    }, [])

    return (
        <>
            <div className='header found'>Found</div>
            <div className="item-container">
                {/* Container for item listing */}
                <Grid item={true} xs={12}>
                    {/* Call and list data from database 1 by 1 */}
                    {item.filter((val) => {
                        if (props.searchTerm.trim() === '') {
                            return val
                        } else if (val.fd_item.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map(item => (
                        <FoundPostTemplate
                            key={item.id}
                            itemImage={item.fd_image}
                            itemName={item.fd_item}
                            itemBrand={item.fd_brand}
                            itemColor={item.fd_color}
                            itemCategory={item.fd_category}
                            itemLocation={item.fd_place}
                            itemDate={item.fd_date}
                            itemTime={item.fd_time}
                            itemInfo={item.fd_addinfo}
                            contactName={item.fd_name}
                            contactEmail={item.fd_email}
                            contactPrimary={item.fd_pcontact}
                            contactSecondary={item.fd_scontact}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default FoundItemList;