import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardMedia, Typography, CardActions, Button, fabClasses } from '@mui/material'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

import './PostTemplate.css'

const cardStyle = {
    fontSize: '12pt',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '400',
    color: 'var(--color-gray-dark)',
    padding: '0.1rem 0',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '270px',
};

function FoundPostTemplate(props) {

    const ReportToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: ({
            popup: 'report-popup',
        }),
        width: 335,
        icon: 'success',
        backgroundColor: 'var(--color-white-dirty)',
    })

    const WarningToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: ({
            popup: 'report-popup',
        }),
        width: 370,
        icon: 'warning',
        backgroundColor: 'var(--color-white-dirty)',
    })

    const date = moment(props.itemDate).format('MMM D, YYYY');
    const [time, setTime] = useState(props.itemTime.toLocaleString());


    useEffect(() => {
        const newDate = new Date("1970-01-01 " + time);
        const adjustedDate = newDate.setTime(newDate.getTime() + (8 * 60 * 60 * 1000));
        const newTime = moment(adjustedDate).format('hh:mm a');
        setTime(newTime);
    }, [])

    const [report, setReport] = useState(false);

    const handleReport = (e) => {
        ReportToast.fire({
            title: 'Your report has been sent'
        });
        e.stopPropagation();
        e.preventDefault();
        setReport(true);
    }

    const handleWarning = (e) => {
        WarningToast.fire({
            title: 'You already have sent a report'
        });
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <>
            <Link
                to={{
                    pathname: '/foundviewpost',
                    state: {
                        itemImage: props.itemImage,
                        itemName: props.itemName,
                        itemBrand: props.itemBrand,
                        itemColor: props.itemColor,
                        itemCategory: props.itemCategory,
                        itemLocation: props.itemLocation,
                        itemDate: props.itemDate,
                        itemTime: props.itemTime,
                        itemInfo: props.itemInfo,
                        contactName: props.contactName,
                        contactEmail: props.contactEmail,
                        contactPrimary: props.contactPrimary,
                        contactSecondary: props.contactSecondary,
                    }
                }}
                style={{
                    textDecoration: 'none',
                }}
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
            >
                <Card
                    sx={{ borderRadius: 0, boxShadow: 0 }}
                    className='found-card'
                >
                    <div className='card-highlight' />
                    {props.itemImage && (
                        <CardMedia
                            id='image-container'
                            className='card-image'
                            component='img'
                            image={props.itemImage}
                            alt={props.itemName}
                            sx={{
                                borderRadius: '0 !important',
                                height: 'auto',
                                maxWidth: '180px',
                                backgroundColor: 'var(--color-white-dirty)',
                            }}
                        />)
                    }
                    {!props.itemImage && (
                        <div style={{
                            backgroundColor: 'var(--color-gray-light)',
                            height: 'auto',
                            width: '100%',
                            maxWidth: '180px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'var(--color-gray-dark)'
                        }}
                        >
                            No Image
                        </div>
                    )}
                    <CardContent
                        className='card-body'
                        sx={{
                            padding: ' 1.5rem 1.5rem',
                        }}
                    >
                        {/* Item Name */}
                        <Typography
                            component={'div'}
                            sx={{
                                fontSize: '20pt',
                                fontWeight: '400',
                                fontFamily: 'Open Sans, sans-serif',
                                color: 'var(--color-white-dirty)',
                                backgroundColor: 'var(--color-green-pastel)',
                                width: 'fit-content',
                                padding: '0 0.7rem',
                                marginTop: '0.1rem',
                                marginBottom: '0.5rem',
                            }}>
                            {props.itemName}
                        </Typography>
                        {/* Item Brand */}
                        <Typography sx={cardStyle} component={'div'}>
                            <div className='label'>Brand: </div>
                            {props.itemBrand}
                        </Typography>
                        {/* Item Color */}
                        <Typography sx={cardStyle} component={'div'}>
                            <div className='label'>Color: </div>
                            {props.itemColor}
                        </Typography>
                        {/* Item Category */}
                        {props.itemCategory && (
                            <Typography sx={cardStyle} component={'div'}>
                                <div className='label'>Category: </div>
                                {props.itemCategory}
                            </Typography>
                        )}
                        {/* Item Location */}
                        {props.itemLocation && (
                            <Typography sx={cardStyle} component={'div'}>
                                <div className='label'>Location: </div>
                                {props.itemLocation}
                            </Typography>
                        )}
                        {/* Item Date */}
                        {props.itemDate && (
                            <Typography sx={cardStyle} component={'div'}>
                                <div className='label'>Date Found: </div>
                                {date}
                            </Typography>
                        )}
                        {/* Item Time */}
                        {props.itemTime && (
                            <Typography sx={cardStyle} component={'div'}>
                                <div className='label'>Time Found: </div>
                                {time}
                            </Typography>
                        )}
                        {/* Item Add Info */}
                        {props.itemInfo && (
                            <Typography sx={cardStyle} component={'div'}>
                                <div className='label'>Add. Info: </div>
                                {props.itemInfo}
                            </Typography>
                        )}
                        <div
                            style={{
                                margin: 0,
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {(!report) && (<Button
                                size="small"
                                onClick={handleReport}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '10pt',
                                    margin: 0,
                                    marginTop: '1rem',
                                    backgroundColor: 'var(--color-red-pastel-light)',
                                    borderRadius: 0,
                                    color: 'var(--color-white-dirty)',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        color: 'var(--color-red-pastel-light)',
                                        backgroundColor: 'var(--color-white-dirty)',
                                    }
                                }}
                            >
                                Report
                            </Button>
                            )}
                            {report && (<Button
                                size="small"
                                onClick={handleWarning}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '10pt',
                                    margin: 0,
                                    marginTop: '1rem',
                                    backgroundColor: 'var(--color-gray)',
                                    borderRadius: 0,
                                    color: 'var(--color-white-dirty)',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        color: 'var(--color-white-dirty)',
                                        backgroundColor: 'var(--color-gray)',
                                    }
                                }}
                                disableRipple
                            >
                                Report
                            </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    );
}

export default FoundPostTemplate;
