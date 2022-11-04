import React from 'react';

import {Col, Container, Row} from 'reactstrap';

const Emergency = () => {
    return (
        <div
            className={'outer-wrap emergency-section'}
            style={{backgroundColor: '#f0f3f5'}}>
            <Container className={'steps-container'}>
                <Row>
                    <Col className={'title'}>
                        Community alerting system for minor or major emergencies
                    </Col>
                </Row>

                <Row className={'step-block'}>
                    <Col xs="12" sm="6" md="6" lg="6">
                        <Row className={'sub-title'}>
                            <Col>Natural Disasters</Col>
                        </Row>
                        <Row>
                            <Col className={'group'}>
                                <Row className={'icon big'}>
                                    <img
                                        src={'/assets/img/icon_beat.svg'}
                                        alt={'Earthquake'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Earthquake
                                </div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_fire.svg'}
                                        alt={'Fires'}
                                    />
                                </Row>
                                <div className={'step-descript'}>Fires</div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    <img
                                        src={'/assets/img/icon_waves.svg'}
                                        alt={'Floods'}
                                    />
                                </Row>
                                <div className={'step-descript'}>Floods</div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_twister.svg'}
                                        alt={'Tournedos'}
                                    />
                                </Row>
                                <div className={'step-descript'}>Tornadoes</div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="12" sm="6" md="6" lg="6">
                        <Row className={'sub-title'}>
                            <Col>Police Emergencies</Col>
                        </Row>
                        <Row>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_ghost.svg'}
                                        alt={'Terrorist Attacks'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Terrorist Attacks
                                </div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_mask.svg'}
                                        alt={'Criminal Activities'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Criminal Activities
                                </div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_question.svg'}
                                        alt={'Missing Persons'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Missing Persons
                                </div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_gun.svg'}
                                        alt={'Active Shooters'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Active Shooters
                                </div>
                            </Col>
                            <Col className={'group'}>
                                <Row className={'icon'}>
                                    {' '}
                                    <img
                                        src={'/assets/img/icon_signal.svg'}
                                        alt={'Amber Alerts'}
                                    />
                                </Row>
                                <div className={'step-descript'}>
                                    Amber Alerts
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Emergency;
