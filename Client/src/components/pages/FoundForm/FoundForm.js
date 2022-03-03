import React, { useEffect, useState } from 'react';
import './FoundForm.css';

// Components Needed
import Maps from '../../GoogleMap/GMap.js';
import { StyledTextField, StyledFormControl } from '../StyledComponents.js';

// Backend
import axios from 'axios'

// Additional Dependencies for FoundForm
import {
    Container,
    Grid,
    Button,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import {
    DatePicker,
    LocalizationProvider,
    TimePicker
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

function FoundForm() {

    //Default value for variables
    const [values, setValues] = useState({
        fd_item: '',
        fd_brand: '',
        fd_place: '',
        fd_name: '',
        fd_color: '',
        fd_email: '',
        fd_pcontact: '',
        fd_scontact: '',
        fd_date: new Date(),
        fd_time: new Date(),
        fd_category: '',
        fd_addinfo: '',
        fd_image: null,
    })

    // Address from Google Map Component
    const [mapAddress, setMapAddress] = useState()

    useEffect(() => {
        setValues({ ...values, fd_place: mapAddress })
    }, [mapAddress])

    const [minDate, setMinDate] = useState()

    // Set minimum date to 3 months prior to current
    useEffect(() => {
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 3);
        setMinDate(currentDate);
    }, [])

    //Default values for text field error prop
    const [itemError, setItemError] = useState(false)
    const [brandError, setBrandError] = useState(false)
    const [colorError, setColorError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [pContactError, setPContactError] = useState(false)

    //Input Formatting
    const validemailFormat = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    const validPhoneNo = new RegExp('^[09][0-9""]{10,}$')

    //Handles Submission
    const handleSubmit = (e) => {

        //Collects all error
        var errorArray = [];

        if (values.fd_item.trim() === '') {
            errorArray.push('Item Found')
        }
        if (values.fd_brand.trim() === '') {
            errorArray.push('Brand/Breed')
        }
        if (values.fd_color.trim() === '') {
            errorArray.push('Color')
        }
        if (values.fd_name.trim() === '') {
            errorArray.push('Name')
        }
        if (!validemailFormat.test(values.fd_email)) {
            errorArray.push('Email')
        }
        if (!validPhoneNo.test(values.fd_pcontact)) {
            errorArray.push('Primary Contact')
        }

        var errorCompilation = errorArray.join(', ');

        //Pop-up error for invalid inputs
        if (errorArray.length) {

            OneButtonDialog.fire({
                title: 'The ff. fields contain invalid value/s',
                text: `${errorCompilation}`,
                icon: 'error',
                confirmButtonText: 'Return to Report Form',
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

            //Sets error prop when invalid input
            if (values.fd_item) {
                setItemError(true);
            }
            if (values.fd_brand) {
                setBrandError(true);
            }
            if (values.fd_color) {
                setColorError(true);
            }
            if (values.fd_name) {
                setNameError(true);
            }
            if (!validemailFormat.test(values.fd_email)) {
                setEmailError(true);
            }
            if (!validPhoneNo.test(values.fd_pcontact)) {
                setPContactError(true);
            }
        }
        else {

            ConfirmDialog.fire({
                title: 'Confirm Report Submission',
                text: "Are you sure with the details filled above?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Submit Report',
                cancelButtonText: 'No, Check Report',
            }).then((result) => {
                if (result.isConfirmed) {
                    sendPostRequest();
                    OneButtonDialog.fire({
                        title: 'Report Has ',
                        icon: 'successful',
                        confirmButtonText: 'Return to Home',
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {

                }
            })

            //Reloads page upon submit
            //window.location.reload();
        }
    }

    const API_PATH = 'http://localhost/PhiliFIND/Client/src/api/found.php';

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

    // Custom Swal Popups
    const ConfirmDialog = Swal.mixin({
        customClass: {
            confirmButton: 'fd-btn fd-btn-confirm',
            cancelButton: 'fd-btn fd-btn-cancel',
            popup: 'fd-border-radius-0',
        },
        buttonsStyling: false,
        background: '#FAF8F8',
        width: 500,
    })

    const OneButtonDialog = Swal.mixin({
        customClass: {
            confirmButton: 'fd-btn-return',
            popup: 'fd-border-radius-0',
        },
        buttonsStyling: false,
        background: '#FAF8F8',
        width: 500,
    })

    //Sets value of image
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setValues({ ...values, fd_image: base64 })
    };

    const removeImage = async (e) => {
        setValues({ ...values, fd_image: null });
    }

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

                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Found Item Information</div></div><br />

                        <Grid container spacing={2}>
                            {/* Item Found Field */}
                            <Grid item={true} xs={12} sm={12} md={6}>
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
                                        allowSameDateSelection
                                        disableFuture
                                        minDate={minDate}
                                        openTo='month'
                                        views={['month', 'day', 'year']}
                                        label="Estimated Date Found"
                                        value={values.fd_date}
                                        onChange={(e) => { setValues({ ...values, fd_date: e }) }}
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
                                        label="Estimated Time Found"
                                        value={values.fd_time}
                                        onChange={(e) => {
                                            setValues({ ...values, fd_time: e })
                                        }}
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
                                                defaultValue=""
                                                label="Category"
                                                onChange={(e) => setValues({ ...values, fd_category: e.target.value })}
                                            >
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
                                            id="fd_addinfo"
                                            label="Additional Information"
                                            variant="outlined"
                                            name='add-info'
                                            size='medium'
                                            fullWidth
                                            multiline
                                            rows={3}
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
                                            onClick={(e) => {
                                                e.target.value = null;
                                            }}
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
                                                onClick={(e) => {
                                                    removeImage(e);
                                                }}
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
                            <Grid item={true} xs={12}>
                                <div className="google-map-wrapper">
                                    <Maps
                                        setMapAddress={setMapAddress}
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

                            {/* Email Field*/}
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
                                    height: 56
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