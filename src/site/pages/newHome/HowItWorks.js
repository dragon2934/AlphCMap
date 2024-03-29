import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import {
    CRow,
    CTabs,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink,
} from '@coreui/react';
const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <main>
            <Header />
            <div className="content how-it-works">
                <Container>
                    <Row className="section-title">
                        <Col>How it works</Col>
                    </Row>


                    <CTabs activeTab="business_account"
                        onActiveTabChange={(idx) => setActiveTab(idx)}>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink data-tab="business_account">
                                    Business Account
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink data-tab="personal_account">
                                    Personal Account
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane data-tab="business_account"  >
                                <CRow active={activeTab === 0}>
                                    <br />
                                    <p>
                                        1. Create your KloserToYou business account by entering your business address. A unique geo-coded email is created for each location and business name. Using AlphC three factor authentication verifies the identity of all users by their email, mobile number, and address location for B2C and B2B communication.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b1.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            KloserToYou geo-coded email creates a closed-ended, mapped, secure, authenticated communication network between businesses and their customers
                                        </p>
                                    </p>

                                    <p>
                                        <br /><br />
                                        2. Switch to “Edit Mode” to add customer and send them notification to connect with the business.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b2.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            Edit mode (green) lets you add customer. Addresses remain grey when pending and turn blue when customer has accepted connection. Grey-dotted line shows your customer
                                        </p>
                                    </p>

                                    <p>
                                        <br /><br />
                                        3. Customer receive an email or text message requesting “Connect with Us.” Technology and IP services provided by Alphabet Communication (AlphC)
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b3.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>

                                        <p className="figure-caption">
                                            Customer can “connect” with business by entering their password or completing their profile, address, email, and mobile No. With KloserToYou customer remains in control and can unsubscribe and “disconnect” or connect with any business. Customer have a mapped location-view of all business they are connected to.
                                        </p>
                                    </p>

                                    <p><br /><br />
                                        4. “Connect with Us” lets you connect to the business.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b4.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>

                                        <p className="figure-caption">
                                            Existing user can connect by entering their password. New users can “GET CODE,” verify, create password, and complete registration and connect to the business.
                                        </p>
                                    </p>

                                    <p>

                                        <br /><br />
                                        5. “Connect Mode” lets you send panned-targeted email and timed communication to your customers.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b5.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            Time sensitive special offers that are targeted increase business revenue. For example, special food offers such a half-price pizza from 3-5pm.  This targeted and address- based communication network has many possibilities for businesses
                                        </p>


                                    </p>

                                    <p>

                                        <br /><br />
                                        6. Custom design your targeted-email for maximum effect and increase your business revenue.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b6.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            KloserToYou direct-targeted customer communication network has many possibilities. Upload your weekly or time sensitive flyer. Increase your revenue and increase your visibility. Send special offers and stay connected with your customers!
                                        </p>
                                        <br />
                                        There are many other benefits and connection possibilities for both business and customers on the KloserToYou platform, the above is but a brief summary of our infinite possibilities. We can be reach at anything@AlphC.com
                                        <br /> <br /><br /><br />
                                    </p>



                                </CRow>
                            </CTabPane>

                            <CTabPane data-tab="personal_account"  >
                                <CRow active={activeTab === 1}>
                                    <p>
                                        <br />
                                        1. KloserToYou personal account can be created when a connect link is received from the business or via the login-in process. Customers living or working within very close proximity of a business may select “NO DELIVERY” and your address is not required.
                                        <br /><br />

                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/p1.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>

                                        <p className="figure-caption">
                                            KloserToYou business connect link can be sent via email or text to customers.
                                        </p>



                                    </p>

                                    <p>
                                        <br /><br />
                                        2. “Connect with Us” link received by a customer via email also lets you connect to the business (See No 3. How it works - Business Account).
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/b4.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            Existing user can connect by entering their password. New users can “GET CODE,” verify, create password, and complete registration and connect to the business.
                                        </p>
                                    </p>

                                    <p>
                                        <br /><br />
                                        3. When you login to “Personal Account” your mapped-address appears and other businesses that are KloserToYou. The solid-line shows connection link to your business.
                                        <br /><br />
                                        <figure className="figure border_img">
                                            <img
                                                src="/assets/img/how-it-works/p3.png"
                                                className="figure-img img-fluid rounded"
                                                alt="Simple one-button alert for residents and first responders"
                                            />

                                        </figure>
                                        <p className="figure-caption">
                                            Once connected to a business you can communicate with them. Customers are always in control you can, click on any business location to connect or disconnect.
                                        </p>

                                        <br /> <br />
                                        KloserToYou marketing platform has created a revolutionary communication network that will benefit business and consumers. A transparent mapped communication network that eliminates unsolicited emails, this will change the marketing landscape keeping customers in control while helping small businesses. After all we all have an address.
                                        <br /> <br />

                                        Question and inquiries:  anything@AlphC.com <br />
                                        Licensing our IP and Technology:  patents@AlphC.com
                                        <br /> <br /><br /> <br />
                                    </p>

                                </CRow>
                            </CTabPane>

                        </CTabContent>
                    </CTabs>

                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default HowItWorks;
