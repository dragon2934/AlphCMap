import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import HelpSection from './Help';

const ContactUs = () => {
    return (
        <div className={'outer-wrap'} style={{backgroundColor: 'white'}}>
            <Container
                className={'contact-us-section img-container'}
                fluid={true}>
                <Row className={'slogan'}>
                    <Col className={'contact-form-container'}>
                        <Row className={'slogan section-title'}>
                            <Col>Contact Us</Col>
                        </Row>
                        <HelpSection />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default ContactUs;
