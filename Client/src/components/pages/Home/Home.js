import React from 'react';

//Additional Dependencies for Homepage
import { Button, Container } from '@mui/material';

import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <Container>
                <div className='hero-section'>
                    <h1>Lost an Item?</h1>
                    <p>
                        Look no futher for here in PhiliFIND
                        reuniting with your beloved items
                        is just 'Juan' click away.
                    </p>
                </div>
                <Button
                    onClick={() => {window.location.href = '/found'}}
                >
                    Report Found Item
                </Button>
                <Button
                    onClick={() => {window.location.href = '/lost'}}
                >
                    Report Lost Item
                </Button>
                <Button
                    onClick={() => {window.location.href = '/post'}}
                >
                    View Item Posts
                </Button>
            </Container>
        </div>
    )
};

export default Home;
