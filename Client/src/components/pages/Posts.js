import React from 'react';

import './Posts.css';
import { Container, Grid } from '@mui/material'

import PostTemplate from '../PostTemplate/postTemplate'
import Data from '../Data'

function Posts() {

  return (

    <div className='post-container'>
      <Container>
        <Data />
      </Container>
    </div>
  )
};

export default Posts;
