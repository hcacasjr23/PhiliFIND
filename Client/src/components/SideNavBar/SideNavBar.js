import React from 'react';

import { Button } from '@mui/material'

import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import './SideNavBar.css';

function SideNavBar(props) {
    return (
        <div className='sidenavbar'>
            <div className='sidenavbar-header'>
                <div className='sidenavbar-logo'>
                    <TravelExploreIcon className='sidenavbar-icon' />
                    PhiliFIND
                </div>
                <div className='sidenavbar-text'>
                    ADMINISTRATOR <br />
                    DASHBOARD
                </div>
            </div>
            <ul>
                <li onClick={() => props.handleShow('showLiveLost')}>LIVE LOST ITEM</li>
                <li onClick={() => props.handleShow('showLiveFound')}>LIVE FOUND ITEM</li>
                <li onClick={() => props.handleShow('showDeletedLost')}>DELETED LOST ITEM</li>
                <li onClick={() => props.handleShow('showDeletedFound')}>DELETED FOUND ITEM</li>
            </ul>

            <div className='logout-button-wrapper'>
                <Button
                    variant="contained"
                    color="error"
                    className='logout-button'
                    onClick={() => props.Logout()}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default SideNavBar;