import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { useHistory } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { fetchProductDetails, createStripeSession } from '../../../redux/actionCreators/checkoutCreators';
import { useSelector, useDispatch } from 'react-redux';
const Checkout = ({
    match: {
        params: { id },
    },
}) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const pathInfo = history.location.pathname.split("/");
    console.log('...history. path.. id = ' + JSON.stringify(pathInfo));
    const [productInfo, setProductInfo] = useState(null);
    const productId = pathInfo[2];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProductDetails(productId)).then(resp => {
            console.log('product info' + JSON.stringify(resp));
            setProductInfo(resp.value);
            setLoading(false);
        }).catch(error => {
            console.log('get product ');
            setLoading(false);
        });
        return () => { };
    }, [dispatch]);

    const Checkout = (e) => {
        //do checkout, create session
        dispatch(createStripeSession(productInfo)).then(resp => {
            // console.log('..stripe session..' + JSON.stringify(resp));
            window.location.replace(resp.value.url);
        }).catch(error => {
            console.log('..checkout failed');
        })
    }

    return (
        <main>
            <Header />
            <div className="content privacy-policy">
                <Container>
                    <Row className="section-title">
                        <Col>Checkout Our MemberShip</Col>
                    </Row>
                    {
                        !loading && (
                            <>
                                <Row> {productInfo.title} </Row>
                                <Row> {productInfo.description} </Row>

                                <Row> C${productInfo.price} </Row>
                                <Row> <Button onClick={(e) => Checkout(e)}> Checkout</Button> </Row>
                            </>
                        )
                    }

                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default Checkout;