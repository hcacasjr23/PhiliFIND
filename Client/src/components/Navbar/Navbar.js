import React, { Component } from 'react';

// Additional Dependencies
import { Container } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// Custom Imports
import { MenuItems } from './MenuItems';

import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }

    // Menu Icon Handler
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <div className='navbar-wrapper'>
                <Container>
                    <nav className='navbar-items'>
                        <div className='navbar-logo'>
                            <a href="/home">
                                <TravelExploreIcon className='navbar-icon' />
                                PhiliFIND
                            </a>
                        </div>
                        <div className="nav-menuicon" onClick={this.handleClick}>
                            {/* Displays icon depending on the clicked state */}
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {/* creates list items from MenuItems.js */}
                            {MenuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={item.cName} href={item.url}>
                                            {item.label}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </Container>
            </div>
        )
    }
}

export default Navbar;