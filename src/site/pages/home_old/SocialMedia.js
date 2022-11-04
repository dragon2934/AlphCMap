import React from 'react';
import {Container, Row} from 'reactstrap';

const SocialMedia = () => {
    return (
        <div className={'social-media-section'}>
            <Container className={'footer-top'} fluid={true}>
                <Row style={{fontSize: '1.4em'}}>
                    Share AlphC with your community
                </Row>
                <Row style={{fontSize: '1em'}}>Follow us on</Row>
                <Row className={'icon-container'}>
                    <a
                        href={'https://www.facebook.com/AlphC-120863511757446/'}
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
                </Row>
            </Container>
        </div>
    );
};
export default SocialMedia;
