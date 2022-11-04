import React from 'react';

import {Col, Container, Row} from 'reactstrap';

const Benefits = () => {
    return (
        <div className={'outer-wrap section benefits-section'}>
            <Container>
                <Row noGutters className={'content-container'}>
                    <Col
                        sm="12"
                        md={{size: 6, offset: 3}}
                        className={'slogan-text'}>
                        <div className={'title'}>
                            Benefits of AlphC Local Community
                        </div>
                        <div className={'text-block'}>
                            <div>
                                Police Alerting / Institutional Alert System
                            </div>
                            <div>Opt-In for Residents or Business</div>
                            <div>
                                Emergency Notification Area Residents
                                <p>
                                    <i>
                                        (Gas Leak, Lockdown/shooting, Avoid an
                                        Area, Any Disasters)
                                    </i>
                                </p>
                            </div>
                            <div>
                                Platform based on Local Needs
                                <p>
                                    <i>
                                        (Schools, Malls, Public Space,
                                        Businesses, High Rise Buildings)
                                    </i>
                                </p>
                            </div>
                            <div>Embedded into Local Community Alert</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Benefits;
