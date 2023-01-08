import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import { useHistory } from "react-router-dom";
const MemberShip = () => {
    const history = useHistory();
    const Checkout = (e, productId) => {
        //do checkout
        history.push('/checkout/' + productId);
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
                            <Button type="button" className="SS_ProductCheckout" onClick={(e) => Checkout(e, 1)} > Subscribe </Button>
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
