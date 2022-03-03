import React from 'react';
import { Card, CardImg, Button, Placeholder, PlaceholderButton } from 'react-bootstrap';
import './PostTemplate.css'

function postTemplate(props, itemId, Data) {

    return (
        <>
            <Card className='found-card'>
                <div className='card-highlight'></div>
                <Card.Body style={{ textAlign: 10 }} className='card-body'>
                    <Card.Text>Id: {props.itemId}</Card.Text>
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
                    {/* <div className="buttonWrapper">
                        <div className="view-Wrapper">
                            <Button variant="primary" id="view-button" href='/foundviewpost' >View Post</Button>
                        </div>
                    </div> */}
                </Card.Body>
            </Card>
        </>
    );
}

export default postTemplate;
