import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

const AboutUs = () => {
    return (
        <main>
            <Header />
            <div className="content about-us">
                <Container>
                    <Row className="section-title">
                        <Col>About Us</Col>
                    </Row>
                    <p>
                        {/* Alphabet Communication™ (AlphC)™ opens up many opportunities
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
                    in emergency response. */}
                        Alphabet Communication™ (AlphC)™ opens up many <a href="/how-it-works">opportunities</a> to make the world safer and increase our collective security. <a href="https://www.linkedin.com/pulse/alphc-our-journey-focus-part-15-shafin-valla/">Our focus</a> will always be on <a href="https://www.linkedin.com/pulse/alphc-e-alert-app-part-25-shafin-valla">“saving lives”</a>, including those of our first responders. AlphC's unique technological platform permits mapped, real-time communication with all residents at every address.
                        <br />
                        <br />
                        <a href="https://alphcmap.com/about-us" target="_blank">AlphCMap</a> is an extension of our <a href="https://www.alphc.com/patents">IP and technology</a>  with <a href="https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html" target="_blank">infinite possibilities</a>. This communication breakthrough is based on a closed and secure communication network between addresses. Opt-in businesses and consumers can communicate for mutual benefit via their mapped address.  As an example, when a food delivery order is placed by a customer their address is provided to the restaurant for delivery purposes.  AlphCMap, maps all the addresses, providing the ability for restaurants to communicate with their customers via their address.

                        Benefits for this timely and instant communication for businesses. <ul>

                            <li> Instant-mapped and targeted communication with customers based on their address (including high-rise residential). </li>

                            <li> Delivery of time sensitive, special offers by businesses to customers; such as, special food offers (half-price pizza 3-5pm/today only) and coupons. </li>

                            <li> B2C marketing communication - empowering small/medium size (mom/pop) business with an affordable communication network that doesn't exist today. </li>

                            <li> Customers staying connected with their local neighborhood small businesses and save money. </li>
                        </ul>
                        Customers have the ability to opt-in or out of this unique communication capability. The closed network eliminates spam and protects the privacy of all users. Currently communication will be via email.
                    </p>
                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default AboutUs;
