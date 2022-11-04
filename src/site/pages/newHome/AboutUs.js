import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

const AboutUs = () => {
    return (
        <main>
            <Header />
        <div className="full-screen about-us">
            <Container>
                <Row className="section-title">
                    <Col>About Us</Col>
                </Row>
                <p>
                    Alphabet Communication™ (AlphC)™ opens up many opportunities
                    to make the world safer and increase our collective
                    security. Our focus will always be on “saving lives”,
                    including those of our first responders. Imagine if, during
                    an emergency, first responders had the ability to identify
                    who needs immediate help and to triage response efforts en
                    route before even arriving on scene. Imagine if they knew
                    which addresses and which individuals at that address
                    required help and which residents were safe. AlphC’s unique
                    technological platform permits mapped, real-time
                    communication with all residents at every address. This
                    technology will increase public safety and is a game changer
                    in emergency response.
                </p>
            </Container>
        </div>
        <Footer />
        </main>
    );
};

export default AboutUs;
