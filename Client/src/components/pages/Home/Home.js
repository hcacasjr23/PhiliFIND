import React from 'react';

//Additional Dependencies for Homepage
import { Button, Container } from '@mui/material';

import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <div className='hero-section'>
                <div className='header'>
                    <span>Welcome to </span><span className='highlight'>PhiliFIND</span>
                    <p className='show'>
                        reuniting items with their owners within just a few clicks
                    </p>
                    <p className='hidden'>
                        please take extra care of your belongings next time
                    </p>
                </div>

                <div className='row'>
                    <a className='left-section' href='/lost'>
                        Lost an Item?
                    </a>

                    <a className='middle-section' href='/found'>
                        Found an Item?
                    </a>

                    <a className='right-section' href='/post'>
                        Finding an Item?
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Home;
