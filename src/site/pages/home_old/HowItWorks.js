import React from 'react';

import {Col, Container, Row} from 'reactstrap';

const HowItWorks = () => {
    return (
        <div
            className={'outer-wrap how-it-work-section'}
            style={{backgroundColor: '#e4e5e6'}}>
            <Container>
                <Row className={'slogan section-title'}>
                    <Col>How it works?</Col>
                </Row>
                <Row className={'slogan section-block'}>
                    <Col>
                        <Row noGutters>
                            {' '}
                            AlphC’s patented technology assigns an email address
                            to every physical address. Residents of an address
                            are linked via their mobile device to this unique
                            email. A message sent to the email associated with
                            the physical address connects you to all the mobile
                            numbers of the residents for that address in
                            real-time. AlphC’s messages are geo-coded, so they
                            cannot be duplicated, adding transparency and
                            security that does not exist with current systems.
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default HowItWorks;
