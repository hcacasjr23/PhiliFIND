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