import React, { useEffect, useState } from 'react';
import './LostForm.css';

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
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";

function LostForm() {

    //Default value for variables
    const [values, setValues] = useState({
        lt_item: '',
        lt_brand: '',
        lt_place: '',
        lt_zip: '',
        lt_name: '',
        lt_color: '',
        lt_email: '',
        lt_pcontact: '',
        lt_scontact: '',
        lt_date: new Date(),
        lt_time: new Date(),
        lt_category: '',
        lt_addinfo: '',
        lt_image: null,
    })

    // Address from Google Map Component
    const [mapAddress, setMapAddress] = useState()

    useEffect(() => {
        setValues({ ...values, lt_place: mapAddress })
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

    // Custom Swal Popups
    const ConfirmDialog = Swal.mixin({
        customClass: {
            confirmButton: 'lt-btn lt-btn-confirm',
            cancelButton: 'lt-btn lt-btn-cancel',
            popup: 'lt-popup',
        },
        buttonsStyling: false,
        background: '#FAF8F8',
        width: 500,
    })

    const OneButtonDialog = Swal.mixin({
        buttonsStyling: false,
        background: '#FAF8F8',
        width: 500,
    })

    const getWindowLocationOnError = () => {
        if (values.lt_item.trim() === '' ||
            values.lt_brand.trim() === '' ||
            values.lt_color.trim() === '') {
            return 0;
        } else {
            return document.body.scrollHeight;
        }
    }

    const history = useHistory();

    //Handles Submission
    const handleSubmit = (e) => {

        //Collects all error
        var errorArray = [];

        if (values.lt_item === '') {
            errorArray.push('Item Found')
        }
        if (values.lt_brand === '') {
            errorArray.push('Brand/Breed')
        }
        if (values.lt_color === '') {
            errorArray.push('Color')
        }
        if (values.lt_name === '') {
            errorArray.push('Name')
        }
        if (!validemailFormat.test(values.lt_email)) {
            errorArray.push('Email')
        }
        if (!validPhoneNo.test(values.lt_pcontact)) {
            errorArray.push('Primary Contact')
        }

        var errorCompilation = errorArray.join(', ');

        //Pop-up error for invalid inputs
        if (errorArray.length) {

            OneButtonDialog.fire({
                title: 'The ff. fields contain invalid value/s',
                text: `${errorCompilation}`,
                icon: 'error',
                confirmButtonText: 'Back to Report Form',
                customClass: ({
                    confirmButton: 'lt-btn lt-btn-back',
                    popup: 'lt-popup',
                })
            }).then((result) => {
                if (result.isConfirmed || result.dismiss) {
                    window.scrollTo(0, getWindowLocationOnError());
                }
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
            if (values.lt_item.trim() === '') {
                setItemError(true);
            }
            if (values.lt_brand.trim() === '') {
                setBrandError(true);
            }
            if (values.lt_color.trim() === '') {
                setColorError(true);
            }
            if (values.lt_name.trim() === '') {
                setNameError(true);
            }
            if (!validemailFormat.test(values.lt_email)) {
                setEmailError(true);
            }
            if (!validPhoneNo.test(values.lt_pcontact)) {
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
                        title: 'Report Sent Successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: ({
                            popup: 'lt-popup',
                        }),
                    })
                    history.push('/home');
                    window.scrollTo(0, 0);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    window.scrollTo(0, 0);
                }
            })
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

    //Sets value of image
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setValues({ ...values, lt_image: base64 })
    };

    const removeImage = async (e) => {
        setValues({ ...values, lt_image: null });
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
            <div className="lost-form">

                {/* Item Lost Information Section*/}
                <div className="wrapper">

                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Lost Item Information</div></div><br />

                        <Grid container spacing={2}>
                            {/* Item Lost Field */}
                            <Grid item={true} xs={12} sm={12} md={6}>
                                <StyledTextField
                                    id="lt_item"
                                    label="Item Lost"
                                    variant="outlined"
                                    name='item-lost'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_item}
                                    onChange={(e) => setValues({ ...values, lt_item: e.target.value })}
                                    required
                                    error={itemError}
                                />
                            </Grid>
                            {/* End of Item Lost Field */}

                            {/* DatePicker Field */}
                            <Grid item={true} xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        allowSameDateSelection
                                        disableFuture
                                        minDate={minDate}
                                        openTo='month'
                                        views={['month', 'day', 'year']}
                                        label="Estimated Date Lost"
                                        value={values.lt_date}
                                        onChange={(e) => { setValues({ ...values, lt_date: e }); }}
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
                                        onChange={(e) => {
                                            setValues({ ...values, lt_time: e })
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
                                    id="lt_brand"
                                    label="Brand/Breed"
                                    variant="outlined"
                                    name='item-brand'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_brand}
                                    onChange={(e) => setValues({ ...values, lt_brand: e.target.value })}
                                    required
                                    error={brandError}
                                />
                            </Grid>
                            {/* End of Item Brand/Breed Field */}

                            {/* Item Color Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="lt_color"
                                    label="Color"
                                    variant="outlined"
                                    name='item-color'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_color}
                                    onChange={(e) => setValues({ ...values, lt_color: e.target.value })}
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
                                                labelId="lt_category-id"
                                                id="lt_category-id"
                                                value={values.lt_category}
                                                label="Category"
                                                onChange={(event) => setValues({ ...values, lt_category: event.target.value })}
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
                                            name='add-info'
                                            size='medium'
                                            fullWidth
                                            multiline
                                            rows={3}
                                            onChange={(e) => setValues({ ...values, lt_addinfo: e.target.value })}
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
                                    {values.lt_image && (
                                        <div className='image-container'>
                                            {/* Needs to convert base64 to javascript file object*/}
                                            <img alt="not lost" width={'100%'} src={values.lt_image} />
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
                {/* End of Item Lost Information Section */}

                {/* Item Location Section */}
                <div className="middle wrapper">

                    <Container>

                        <div className="section-header"><div className='section-header-wrapper'>Lost Item Location</div></div><br />

                        <Grid container spacing={2} direction='row'>

                            {/* Google Map API */}
                            <Grid item={true} xs={12}>
                                <Maps
                                    setMapAddress={setMapAddress}
                                />
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
                                    id="lt_name-person"
                                    label="Name"
                                    variant="outlined"
                                    name='lt_name-person'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_name}
                                    onChange={(e) => setValues({ ...values, lt_name: e.target.value })}
                                    required
                                    error={nameError}
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
                                    onChange={(e) => setValues({ ...values, lt_email: e.target.value })}
                                    required
                                    error={emailError}
                                />
                            </Grid>
                            {/* End of lt_email Field */}

                            {/* Primary Contact Field */}
                            <Grid item={true} xs={12} sm={6}>
                                <StyledTextField
                                    id="primary-contact"
                                    label="Primary contact number"
                                    variant="outlined"
                                    name='primary-contact'
                                    size='medium'
                                    fullWidth
                                    value={values.lt_pcontact}
                                    onChange={(e) => setValues({ ...values, lt_pcontact: e.target.value })}
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
                                    value={values.lt_scontact}
                                    onChange={(e) => setValues({ ...values, lt_scontact: e.target.value })}
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
                                Post Lost Item Report
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

export default LostForm;