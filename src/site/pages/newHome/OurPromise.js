import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

const OurPromise = () => {
    return (
        <main>
        <Header />
        <div className="full-screen our-promise">
            <Container>
                <Row className="section-title">
                    <Col>Our Promise</Col>
                </Row>
                <p>
                    Protecting the privacy of individuals and the security of
                    data is fundamental to us. There is a fine balance between
                    state security and protecting the privacy and safety of
                    citizens. We have all witnessed the erosion of privacy with
                    our electronic devices. Our licensing agreements will
                    specify opt-in use only. This means, individuals must
                    specifically allow themselves to be included in the system
                    to receive and send alerts or messages. Depending on your
                    region the security of the state is always fundamental.
                    Area-wide alerts can only be sent by licensed domain users
                    using a geo-coded address within that geographical area or
                    country, further enhancing secure communication. This
                    ensures transparency and encourages user responsibility.
                </p>

                <p>
                    AlphC IP is the next generation of emergency response
                    technology. Our aim is to work with governments,
                    institutions and agencies. We create a safer world for their
                    communities and citizens.
                </p>

                <p>
                    Please feel free to{' '}
                    <a
                        className="text-muted"
                        href="mailto:anything@alphabetcommunication.com">
                        contact us
                    </a>{' '}
                    for more information.
                </p>
            </Container>
        </div>
        <Footer />
        </main>
    );
};

export default OurPromise;
