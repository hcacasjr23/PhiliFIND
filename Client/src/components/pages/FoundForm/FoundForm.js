import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import './FoundForm.css';

//Components Needed
// import Maps from '../../GoogleMap/map.js';
import Maps from '../../GoogleMap/MapContainer.js';

//MUI Styled Components
import { StyledTextField, StyledFormControl } from '../StyledComponents.js';

//Backend
import axios from 'axios'

//Additional Dependencies for FoundForm
import {
    Container, Grid, TextField, Button, Box, InputLabel,
    MenuItem, FormControl, Select, Paper, Alert, AlertTitle
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { breakpoints } from '@mui/system';
import swal from 'sweetalert';

function FoundForm() {

    //Default value for variables
    const [values, setValues] = useState({
        fd_item: '',
        fd_brand: '',
        fd_place: '',
        fd_zip: '',
        fd_name: '',
        fd_color: '',
        fd_email: '',
        fd_pcontact: '',
        fd_scontact: '',
        fd_date: new Date(),
        fd_time: new Date(),
        fd_category: '',
        fd_addinfo: '',
        fd_image: ''
    })

    //Default values for text field error prop
    const [itemError, setItemError] = useState(false)
    const [brandError, setBrandError] = useState(false)
    const [colorError, setColorError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [pContactError, setPContactError] = useState(false)
    const [locationError, setLocationError] = useState(false)
    const [zipError, setZipError] = useState(false)

    //Input Formatting
    const validemailFormat = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    const validPhoneNo = new RegExp('^[09][0-9""]{10,}$')

    //Handles Submission
    const handleSubmit = (e) => {

        //Collects all error
        var errorArray = [];

        if (values.fd_item === '') {
            errorArray.push('Item Found')
        }
        if (values.fd_brand === '') {
            errorArray.push('Brand/Breed')
        }
        if (values.fd_color === '') {
            errorArray.push('Color')
        }
        if (values.fd_name === '') {
            errorArray.push('Name')
        }
        if (!validemailFormat.test(values.fd_email)) {
            errorArray.push('Email')
        }
        if (!validPhoneNo.test(values.fd_pcontact)) {
            errorArray.push('Primary Contact')
        }
        if (values.fd_place === '') {
            errorArray.push('Name of Place/Location')
        }
        if (values.fd_zip === '') {
            errorArray.push('Zip Code')
        }

        var errorCompilation = errorArray.join(', ');

        //Pop-up error for invalid inputs
        if (errorArray.length) {
            swal({
                title: 'The ff. fields contain invalid value\'s',
                text: `${errorCompilation}`,
                icon: 'warning',
                button: 'Return to Form',
            })

            //Prevents page from refreshin when submitted
            e.preventDefault();

            //Refreshes Error props value
            setItemError(false);
            setBrandError(false);
            setColorError(false);
            setNameError(false);
            setEmailError(false);
            setPContactError(false);
            setLocationError(false);
            setZipError(false);

            //Sets error prop when invalid input
            if (values.fd_item.trim() === '') {
                setItemError(true);
            }
            if (values.fd_brand.trim() === '') {
                setBrandError(true);
            }
            if (values.fd_color.trim() === '') {
                setColorError(true);
            }
            if (values.fd_name.trim() === '') {
                setNameError(true);
            }
            if (!validemailFormat.test(values.fd_email)) {
                setEmailError(true);
            }
            if (!validPhoneNo.test(values.fd_pcontact)) {
                setPContactError(true);
            }
            if (values.fd_place.trim() === '') {
                setLocationError(true);
            }
            if (values.fd_zip.trim() === '') {
                setZipError(true);
            }
        } 
        else {
            sendPostRequest();
            //Reloads page upon submit
            window.location.reload();
        }
    }

    const API_PATH = 'http://localhost/philiFIND/found.php';

    //Posts Data to Database using Axios
    const sendPostRequest = () => {
        axios({
            method: 'POST',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: values
        })
            .then(result => {
                console.log(result.data)
                console.log(values)
            })
            .catch(error => setValues({
                error: "this is an error"
            }));
    }

    //Sets value of image
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setValues({ ...values, fd_image: base64 })
    };

    //Convert file object to base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (

        <form>
            <div className="found-form">

                {/* Item Found Information Section*/}
                <div className="wrapper">

                    {/* Container for Grid */}
                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Found Item Information</div></div><br />

                        {/* Controller for grid spacing */}
                        <Grid container spacing={2}>
                            <Grid item={true} xs={12} sm={12} md={6}>
                                {/* Item Found Field */}
                                <StyledTextField
                                    id="fd_item"
                                    label="Item Found"
                                    variant="outlined"
                                    name='item-found'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_item}
                                    onChange={(e) => setValues({ ...values, fd_item: e.target.value })}
                                    required
                                    error={itemError}
                                />
                            </Grid>
                            {/* End of Item Found Field */}

                            {/* DatePicker Field */}
                            <Grid item={true} xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disableFuture
                                        openTo='year'
                                        views={['year', 'month', 'day']}
                                        label="Date Found"
                                        value={values.fd_date}
                                        onChange={(e) => {
                                            setValues({ ...values, fd_date: e });
                                        }}
                                        renderInput={(params) => <StyledTextField {...params} helperText={null} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* End of DatePicker Field */}

                            {/* TimePicker Field */}
                            <Grid item={true} xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Time Found"
                                        value={values.fd_time}
                                        onChange={(e) => { setValues({ ...values, fd_time: e }) }}
                                        renderInput={(params) => <StyledTextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* End of TimePicker Field */}

                            {/* Item Brand/Breed Field*/}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="fd_brand"
                                    label="Brand/Breed"
                                    variant="outlined"
                                    name='item-brand'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_brand}
                                    onChange={(e) => setValues({ ...values, fd_brand: e.target.value })}
                                    required
                                    error={brandError}
                                />
                            </Grid>
                            {/* End of Item Brand/Breed Field */}

                            {/* Item Color Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="fd_color"
                                    label="Color"
                                    variant="outlined"
                                    name='item-color'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_color}
                                    onChange={(e) => setValues({ ...values, fd_color: e.target.value })}
                                    required
                                    error={colorError}
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
                                                labelId="fd_category-id"
                                                id="fd_category-id"
                                                value={values.fd_category}
                                                label="Category"
                                                onChange={(event) => setValues({ ...values, fd_category: event.target.value })}
                                            >
                                                <MenuItem value={'Animal'}>Animal/Pet</MenuItem>
                                                <MenuItem value={'Clothing'}>Clothing</MenuItem>
                                                <MenuItem value={'Electronic gadgets'}>Electronic gadgets</MenuItem>
                                                <MenuItem value={'Personal accessories'}>Personal accessories</MenuItem>
                                            </Select>
                                        </StyledFormControl>
                                    </Grid>
                                    {/* End of Category Field */}

                                    {/* Additional Information Field */}
                                    <Grid item={true} xs={12}>
                                        <StyledTextField
                                            id="fd_addinfo"
                                            label="Additional Information"
                                            variant="outlined"
                                            name='add-info'
                                            size='medium'
                                            fullWidth
                                            multiline
                                            rows={3}
                                            maxRows={4}
                                            onChange={(e) => setValues({ ...values, fd_addinfo: e.target.value })}
                                        />
                                    </Grid>
                                    {/* End of Additional Information Field */}
                                </Grid>
                            </Grid>

                            {/* Image Attachment Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <div className='image-attachment-container'>
                                    <div className='image-attachment-button-wrapper'>
                                        <Button
                                            variant='contained'
                                            component='label'
                                            id='uploadButton'
                                            sx={{ height: 30 }}
                                        >
                                            Upload Image
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => {
                                                    uploadImage(e);
                                                }}
                                            />
                                        </Button>
                                    </div>

                                    {/* Displays preview when an image file is uploaded */}
                                    {values.fd_image && (
                                        <div className='image-container'>
                                            {/* Needs to convert base64 to javascript file object*/}
                                            <img alt="not found" width={'100%'} src={values.fd_image} />
                                            <Button
                                                variant='contained'
                                                id='removeButton'
                                                sx={{ height: 30 }}
                                                onClick={(e) => setValues({ ...values, fd_image: e.target.value })}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Grid>
                            {/* End of Image Attachment Field */}

                        </Grid>
                    </Container>
                </div>
                {/* End of Item Found Information Section */}

                {/* Item Location Section */}
                <div className="middle wrapper">

                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Found Item Location</div></div><br />

                        <Grid container spacing={2} direction='row'>

                            {/* Google Map API */}
                            <Grid item={true} xs={12} md={9}>
                                <div className="google-map-wrapper">
                                    <Maps />
                                </div>
                            </Grid>
                            {/* End of Google Map API */}

                            <Grid item={true} xs={12} sm={6} md={3}>
                                <Grid container direction='column' spacing={2}>
                                    {/* fd_name of fd_place/Location Field */}
                                    <Grid item={true} xs={12} sm='auto'>
                                        <StyledTextField
                                            id="location"
                                            label="Name of Place/Location"
                                            variant="outlined"
                                            name='location'
                                            size='medium'
                                            fullWidth
                                            required
                                            value={values.fd_place}
                                            onChange={(e) => setValues({ ...values, fd_place: e.target.value })}
                                            required
                                            error={locationError}
                                        />
                                    </Grid>
                                    {/* End of fd_name of fd_place/Location Field */}

                                    {/* Zip Code */}
                                    <Grid item={true} xs={12} sm='auto'>
                                        <StyledTextField
                                            id="zip-code"
                                            label="Zip Code"
                                            variant="outlined"
                                            name='zip-code'
                                            size='medium'
                                            fullWidth
                                            value={values.fd_zip}
                                            onChange={(e) => setValues({ ...values, fd_zip: e.target.value })}
                                            required
                                            error={zipError}
                                        />
                                    </Grid>
                                    {/* End of Zip Code */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                {/* End of Item Location Section */}

                {/* Contact Information Section */}
                <div className="wrapper">

                    <Container>

                        <br /><div className='section-header'><div className='section-header-wrapper'>Keeper Contact Information</div></div><br />

                        <Grid container rowSpacing={2} columnSpacing={2}>

                            {/* Contact fd_name Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="fd_name-person"
                                    label="Name"
                                    variant="outlined"
                                    name='fd_name-person'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_name}
                                    onChange={(e) => setValues({ ...values, fd_name: e.target.value })}
                                    required
                                    error={nameError}
                                />
                            </Grid>
                            {/* End of Contact fd_name Field */}

                            {/* fd_email Field*/}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="fd_email"
                                    label="Email"
                                    variant="outlined"
                                    name='fd_email'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_email}
                                    onChange={(e) => setValues({ ...values, fd_email: e.target.value })}
                                    required
                                    error={emailError}
                                />
                            </Grid>
                            {/* End of fd_email Field */}

                            {/* Primary Contact Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="primary-contact"
                                    label="Primary contact number"
                                    variant="outlined"
                                    name='primary-contact'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_pcontact}
                                    onChange={(e) => setValues({ ...values, fd_pcontact: e.target.value })}
                                    required
                                    error={pContactError}
                                />
                            </Grid>
                            {/* End of Primary Contact Field */}

                            {/* Secondary Contact Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="secondary-contact"
                                    label="Secondary contact number"
                                    variant="outlined"
                                    name='primary-contact'
                                    size='medium'
                                    fullWidth
                                    value={values.fd_scontact}
                                    onChange={(e) => setValues({ ...values, fd_scontact: e.target.value })}
                                />
                            </Grid>
                            {/* End of Secondary Contact Field */}
                        </Grid>

                        <br />
                        <div className='button-wrapper'>
                            <Button
                                id="postButton"
                                onClick={handleSubmit}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: 280,
                                    },
                                    height: 55
                                }}>
                                Post Found Item Report
                            </Button>
                        </div>

                        <br /><br />
                    </Container>
                </div>
                {/* End of Contact Information Section */}
            </div>
        </form>

    );
}

export default FoundForm;