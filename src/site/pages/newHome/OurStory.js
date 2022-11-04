import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const OurStory = () => {
    return (
        <div className="full-screen our-story">
            <Container>
                <Row className="section-title">
                    <Col>Our Story</Col>
                </Row>
                <p>
                    AlphC journey began in silence over five years ago with two
                    lines and an @ symbol. The lines represented latitude and
                    longitude.
                </p>

                <Row>
                    <Col className="text-center">
                        <figure className="figure">
                            <img
                                alt="2 lines"
                                src="/assets/img/our-story/our-story-1.png"
                                className="figure-img img-fluid rounded mr-2"
                            />
                            <img
                                alt="at symbol"
                                src="/assets/img/our-story/our-story-2.png"
                                className="figure-img img-fluid rounded"
                            />
                        </figure>
                    </Col>
                </Row>

                <p>
                    With trademarks and three USPTO Patents Granted in 2018,
                    2019 and 2020, we are now in a position to license our IP
                    and technology to institutions and governments. All
                    information post-testing is housed on the clients secure
                    institutional or government servers. AlphC does not have
                    access to this information.
                </p>

                <p>
                    This site is specifically developed to permit testing and
                    pilot-studies with our partners, prior to implementation
                    within their regions.
                </p>

                <p>
                    To license our IP and technology, you can contact us at{' '}
                    <a className="text-muted" href="mailto:anything@alphc.com">
                        anything@alphc.com
                    </a>
                </p>

                <p>
                    General inquiries can be sent to{' '}
                    <a
                        className="text-muted"
                        href="mailto:anything@alphabetcommunication.com">
                        anything@alphabetcommunication.com
                    </a>
                </p>
            </Container>
        </div>
    );
};

export default OurStory;
