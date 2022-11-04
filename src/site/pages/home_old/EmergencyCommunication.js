import React from 'react';

import {Col, Container, Row} from 'reactstrap';

const EmergencyCommunication = () => {
    return (
        <div
            className={'outer-wrap section emergency-communication-section'}
            style={{backgroundColor: 'white'}}>
            <Container className={'steps-container'}>
                <Row className={'title'}>Emergency Communication</Row>
                <Row className={'content'}>
                    Simple one-button alert for residents and first responders
                </Row>
                <Row className={'content'}>
                    <Col>
                        In any emergency, such as an earthquake, fire, hurricane
                        or terrorist attack, an alert can be initiated by
                        individuals directly to first responders using a simple
                        alert format or from responders to individuals. First
                        responders can also create a geo-fenced or targeted
                        alert to a specified panned area. Based on a simple
                        one-button alert message stating, "I am safe," "I am
                        away" or "I need help," rescue missions can be planned,
                        targeted and mapped to the addresses in a way that
                        maximizes efficiency, speed and crucially, the safety of
                        first responders. A real-time, color-coded crisis map
                        further aids response efforts and allows tracking of
                        progress through an area.{' '}
                    </Col>
                </Row>

                <Row className={'content-block'}>
                    <Col
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        className={'phone-container'}>
                        <img src={'/assets/img/phones.png'} alt={'phones'} />
                    </Col>

                    <Col xs="12" sm="12" md="6" lg="6" className="pt-3">
                        <div className={'sub-title'}>3 Step Process</div>
                        <p>For All Emergency Communications </p>
                        <div className={'step-content'}>
                            <div className={'number'}>01.</div>Institution
                            Initiates Alert Panning Affected Area/Addresses
                        </div>
                        <div className={'step-content'}>
                            <div className={'number'}>02.</div>
                            <div>
                                <p>What is Your Status?</p>
                                <p>2-Way Communication</p>
                            </div>
                        </div>
                        <div className={'step-content'}>
                            <div className={'number'}>03.</div>Crisismapping
                            Travel Advisory
                        </div>
                        <div className={'sub-step-content'}>
                            <div className={'big-bullet'} />
                            Rescue Mission Targeted Addresses
                        </div>
                        <div className={'sub-step-content'}>
                            <div className={'big-bullet'} />
                            Live/Pinned Status Update
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={'map-container'}>
                        <img src={'/assets/img/map.jpg'} alt={'map'} />
                    </Col>
                </Row>
                <Row>
                    <Col className={'description-container'}>
                        <img
                            src={'/assets/img/description.png'}
                            alt={'description'}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default EmergencyCommunication;
