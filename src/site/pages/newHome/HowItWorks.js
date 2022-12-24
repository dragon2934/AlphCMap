import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Col, Container, Row } from 'reactstrap';
import KeyFeatures from './KeyFeatures';
import Footer from './Footer';
import Header from './Header';

const HowItWorks = () => {
    return (
        <main>
            <Header />
            <div className="content how-it-works">
                <Container>
                    <Row className="section-title">
                        <Col>How it works</Col>
                    </Row>
                    <p>
                        AlphC’s patented technology assigns an email address to
                        every physical address. Residents of an address are linked
                        via their mobile device to this unique email. A message sent
                        to the email associated with the physical address connects
                        you to all the mobile numbers of the residents for that
                        address in real-time. AlphC’s messages are geo-coded, so
                        they cannot be duplicated, adding transparency and security
                        that does not exist with current systems.
                    </p>
                    <p>
                        In any emergency, such as an earthquake, fire, hurricane or
                        terrorist attack, an alert can be initiated by individuals
                        directly to first responders using a simple alert format or
                        from responders to individuals. First responders can also
                        create a geo-fenced or targeted alert to a specified panned
                        area. Based on a simple one-button alert message stating, "I
                        am safe," "I am away" or "I need help," rescue missions can
                        be planned, targeted and mapped to the addresses in a way
                        that maximizes efficiency, speed and crucially, the safety
                        of first responders. A real-time, color-coded crisis map
                        further aids response efforts and allows tracking of
                        progress through an area.
                    </p>

                    <Row>
                        <Col className="text-center">
                            <figure className="figure">
                                <img
                                    src="/assets/img/how-it-works/how-it-works-1.png"
                                    className="figure-img img-fluid rounded"
                                    alt="Simple one-button alert for residents and first responders"
                                />
                                <figcaption className="figure-caption">
                                    Simple one-button alert for residents and first
                                    responders
                                </figcaption>
                            </figure>
                        </Col>
                    </Row>

                    <p>
                        AlphC technology fills many gaps that current emergency
                        alerts fail to address and it can be embedded into virtually
                        any existing emergency communication system. Users can map
                        areas and grade impact levels using any criteria and
                        communicate with residents in real time. Our “two-way mapped
                        alert technology” and “address-based communication” platform
                        is the first in the world. Everything AlphC does is new
                        knowledge. There is no cost for citizens to use our
                        technology.
                    </p>

                    <Row>
                        <Col className="text-center">
                            <figure className="figure">
                                <img
                                    src="/assets/img/how-it-works/how-it-works-2.png"
                                    className="figure-img img-fluid rounded"
                                    alt="Current national alert versus AlphC mapped address-based communication"
                                />
                                <figcaption className="figure-caption">
                                    Current national alert versus AlphC mapped
                                    address-based communication
                                </figcaption>
                            </figure>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="text-center">
                            <figure className="figure">
                                <img
                                    src="/assets/img/how-it-works/how-it-works-3.png"
                                    className="figure-img img-fluid rounded"
                                    alt="Community alerting system for minor or major emergencies"
                                />
                                <figcaption className="figure-caption">
                                    Community alerting system for minor or major
                                    emergencies
                                </figcaption>
                            </figure>
                        </Col>
                    </Row>

                    <p>
                        AlphC’s products may be covered by U.S. Patent Nos.
                        9,860,203, 10,356,028, and 10,659,414. Additional patents
                        pending.
                    </p>
                </Container>

                <ParallaxProvider>
                    <KeyFeatures />
                </ParallaxProvider>
            </div>
            <Footer />
        </main>
    );
};

export default HowItWorks;
