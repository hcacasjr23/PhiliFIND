import React, { useEffect, useState } from 'react';
import './FoundViewPost.css';

// Components Needed
import Maps from '../../GoogleMap/GMapView.js';
import { StyledTextField, StyledFormControl } from '../StyledComponents.js';

// Additional Dependencies for FoundForm
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

function FoundViewPost() {

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
    fd_item: itemName,
    fd_brand: itemBrand,
    fd_place: itemLocation,
    fd_name: contactName,
    fd_color: itemColor,
    fd_email: contactEmail,
    fd_pcontact: contactPrimary,
    fd_scontact: contactSecondary,
    fd_date: itemDate,
    fd_time: itemTime,
    fd_category: itemCategory,
    fd_addinfo: itemInfo,
    fd_image: itemImage,
  })

  // Adjust Date to GMT+8
  useEffect(() => {
    const newDate = new Date('2018-8-3 ' + itemTime);
    const adjustedDate = newDate.setTime(newDate.getTime() + (8 * 60 * 60 * 1000));
    setValues({ ...values, fd_time: adjustedDate });
  }, [])

  return (

    <form>
      <div className="found-form">

        {/* Item Found Information Section*/}
        <div className="wrapper">

          <Container>

            <Link
              className='breadcrumb'
              to='/post'
            >
              <ArrowBackIcon sx={{ transform: 'scale(0.8)' }} />Back to View Item Posts
            </Link>

            <div className="section-header"><div className='section-header-wrapper'>Found Item Information</div></div><br />

            <Grid container spacing={2}>
              {/* Item Found Field */}
              <Grid item={true} xs={12} sm={12} md={6}>
                <StyledTextField
                  id="fd_item"
                  label="Item Found"
                  variant="outlined"
                  name='fd_item'
                  size='medium'
                  fullWidth
                  value={values.fd_item}
                  readOnly
                />
              </Grid>
              {/* End of Item Found Field */}

              {/* DatePicker Field */}
              <Grid item={true} xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['month', 'day', 'year']}
                    label="Estimated Date Found"
                    value={values.fd_date}
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
                    label="Estimated Time Found"
                    value={values.fd_time}
                    readOnly
                    onChange={() => { }}
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
                  name='fd_brand'
                  size='medium'
                  fullWidth
                  value={values.fd_brand}
                  readOnly
                />
              </Grid>
              {/* End of Item Brand/Breed Field */}

              {/* Item Color Field */}
              <Grid item={true} xs={12} sm={6}>
                <StyledTextField
                  id="fd_color"
                  label="Color"
                  variant="outlined"
                  name='fd_color'
                  size='medium'
                  fullWidth
                  value={values.fd_color}
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
                        labelId="fd_category"
                        id="fd_category"
                        value={values.fd_category}
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
                      id="fd_addinfo"
                      label="Additional Information"
                      variant="outlined"
                      name='fd_addinfo'
                      size='medium'
                      fullWidth
                      multiline
                      value={values.fd_addinfo}
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

                  {values.fd_image && (
                    <div className='image-container'>
                      {/* Needs to convert base64 to javascript file object*/}
                      <img alt="not found" width={'100%'} src={values.fd_image} />
                    </div>
                  )}

                  {(!values.fd_image) && (
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

            <br /><div className='section-header'><div className='section-header-wrapper'>Keeper Contact Information</div></div><br />

            <Grid container rowSpacing={2} columnSpacing={2}>

              {/* Contact fd_name Field */}
              <Grid item={true} xs={12} sm={6}>
                <StyledTextField
                  id="fd_name"
                  label="Name"
                  variant="outlined"
                  name='fd_name'
                  size='medium'
                  fullWidth
                  value={values.fd_name}
                  readOnly
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
                  readOnly
                />
              </Grid>
              {/* End of fd_email Field */}

              {/* Primary Contact Field */}
              <Grid item={true} xs={12} sm={6}>
                <StyledTextField
                  id="fd_pcontact"
                  label="Primary contact number"
                  variant="outlined"
                  name='fd_pcontact'
                  size='medium'
                  fullWidth
                  value={values.fd_pcontact}
                  readOnly
                />
              </Grid>
              {/* End of Primary Contact Field */}

              {/* Secondary Contact Field */}
              <Grid item={true} xs={12} sm={6}>
                <StyledTextField
                  id="fd_scontact"
                  label="Secondary contact number"
                  variant="outlined"
                  name='fd_scontact'
                  size='medium'
                  fullWidth
                  value={values.fd_scontact}
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
                Contact Keeper
              </Button>
            </div>
            <br /><br />

          </Container>
        </div>
      </div>
    </form>
  );
}

export default FoundViewPost;