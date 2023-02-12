import { MapMarkerUrls } from '../../../constants';
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getBusinessProfile, saveMerchantConnection, disConnectionMerchant } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';
const BusinessPortal = ({ match }) => {

    // console.log('..match..' + JSON.stringify(match));
    const propertyId = match.params.id;
    const utilsData = useSelector((state) => state.utilsData);
    const history = useHistory();

    const dispatch = useDispatch();
    // const property = utilsData.selectedProperty;
    // console.log('..property.. ' + JSON.stringify(property));
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);

    const getWorkingHourValue = (hours, dayOfWeek, index) => {
        const item = hours.filter((hour) => {
            return parseInt(hour.dayOfWeek) === dayOfWeek;

        });
        // console.log('..item..' + JSON.stringify(item));
        if (item && item.length > 0) {
            if (index === 1) return item[0].openHour;
            if (index === 2) return item[0].closeHour;
            if (index === 3) {
                // console.log('..item[0].closed..' + item[0].closed);
                return item[0].closed;
            }
        }
        return '';
    };
    const [workingHour, setWorkingHour] = useState([]);
    useEffect(() => {
        // setLoading(true);
        dispatch(getBusinessProfile({ id: propertyId })).then((resp) => {
            console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);
            setProperty(resp.value.property);
            setLoading(false);

        }

        );
        return () => { };
    }, [dispatch]);

    const disConnectToMerchant = () => {
        const jsonData = {
            merchant_property_id: property.id
        }
        dispatch(disConnectionMerchant(jsonData)).then(resp => {
            console.log('disconnect ..' + JSON.stringify(resp));
            utilsData.showBusinessInfo = false;
            const fncCallback = utilsData.fncCallback;
            dispatch(cancelShowBusinessInfo()).then(resp => {
                history.push('/');
            });

        }).catch(error => {

        })
    }
    const connectToMerchant = () => {

        //check user whether login
        if (user !== null && user !== undefined) {
            //user already login, just connect them together
            const jsonData = {
                merchant_property_id: property.id
            }
            dispatch(saveMerchantConnection(jsonData)).then(resp => {
                history.push('/');
            }).catch(error => {
                console.log('...save connection error');
            })
        } else {
            utilsData.connectToMerchantId = property.id;
            console.log('..start to connect to merchant..' + property.id);
            const blankAddress = {
                "postalCode": "",
                "streetNumber": "",
                "route": "",
                "locality": "",
                "city": "",
                "country": "",
            };
            dispatch(setPropertyRegistrationForm({
                address: blankAddress,
                active: true,
            })).then(resp => {
                history.push('/');
            });
        }
    }

    return !loading && (
        <Col md={12} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row style={{ width: "100%" }}>

                <Col style={{ textAlign: "left" }}>
                    {
                        companyProfile && (
                            <>

                                <Row>
                                    <Col><h1>{companyProfile.companyName}</h1></Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-address"></i> {property.streetNumber + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postalCode} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-globe"></i> <a href={companyProfile.website} target="_blank" className='business_link'>Company Website</a> </Col> </Row>
                                {property.binding_email && property.binding_email !== null && property.binding_email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.binding_email} </Col> </Row> : null}
                                <Row>
                                    <Col> <hr /></Col>

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Monday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 0, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 0, 1)} - {getWorkingHourValue(workingHour, 0, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Tuesday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 1, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 1, 1)} - {getWorkingHourValue(workingHour, 1, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Wednesday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 2, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 2, 1)} - {getWorkingHourValue(workingHour, 2, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Thursday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 3, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 3, 1)} - {getWorkingHourValue(workingHour, 3, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Friday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 4, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 4, 1)} - {getWorkingHourValue(workingHour, 4, 2)}
                                            </Col>
                                        </>
                                    }


                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Saturday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 5, 3) === true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 5, 1)} - {getWorkingHourValue(workingHour, 5, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        Sunday:
                                    </Col>
                                    {getWorkingHourValue(workingHour, 6, 3) == true ?
                                        <>       <Col md={6}>
                                            We're Closed
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                {getWorkingHourValue(workingHour, 6, 1)} - {getWorkingHourValue(workingHour, 6, 2)}
                                            </Col>
                                        </>
                                    }

                                </Row>
                            </>
                        )
                    }

                </Col>
            </Row>
            <Row>
                <Col>

                    {property.connected === "1" ?
                        <Button
                            className="mt-1 mb-5"
                            color={'success'}
                            block
                            onClick={() => disConnectToMerchant()}>
                            DisConnect
                        </Button> :
                        <Button
                            className="mt-1 mb-5"
                            color={'success'}
                            block
                            onClick={() => connectToMerchant()}>
                            Connect
                        </Button>
                    }
                </Col>



            </Row>
        </Col>
    );
};
export default BusinessPortal;