import React, { useState } from 'react';

import './Posts.css';
import { Container, Grid, InputAdornment } from '@mui/material'
import { StyledTextField } from '../StyledComponents.js'
import SearchIcon from '@mui/icons-material/Search';

<<<<<<< HEAD
import FoundData from '../ItemLists/FoundItemList';
import LostData from '../ItemLists/LostItemList';
=======
import FoundData from '../DataListing/foundData';
import LostData from '../DataListing/lostData';
>>>>>>> 81d2c9f5cf6d938ca63a04525d7814560f11666f

function Posts() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='post-container'>
      <Container>
        <div className='search-bar'>
          <StyledTextField
            id="post-search"
            label={null}
            variant="outlined"
            name='post-search'
            size='medium'
            fullWidth
            placeholder='Search Item'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ transform: 'scale(1.1)' }} />
                </InputAdornment>
              ),
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Grid container spacing={6}>
          <Grid item={true} xs={12} md={6}>
            <LostData />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <FoundData />
          </Grid>
        </Grid>
      </Container>
    </div>
  )

};

export default Posts;
