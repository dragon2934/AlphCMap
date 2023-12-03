import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

const NewsRelease = () => {
    return (
        <main>
            <Header />
            <div className="content news-release">
                <Container>
                    <Row className="section-title">
                        <Col>News Release</Col>
                    </Row>


                    November 28, 2023
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/alphc-granted-5th-uspto-patent-lifeline-emergency-shafin-valla-uxmvc/">
                            AlphC Granted 5th USPTO Patent - Lifeline in Emergency Preparedness
                        </a>
                    </p>

                    September 16, 2022
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/alphc-vision-goals-part-55-shafin-valla">
                            AlphC - Vision and Goals
                        </a>
                    </p>

                    September 15, 2022
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/first-responders-benefits-2-way-communication-early-alert-valla">
                            First Responders Benefits: 2-Way Communication, Early Alert and Mapped Communication
                        </a>
                    </p>

                    September 14, 2022
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/future-targeted-first-responders-alerts-part-35-shafin-valla">
                            FUTURE - Targeted First Responders Alerts
                        </a>
                    </p>

                    September 13, 2022
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/alphc-e-alert-app-part-25-shafin-valla">
                            AlphC E-Alert App
                        </a>
                    </p>

                    September 12, 2022
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/pulse/alphc-our-journey-focus-part-15-shafin-valla">
                            AlphC - Our Journey and Focus
                        </a>
                    </p>

                    January 10, 2018
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html">
                            Alphabet Communication: Patent Granted by the USPTO "We have the Ability to Map the Global Population and Connect All Humanity"
                        </a>
                    </p>

                    August 8, 2017
                    <p>
                        <a
                            className="text-muted"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.newswire.ca/news-releases/alphabet-communication-aims-to-connect-every-address-and-make-the-world-safer-639131043.html">
                            Alphabet Communication Aims to Connect Every Address and Make the World Safer
                        </a>
                    </p>








                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default NewsRelease;
