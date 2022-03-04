import React, { useEffect, useState } from 'react';
import './LostViewPost.css';

// Components Needed
import Maps from '../../GoogleMap/GMapView.js';
import { StyledTextField, StyledFormControl } from '../StyledComponents.js';

// Additional Dependencies for LostForm
import {
    Container,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Button
} from '@mui/material';
import {
    DatePicker,
    LocalizationProvider,
    TimePicker
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useLocation, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function LostViewPost() {

    const location = useLocation();

    const {
        itemImage,
        itemName,
        itemBrand,
        itemColor,
        itemCategory,
        itemLocation,
        itemDate,
        itemTime,
        itemInfo,
        contactName,
        contactEmail,
        contactPrimary,
        contactSecondary,
    } = location.state;

    //Default value for variables
    const [values, setValues] = useState({
        lt_item: itemName,
        lt_brand: itemBrand,
        lt_place: itemLocation,
        lt_name: contactName,
        lt_color: itemColor,
        lt_email: contactEmail,
        lt_pcontact: contactPrimary,
        lt_scontact: contactSecondary,
        lt_date: itemDate,
        lt_time: itemTime,
        lt_category: itemCategory,
        lt_addinfo: itemInfo,
        lt_image: itemImage,
    })

    // Adjust Date to GMT+8
    useEffect(() => {
        const newDate = new Date('2018-8-3 ' + itemTime);
        const adjustedDate = newDate.setTime(newDate.getTime() + (8 * 60 * 60 * 1000));
        setValues({ ...values, lt_time: adjustedDate });
    }, [])

    return (

        <form>
            <div className="lost-form">

                {/* Item Lost Information Section*/}
                <div className="wrapper">

                    <Container>

                        <Link
                            className='breadcrumb'
                            to='/post'
                        >
                            <ArrowBackIcon sx={{ transform: 'scale(0.8)' }} />Back to View Item Posts
                        </Link>

                        <div className="section-header"><div className='section-header-wrapper'>Lost Item Information</div></div><br />

                        <Grid container spacing={2}>
                            {/* Item Lost Field */}
                            <Grid item={true} xs={12} sm={12} md={6}>
                                <StyledTextField
                                    id="lt_item"
                                    label="Item Lost"
                                    variant="outlined"
                                    name='lt_item'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_item}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Item Lost Field */}

                            {/* DatePicker Field */}
                            <Grid item={true} xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['month', 'day', 'year']}
                                        label="Estimated Date Lost"
                                        value={values.lt_date}
                                        onChange={() => { }}
                                        readOnly
                                        renderInput={(params) =>
                                            <StyledTextField {...params}
                                                fullWidth
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                            />
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* End of DatePicker Field */}

                            {/* TimePicker Field */}
                            <Grid item={true} xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Estimated Time Lost"
                                        value={values.lt_time}
                                        onChange={() => { }}
                                        readOnly
                                        renderInput={(params) =>
                                            <StyledTextField {...params}
                                                fullWidth
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                }}
                                            />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* End of TimePicker Field */}

                            {/* Item Brand/Breed Field*/}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_brand"
                                    label="Brand/Breed"
                                    variant="outlined"
                                    name='lt_brand'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_brand}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Item Brand/Breed Field */}

                            {/* Item Color Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_color"
                                    label="Color"
                                    variant="outlined"
                                    name='lt_color'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_color}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Item Color Field */}

                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                    {/* Category Field */}
                                    <Grid item={true} xs={12}>
                                        <StyledFormControl fullWidth>
                                            <InputLabel id="categ">Category</InputLabel>
                                            <Select
                                                labelId="lt_category"
                                                id="lt_category"
                                                value={values.lt_category}
                                                label="Category"
                                                readOnly
                                            >
                                                <MenuItem aria-label="None" value="" />
                                                <MenuItem value={'Animal'}>Animal/Pet</MenuItem>
                                                <MenuItem value={'Clothing'}>Clothing</MenuItem>
                                                <MenuItem value={'Money'}>Money</MenuItem>
                                                <MenuItem value={'Document'}>Document</MenuItem>
                                                <MenuItem value={'Equipment'}>Equipment</MenuItem>
                                                <MenuItem value={'Electronic Gadget'}>Electronic Gadget</MenuItem>
                                                <MenuItem value={'Personal Accessory'}>Personal Accessory</MenuItem>
                                            </Select>
                                        </StyledFormControl>
                                    </Grid>
                                    {/* End of Category Field */}

                                    {/* Additional Information Field */}
                                    <Grid item={true} xs={12}>
                                        <StyledTextField
                                            id="lt_addinfo"
                                            label="Additional Information"
                                            variant="outlined"
                                            name='lt_addinfo'
                                            size='medium'
                                            fullWidth
                                            multiline
                                            value={values.lt_addinfo}
                                            rows={3}
                                            readOnly
                                        />
                                    </Grid>
                                    {/* End of Additional Information Field */}
                                </Grid>
                            </Grid>

                            {/* Image Attachment Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <div className='image-attachment-container'>

                                    {values.lt_image && (
                                        <div className='image-container'>
                                            {/* Needs to convert base64 to javascript file object*/}
                                            <img alt="not found" width={'100%'} src={values.lt_image} />
                                        </div>
                                    )}

                                    {(!values.lt_image) && (
                                        <div
                                            style={{
                                                backgroundColor: 'var(--color-gray-light)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '9.4rem',
                                                width: 'auto',
                                            }}
                                        >
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </Grid>
                            {/* End of Image Attachment Field */}

                        </Grid>
                    </Container>
                </div>
                {/* End of Item Lost Information Section */}

                {/* Item Location Section */}
                <div className="middle wrapper">

                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Lost Item Location</div></div><br />

                        <Grid container spacing={2} direction='row'>

                            {/* Google Map API */}
                            <Grid item={true} xs={12}>
                                <div className="google-map-wrapper">
                                    <Maps
                                        itemLocation={itemLocation}
                                    />
                                </div>
                            </Grid>
                            {/* End of Google Map API */}
                        </Grid>
                    </Container>
                </div>
                {/* End of Item Location Section */}

                {/* Contact Information Section */}
                <div className="wrapper">

                    <Container>

                        <br /><div className='section-header'><div className='section-header-wrapper'>Finder Contact Information</div></div><br />

                        <Grid container rowSpacing={2} columnSpacing={2}>

                            {/* Contact Name Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_name"
                                    label="Name"
                                    variant="outlined"
                                    name='lt_name'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_name}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Contact Name Field */}

                            {/* Email Field*/}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_email"
                                    label="Email"
                                    variant="outlined"
                                    name='lt_email'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_email}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Emaill Field */}

                            {/* Primary Contact Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_pcontact"
                                    label="Primary contact number"
                                    variant="outlined"
                                    name='lt_pcontact'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_pcontact}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Primary Contact Field */}

                            {/* Secondary Contact Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_scontact"
                                    label="Secondary contact number"
                                    variant="outlined"
                                    name='lt_scontact'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_scontact}
                                    readOnly
                                />
                            </Grid>
                            {/* End of Secondary Contact Field */}
                        </Grid>

                        <br />
                        <div className='button-wrapper'>
                            <Button
                                id="postButton"
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: 280,
                                    },
                                    height: 56
                                }}>
                                Contact Finder
                            </Button>
                        </div>
                        <br /><br />

                    </Container>
                </div>
            </div>
        </form>
    );
}

export default LostViewPost;