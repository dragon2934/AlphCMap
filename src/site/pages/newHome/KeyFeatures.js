import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const KeyFeatures = () => {
    return (
        <div className="key-features">
            <Container>
                <Row noGutters>
                    <Col
                        sm="12"
                        md={{size: 10, offset: 1}}
                        className={'slogan-text'}>
                        <div className={'title'}>Key Features and Usage</div>
                        <div className={'text-block'}>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Compatible and easy to integrate into most
                                existing emergency response systems
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Real time mapping of impacted geographies
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Two-way communications with casualties
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Scalable to neighborhoods, residential
                                high-rise, commercial buildings, schools, hotels
                                and resorts, cities and countries
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Reduced emergency response times
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Increased emergency response effectiveness
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Real time tracking of response efforts
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Deployable by local and private agencies
                            </div>
                            <div>
                                <img
                                    src={'/assets/img/icon-white-small.png'}
                                    alt={''}
                                />
                                Extremely low cost
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default KeyFeatures;
