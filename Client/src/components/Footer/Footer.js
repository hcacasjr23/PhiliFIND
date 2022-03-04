import React from 'react';

//Additional Dependencies for Footer Component
import { Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            {/* Container is used to make margin consistent with other pages */}
            <Container>
                <div className='row'>
                    <div className='col'>
                        <h4>Contact Us</h4>
                        <ul>
                            <li>(02) 565-0200</li>
                            <li><a href='#' className='link' onClick={(e) => {e.preventDefault()}}>inquiries@philifind.com</a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <a className='link social' href='#' onClick={(e) => {e.preventDefault()}}><LinkedInIcon /></a>
                            <a className='link social' href='#' onClick={(e) => {e.preventDefault()}}><FacebookIcon /></a>
                            <a className='link social' href='#' onClick={(e) => {e.preventDefault()}}><GoogleIcon /></a>
                        </div>
                    </div>
                </div>

                <hr className='divider'/>

                <div className='row'>
                    <p className='col-sm'>
                        &copy;{new Date().getFullYear()} <span className='logo'>PhiliFIND </span>
                        | <span><a href='#' className='link' onClick={(e) => {e.preventDefault()}}>Terms of Use</a></span>
                        | <span><a href='#' className='link' onClick={(e) => {e.preventDefault()}}>Privacy Policy</a></span>
                    </p>
                </div>
            </Container>
        </div>
    )
};

export default Footer;
