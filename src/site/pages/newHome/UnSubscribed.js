import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
const UnSubscribed = () => {
    return (
        <Col md={12} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>
            <br /><br /><br /><br /><br />
            <p> You're unsubscribed. </p>

            <Row>
                <Col> UnSubscribe Successful! Sorry to see you go!
                </Col>
            </Row>
        </Col>
    );
};

export default UnSubscribed;
