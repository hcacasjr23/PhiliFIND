import React from 'react';
import {Card, CardImg, Button, Placeholder, PlaceholderButton} from 'react-bootstrap';
import './postTemplate.css'
import {Container} from '@mui/material';

function postTemplate(props, itemId, Data) {

    const getSpecificId = (id) => {
        console.log(id);
    }

    return (
        <div>
            <div className="card-container">
                <Container>
                        {/* Found Item */}
                        <Card style={{ width: '100%', backgroundColor: '#d4f1f4', height: 'auto', borderRadius: '5px' }}>
                            <Card.Body style={{textAlign: 10}}>
                                <Card.Text>Id: {props.itemId}</Card.Text>
                                {/* Image */}
                                <Card.Img variant='top' src={props.image} id='image-container'/>
                                {/* Item Name */}
                                <Card.Text style={{ textAlign: 'left', fontSize: 15 }}>Item Found: {props.itemName}</Card.Text>
                                {/* Item Brand */}
                                <Card.Text style={{textAlign: 'left', fontSize: 15}}>Brand: {props.itemBrand}</Card.Text>
                                {/* Item Color */}
                                <Card.Text style={{textAlign: 'left', fontSize: 15}}>Color: {props.itemColor}</Card.Text>
                                {/* Location */}
                                <Card.Text style={{textAlign: 'left', fontSize: 15}}>Location: {props.location}</Card.Text>
                                <div className="buttonWrapper">
                                    <div className="view-Wrapper">
                                        <Button variant="primary" id="view-button" href='/foundviewpost' >View Post</Button>
                                    </div>
                                </div>
                            </Card.Body>

                        {/* Lost Item */}

                        </Card>
                </Container>

                <Card style={{ width: '18rem'}}>
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow" >
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={6} />
                    </Card.Body>
                </Card>
            </div>


        </div>
    );
}

export default postTemplate;
