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
                        AlphC’s products and services may be covered by U.S. Patent
                        Nos.{' '}
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=9860203.PN.&OS=PN/9860203&RS=PN/9860203">
                            9,860,203
                        </a>
                        ,
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=10,356,028.PN.&OS=PN/10,356,028&RS=PN/10,356,028">
                            10,356,028
                        </a>
                        , and{' '}
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=10659414.PN.&OS=PN/10659414&RS=PN/10659414">
                            10,659,414
                        </a> and <a target='_blank' href="https://ppubs.uspto.gov/pubwebapp/static/pages/ppubsbasic.html"> 11,444,904</a> {' '}
                        , European Union (EU) Patent <a target='_blank' href="https://worldwide.espacenet.com/patent/search/family/060411925/publication/EP3466003A1?q=pn%3DEP3466003">EP 3466003</a>,
                        Australian Patent <a target='_blank' href="http://pericles.ipaustralia.gov.au/ols/auspat/applicationDetails.do?applicationNo=2017269953">2017269953</a>,{' '}
                        as well as other patents that are pending. For additional
                        information, please contact{' '}
                        <a href="mailto:patents@alphc.com">patents@alphc.com</a>.
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
