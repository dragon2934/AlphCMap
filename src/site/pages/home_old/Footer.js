import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const Footer = () => {
    return (
        <div className={'footer-wrap'}>
            <div className={'footer'}>
                <Container>
                    <Row>
                        <Col
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            className={'footer-block'}>
                            <p>
                                At AlphC our primary focus is to make the world
                                safe and to save lives across the globe.
                            </p>
                            <p>
                                Our platform provides critical communication
                                capability when the need is paramount and an
                                unprecedented lifeline for First Responders to
                                reach every address and resident in emergency
                                situations.
                            </p>
                        </Col>
                        <Col
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            className={'footer-block'}>
                            <div className={'footer-title'}>Contact Us</div>
                            <div className={'footer-content'}>
                                Please feel free to contact us for more
                                information
                            </div>
                            <div className={'footer-subcontent'}>
                                To license our IP and technology, you can
                                contact us at{' '}
                                <a href={'mailto:anything@alphc.com'}>
                                    anything@alphc.com
                                </a>
                            </div>

                            <div className={'footer-subcontent'}>
                                General inquiries can be sent to{' '}
                                <a
                                    href={
                                        'mailto:anything@alphabetcommunication.com'
                                    }>
                                    anything@alphabetcommunication.com
                                </a>
                            </div>
                        </Col>
                        <Col
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            className={'footer-block'}>
                            <div className={'footer-title'}>News From Us</div>
                            <div className={'footer-content'}>
                                Reach to the lastest news published
                            </div>
                            <div className={'footer-subcontent'}>
                                <a
                                    href={
                                        'https://www.newswire.ca/news-releases/alphabet-communication-aims-to-connect-every-address-and-make-the-world-safer-639131043.html'
                                    }
                                    rel="noopener noreferrer"
                                    target={'_blank'}>
                                    August 8, 2017
                                </a>
                            </div>
                            <div className={'footer-subcontent'}>
                                <a
                                    href={
                                        'https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html'
                                    }
                                    rel="noopener noreferrer"
                                    target={'_blank'}>
                                    January 10, 2018
                                </a>
                            </div>

                            <div
                                className={'footer-title'}
                                style={{paddingTop: '0.8em'}}>
                                Follow Us
                            </div>
                            <div className={'icon-container'}>
                                <a
                                    href={
                                        'https://www.facebook.com/AlphC-120863511757446/'
                                    }
                                    rel="noopener noreferrer"
                                    target={'_blank'}>
                                    <i className="fa fa-facebook" />
                                </a>
                                <a
                                    href={'https://twitter.com/AlphC1'}
                                    rel="noopener noreferrer"
                                    target={'_blank'}>
                                    <i className="fa fa-twitter" />
                                </a>
                                <a
                                    href={
                                        'https://www.instagram.com/alphabet_communication'
                                    }
                                    rel="noopener noreferrer"
                                    target={'_blank'}>
                                    <i className="fa fa-instagram" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={'sub-footer'} style={{backgroundColor: 'black'}}>
                <Row>
                    <Col>
                        <div className="copyright">
                            2020 © AlphC All Rights Reserved | Developed by{' '}
                            <a
                                href={'http://nyzsoft.com/'}
                                rel="noopener noreferrer"
                                target={'_blank'}>
                                NYZsoft.
                            </a>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    );
};
export default Footer;
