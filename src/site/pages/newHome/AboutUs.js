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
                        <Col>About KloserToYou</Col>
                    </Row>
                    <p>
                        <a href='https://klosertoyou.com/' target="_blank"> KloserToYou </a> is an extension of <a href='https://www.alphc.com/' target="_blank">Alphabet Communication™ (AlphC)™</a>, our <a href='https://www.alphc.com/patents' target="_blank">IP and technology </a> with <a href='https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html' target="_blank">infinite possibilities</a>.  KloserToYou has created a communication breakthrough that creates a transparent and authenticated email for every business location. Based on the location and name of each business a geo-coded communication network is created that is closed-ended, mapped, secure, authenticated and permits communication between the business and their customers.

                        <br />
                        <br />
                        Example of a geo-coded digitized business email:
                        <br />
                        <br />
                    </p>
                    <p style={{ textAlign: "center" }}>
                        <b>(address)</b>125-western-battery-road-toronto-ontario-m6k-3r8<b>@business name </b>(AlphC)<b>.com </b><br />
                        or<br />
                        <b>125-western-battery-road-toronto-ontario-m6k-3r8@AlphC.com</b>
                        <br />
                        <br />
                    </p>
                    <p>
                        The identity of all users is authenticated, only verified customers, can access this address based mapped-communication network with businesses. Customers remain in full control over which business they wish to connect or disconnect. This provides both business and customers with transparency on who they are communicating and connected, for mutual benefit.
                        <br />
                        <br />

                        <a href='https://klosertoyou.com/' target="_blank">KloserToYou</a> marketing breakthrough opens new-opportunities that have not existed before for small and medium sized business(B2C) to connect with customers and increase their revenue. The possibilities are endless. Customers can save money by receiving targeted and timed-special offers from business they are interested in and that are close to them. This sustains revenue from businesses in the neighborhood and has a mutual benefit. Customers connecting with business would get connected by their address@businessname.com this establishes a closed network that eliminates unwanted and unsolicited mail and advertising.
                        <br />
                        <br />
                        Example of a geo-coded Personal digitized email:
                        <br />
                        <br />
                    </p>
                    <p style={{ textAlign: "center", fontSize: "12px" }}>
                        50-western-battery-road-toronto-ontario-m6k-3p1@AlphC.com <br />
                        89-western-battery-road-toronto-ontario-m6k-3n9@AlphC.com
                        <br />
                        <br />
                        <b> An Example, AlphC IP showing Mapped Geo-Coded Addresses </b>
                        <br />
                    </p>
                    <Row>
                        <Col className="text-center">
                            <figure className="figure border_img">
                                <img
                                    src="/assets/img/about_us.jpg"
                                    className="figure-img img-fluid rounded"
                                    alt="Simple one-button alert for residents and first responders"
                                />
                            </figure>
                        </Col>
                    </Row>
                    <p className="figure-caption">
                        KloserToYou maps and shows all business in your area. Allowing customers to connect or disconnect to them based on need
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default AboutUs;
