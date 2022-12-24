import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
const MemberShip = () => {
    const Checkout = (e) => {
        //do checkout
    }
    return (
        <main>
            <Header />
            <div className="content privacy-policy">
                <Container>
                    <Row className="section-title">
                        <Col>Checkout Our MemberShip</Col>
                    </Row>

                    <Row>

                        <Col xs="3" className='pricing_item'>Essentials</Col>
                        <Col xs="3" className='pricing_item'>Standard</Col>
                        <Col xs="3" className='pricing_item'>Premium <hr />
                            Starts at <br />
                            C$50/month*
                            <br />
                            <Button onClick={(e) => Checkout(e)} >Buy Now</Button>
                        </Col>
                        <Col xs="3" className='pricing_item'>Free</Col>
                    </Row>



                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default MemberShip;
