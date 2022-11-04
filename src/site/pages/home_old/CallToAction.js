import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import Slider from '../../components/Slider';

const CallToAction = () => {
    return (
        <Slider
            id={'slider1'}
            className={'vh-50'}
            image={'/assets/img/firefighter.jpg'}
            style={{position: 'relative', zIndex: '1'}}>
            <div className={'hero-content'}>
                <Container>
                    <Row noGutters>
                        <Col className={'slogan-text'}>
                            Get alerts about natural disasters and crisis
                            situations from first responders on the world's only
                            emergency communication app linked directly to your
                            physical address
                        </Col>
                    </Row>
                    <Row noGutters>
                        <Col className={'slogan'}>
                            <Button>Register Your Adress</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Slider>
    );
};
export default CallToAction;
