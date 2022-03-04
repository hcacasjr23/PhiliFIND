import React, { useState } from 'react';

import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './PostTemplate.css'

const cardStyle = {
    fontSize: '12pt',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '400',
    color: 'var(--color-gray-dark)',
    padding: '0.1rem 0',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '95%',
};

function LostPostTemplate(props) {

    const history = useHistory();

    const date = moment(props.itemDate).format('MMM D, YYYY');
    const time = moment(`January 19, 1975 ${props.itemTime}`).format('h:mm a')

    const [image, setImage] = useState(props.itemImage);

    return (
        <>
            <Card
                sx={{ borderRadius: 0, boxShadow: 0 }}
                className='lost-card'
                onClick={() => { history.push('/lostviewpost'); }}
            >
                <div className='card-highlight' />
                {props.itemImage && (
                    <CardMedia
                        id='image-container'
                        className='card-image'
                        component='img'
                        onError={() => {setImage('')}}
                        image={image}
                        alt={props.itemName}
                        sx={{
                            borderRadius: '0 !important',
                            height: 'auto',
                            maxWidth: '180px',
                            backgroundColor: 'var(--color-white-dirty)',
                            
                        }}
                    />)
                }
                <CardContent
                    className='card-body'
                    sx={{
                        padding: ' 1.5rem 1.5rem',
                    }}
                >
                    {/* Item Name */}
                    <Typography
                        sx={{
                            fontSize: '20pt',
                            fontWeight: '400',
                            fontFamily: 'Open Sans, sans-serif',
                            color: 'var(--color-white-dirty)',
                            backgroundColor: 'var(--color-red-pastel-light)',
                            width: 'fit-content',
                            padding: '0 0.7rem',
                            marginTop: '0.1rem',
                            marginBottom: '0.5rem',
                        }}>
                        {props.itemName}
                    </Typography>
                    {/* Item Brand */}
                    <Typography sx={cardStyle}>
                        <div className='label'>Brand: </div>
                        {props.itemBrand}
                    </Typography>
                    {/* Item Color */}
                    <Typography sx={cardStyle}>
                        <div className='label'>Color: </div>
                        {props.itemColor}
                    </Typography>
                    {/* Item Category */}
                    {props.itemCategory && (
                        <Typography sx={cardStyle}>
                            <div className='label'>Category: </div>
                            {props.itemCategory}
                        </Typography>
                    )}
                    {/* Item Location */}
                    {props.itemLocation && (
                        <Typography sx={cardStyle}>
                            <div className='label'>Location: </div>
                            {props.itemLocation}
                        </Typography>
                    )}
                    {/* Item Date */}
                    {props.itemDate && (
                        <Typography sx={cardStyle}>
                            <div className='label'>Date Lost: </div>
                            {date}
                        </Typography>
                    )}
                    {/* Item Time */}
                    {props.itemTime && (
                        <Typography sx={cardStyle}>
                            <div className='label'>Time Lost: </div>
                            {time}
                        </Typography>
                    )}
                    {/* Item Add Info */}
                    {props.itemInfo && (
                        <Typography sx={cardStyle}>
                            <div className='label'>Add. Info: </div>
                            {props.itemInfo}
                        </Typography>
                    )}
                </CardContent>
                
            </Card>
        </>
    );
}

export default LostPostTemplate;
