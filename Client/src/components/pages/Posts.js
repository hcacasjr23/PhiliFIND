import React from 'react';

import './Posts.css';
import { Container, Grid } from '@mui/material'

import FoundData from './DataListing/foundData';
import LostData from './DataListing/lostData';

function Posts() {

  return (

    <div className='post-container'>
      <Container>
        <Grid container spacing={2}>
          <Grid item={true} xs={6}> 
            <FoundData />
          </Grid>
          <Grid item={true} xs={6}>
            <LostData />
          </Grid>

        </Grid>
      </Container>
    </div>
  )
};

export default Posts;
