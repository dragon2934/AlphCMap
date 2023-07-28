import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { unsubscribeBeforeConnect } from '../../../redux/actionCreators/adminActionCreators';
import { useSelector, useDispatch } from 'react-redux';
const UnSubscribed = () => {
    //email=dragon2934%40gmail.com&property_id=153
    const history = useHistory();
    const queryPage = history.location.search;
    const email = queryPage.split('&')[0].split('=')[1];
    const propertyId = queryPage.split('&')[1].split('=')[1];
    const dispatch = useDispatch();
    useEffect(() => {

        const jsonData = {
            propertyId,
            email
        }
        dispatch(unsubscribeBeforeConnect(jsonData)).then(resp => {
            console.log('.. unsubscribe Before Connect ..' + JSON.stringify(resp));
            // let total1 = parseInt(resp.value.value[0].iCount) + parseInt(resp.value.value2);
            // setTotalConnected(total1 > 0 ? total1 : 0);
        }).catch(error => {

        });
        return () => { };
    }, [dispatch]);
    return (
        <Col md={12} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>
            <br /><br /><br /><br /><br />
            <p>  </p>

            <Row>
                <Col> You're unsubscribed.
                </Col>
            </Row>
        </Col>
    );
};

export default UnSubscribed;
