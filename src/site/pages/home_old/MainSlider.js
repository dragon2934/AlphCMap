import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import VideoModal from '../../components/VideoModal';

const MainSlider = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className={'vh-100 main-slider'}>
                <Container>
                    <Row className={'main-slider-text'}>
                        <Col>
                            <Row className={'slogan'}>
                                Alphabet Communication assigns an email address
                                to every physical address in the world, creating
                                the world's first complete global communication
                                network.
                            </Row>
                            <Row className={'slogan inner-text'}>
                                <Button
                                    className={'play-button'}
                                    onClick={() => setModalShow(true)}>
                                    <i className="fa fa-play" />
                                    Watch to Find Out More
                                </Button>
                                <Button
                                    className={'play-button'}
                                    tag={Link}
                                    to={'/register-property'}>
                                    <i className="fa fa-pencil" />
                                    Register Your Address
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <VideoModal isOpen={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};
export default MainSlider;
