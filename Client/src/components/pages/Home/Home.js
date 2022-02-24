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
            </div>

            <div className='row'>
                <a className='left-section' href='/lost'>
                    <h3 className='section-title'> Lost an Item? </h3>
                    <p className='section-body'>Fill out our Report Lost Item form</p>
                </a>

                <a className='middle-section' href='/found'>
                    <h3 className='section-title'> Found an Item? </h3>
                    <p className='section-body'>Fill out our Report Found Item form.</p>
                </a>

                <a className='right-section' href='/post'>
                    <h3 className='section-title'> Finding an Item? </h3>
                    <p className='section-body'>Check out our item posts page.</p>
                </a>
            </div>

            <div className='attributions'>
                <h6>Attributions</h6>
                <a href="https://www.vecteezy.com/free-vector/lost">Lost Vectors by Vecteezy</a>
                <a href='https://www.freepik.com/vectors/communication'>Communication vector created by freepik - www.freepik.com</a>
                <a href='https://www.freepik.com/vectors/idea'>Idea vector created by storyset - www.freepik.com</a>
            </div>
        </div>
    )
};

export default Home;
