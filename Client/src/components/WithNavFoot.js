import React from 'react';

//Additional Dependencies for WithNav component
import { Outlet } from 'react-router';

//Needed Components
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

//Renders page with Navbar and Footer
export default () => {
    return (
        <div className='app-wrapper'>
            <div className='app-container'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};