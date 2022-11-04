import React from 'react';
import {CardBody, Col, Container, Row} from 'reactstrap';
import ContactForm from './contact/ContactForm';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const ContactUs = () => {
    return (
        // <GoogleReCaptchaProvider reCaptchaKey="6Ldf8uUdAAAAAFk2BsP18xvLR5CdEJ6b0O528oSH">
        <div className="full-screen contact-us">
            <Container>
                <Row className="section-title">
                    <Col>Contact Us</Col>
                </Row>
                <Row>
                    <Col md={12} lg={6}>
                        <CardBody className="contact text-center">
                            <h3 className="my-4 pb-2">Contact information</h3>
                            <ul className="text-lg-left list-unstyled ml-4">
                                <li>
                                    <p>
                                        <i className="fa fa-envelope pr-2" />
                                        anything@alphc.com
                                    </p>
                                </li>
                            </ul>
                            <hr className="hr-light my-4" />
                            <ul className="list-inline text-center list-unstyled">
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.instagram.com"
                                        className="p-2 fa-lg tw-ic">
                                        <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.linkedin.com"
                                        className="p-2 fa-lg li-ic">
                                        <i className="fa fa-linkedin" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.facebook.com"
                                        className="p-2 fa-lg ins-ic">
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </CardBody>
                        {/*{*/}
                        {/*    "location": {*/}
                        {/*    "lat": 43.790261,*/}
                        {/*    "lng": -79.3604798*/}
                        {/*}*/}
                        {/*}*/}
                    </Col>
                    <Col md={12} lg={6}>
                        <ContactForm />
                    </Col>
                </Row>
            </Container>
        </div>
        // </GoogleReCaptchaProvider>
    );
};
export default ContactUs;
