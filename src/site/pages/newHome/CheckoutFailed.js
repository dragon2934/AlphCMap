import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import { useHistory } from "react-router-dom";
const CheckoutFailed = () => {
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
                        <Col>Checkout Failed</Col>
                    </Row>





                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default CheckoutFailed;
