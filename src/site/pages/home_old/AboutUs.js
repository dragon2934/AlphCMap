import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import ReadMore from '../../components/ReadMore';

const longText1 = `AlphC journey began in silence over five years ago with two lines and an @symbol. The lines represented
    latitude and longitude. With trademarks and three
    USPTO Patents Granted in 2018, 2019 and 2020, we are
    now in a position to license our IP and technology
    to institutions and governments. All information
    post-testing is housed on the clients secure
    institutional or government servers. AlphC does not
    have access to this information. This site is
    specifically developed to permit testing and
    pilot-studies with our partners, prior to
    implementation within their regions.`;

const longText2 = `Protecting the privacy of individuals and the
                            security of data is fundamental to us. There is a
                            fine balance between state security and protecting
                            the privacy and safety of citizens. We have all
                            witnessed the erosion of privacy with our electronic
                            devices. Our licensing agreements will specify
                            opt-in use only. This means, individuals must
                            specifically allow themselves to be included in the
                            system to receive and send alerts or messages.
                            Depending on your region the security of the state
                            is always fundamental. Area-wide alerts can only be
                            sent by licensed domain users using a geo-coded
                            address within that geographical area or country,
                            further enhancing secure communication. This ensures
                            transparency and encourages user responsibility.
                            AlphC IP is the next generation of emergency
                            response technology. Our aim is to work with
                            governments, institutions and agencies. We create a
                            safer world for their communities and citizens.
                            Please feel free to contact us for more information.`;
const AboutUs = () => {
    return (
        <div
            className={'about-us'}
            style={{
                backgroundColor: 'white',
                position: 'relative',
                zIndex: '1',
            }}>
            <Container className="themed-container about-us-text-container">
                <Row className={'slogan section-title'}>
                    <Col>About Us</Col>
                </Row>
                <Row className={'slogan about-us-title-block'}>
                    <Col>
                        <Row noGutters>
                            {' '}
                            Alphabet Communication™ (AlphC)™ opens up many
                            opportunities to make the world safer and increase
                            our collective security. Our focus will always be on
                            “saving lives”, including those of our first
                            responders. Imagine if, during an emergency, first
                            responders had the ability to identify who needs
                            immediate help and to triage response efforts en
                            route before even arriving on scene. Imagine if they
                            knew which addresses and which individuals at that
                            address required help and which residents were safe.
                            AlphC’s unique technological platform permits
                            mapped, real-time communication with all residents
                            at every address. This technology will increase
                            public safety and is a game changer in emergency
                            response.
                        </Row>
                    </Col>
                </Row>
                <Row className={'slogan about-us-block'}>
                    <Col xs="12" sm="12" md="6" lg="6" className="pt-3">
                        <Row noGutters className={'title'}>
                            Our Story
                        </Row>
                        <Row noGutters>
                            {' '}
                            <ReadMore longText={longText1} />
                        </Row>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6" className="pt-3">
                        <Row noGutters className={'title'}>
                            Our Promise
                        </Row>
                        <Row noGutters>
                            <ReadMore longText={longText2} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default AboutUs;
