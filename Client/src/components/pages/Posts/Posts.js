import React, { useState } from 'react';

import './Posts.css';

import { Container, Grid, InputAdornment } from '@mui/material'
import { StyledTextField } from '../StyledComponents.js'
import SearchIcon from '@mui/icons-material/Search';

import FoundItemList from '../ItemLists/FoundItemList';
import LostItemList from '../ItemLists/LostItemList';

function Posts() {

  const [searchTerm, setSearchTerm] = useState('');

  // Filter for Search Function

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
            placeholder='Search Item Post...'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ transform: 'scale(1.1)' }} />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value) }}
          />
        </div>
        <Grid container spacing={6}>
          <Grid item={true} xs={12} md={6}>
            <LostItemList
              searchTerm={searchTerm}
            />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <FoundItemList
              searchTerm={searchTerm}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  )

};

export default Posts;
