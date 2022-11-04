import React from 'react';

import {Col, Container, Row} from 'reactstrap';

const Versus = () => {
    return (
        <div className={'outer-wrap section versus-section'}>
            <Container>
                <Row className={'title'}>
                    <Col className={'title'}>
                        Current National Alert versus AlphC Mapped Address-Based
                        Communication
                    </Col>
                </Row>
                <Row className={'content'}>
                    <Col>
                        AlphC technology fills many gaps that current emergency
                        alerts fail to address and it can be embedded into
                        virtually any existing emergency communication system.
                        Users can map areas and grade impact levels using any
                        criteria and communicate with residents in real time.
                        Our “two-way mapped alert technology” and “address-based
                        communication” platform is the first in the world.
                        Everything AlphC does is new knowledge. There is no cost
                        for citizens to use our technology.
                    </Col>
                </Row>
                <Row className={''}>
                    <Col xs="12" sm="12" md="6" lg="6" className={'content-block pt-4'}>
                        <div className={'card'}>
                            <div className={'text-block'}>
                                <div className={'title'}>Current</div>
                                <div className={'sub-title'}>
                                    National Alert System
                                </div>
                                <Row className={'sub-block'}>
                                    <Col sm="12" md={{size: 8, offset: 2}}>
                                        <div className={'sub-block-title'}>
                                            <div className={'big-bullet'} />
                                            General Population
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            National Alert
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Regional Alert
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Area Alert
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={'sub-block'}>
                                    <Col sm="12" md={{size: 8, offset: 2}}>
                                        <div className={'sub-block-title'}>
                                            <div className={'big-bullet'} />
                                            Take Action
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Pull Over - Take Cover
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Read Message
                                        </div>
                                    </Col>
                                </Row>

                                <Row className={'block-footer'}>
                                    Leaves Gaps
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6" className={'content-block pt-4'}>
                        <div className={'card'}>
                            <Col className={'text-block'}>
                                <div className={'title'}>Future</div>
                                <div className={'sub-title'}>
                                    <img
                                        src={'/assets/img/logo-sm-o.png'}
                                        alt={'logo'}
                                    />
                                </div>
                                <Row className={'sub-block'}>
                                    <Col>
                                        <div className={'sub-block-title'}>
                                            <div className={'big-bullet'} />
                                            Targeted to Area or Address(s)
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Mapped Communication to Every
                                            Address
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Residents can ALERT Authorities.
                                        </div>
                                        <div className={'sub-block-p'}>
                                            <p>
                                                <i>
                                                    "2-Way Mapped Communication"
                                                </i>
                                            </p>
                                            <p>
                                                <i>
                                                    "PINNED LOCATION" and
                                                    "REAL-TIME"
                                                </i>
                                            </p>
                                        </div>
                                        <div className={'sub-block-content'}>
                                            <div className={'small-bullet'} />
                                            Addresses needing HELP are Mapped.
                                        </div>
                                        <div className={'sub-block-p'}>
                                            <p>
                                                <i>
                                                    Planned Rescue and Post
                                                    Disaster Communication
                                                </i>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Row className={'block-footer'}>
                                We Fill the Gaps
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Versus;
