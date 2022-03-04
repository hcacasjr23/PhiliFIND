import React from 'react';

import { Card, CardImg, Placeholder, PlaceholderButton } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import './PostTemplate.css'

function FoundPostTemplate(props) {

    const history = useHistory();

    return (
        <>
            <Card className='found-card' onClick={() => {history.push('/foundviewpost');}}>
                <div className='card-highlight'></div>
                <Card.Body style={{ textAlign: 10 }} className='card-body'>
                    {/* Image */}
                    <Card.Img variant='top' src={props.image} id='image-container' />
                    {/* Item Name */}
                    <Card.Text style={{ textAlign: 'left', fontSize: 15 }}>Item Found: {props.itemName}</Card.Text>
                    {/* Item Brand */}
                    <Card.Text style={{ textAlign: 'left', fontSize: 15 }}>Brand: {props.itemBrand}</Card.Text>
                    {/* Item Color */}
                    <Card.Text style={{ textAlign: 'left', fontSize: 15 }}>Color: {props.itemColor}</Card.Text>
                    {/* Location */}
                    <Card.Text style={{ textAlign: 'left', fontSize: 15 }}>Location: {props.location}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default FoundPostTemplate;
