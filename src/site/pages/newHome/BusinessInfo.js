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
import { getBusinessProfile } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
const BusinessInfo = ({ }) => {

    const utilsData = useSelector((state) => state.utilsData);

    const dispatch = useDispatch();
    const property = utilsData.selectedProperty;
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);

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
        dispatch(getBusinessProfile({ id: property.id })).then((resp) => {
            console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);

        }

        );
        return () => { };
    }, [dispatch]);


    return (
        <Col md={3} sm={12} xs={12} className="overlay-form-container">
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
                                <Row>   <Col><i className="fa-solid fa-address"></i> {property.street_number + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postal_code} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-globe"></i> {companyProfile.website} </Col> </Row>
                                <Row>
                                    <Col>Working Hours <hr /></Col>

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Monday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 0, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 0, 1)} - {getWorkingHourValue(workingHour, 0, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Tuesday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 1, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 1, 1)} - {getWorkingHourValue(workingHour, 1, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Wednesday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 2, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 2, 1)} - {getWorkingHourValue(workingHour, 2, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Thursday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 3, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 3, 1)} - {getWorkingHourValue(workingHour, 3, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Friday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 4, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 4, 1)} - {getWorkingHourValue(workingHour, 4, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Saturday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 5, 3) === true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 5, 1)} - {getWorkingHourValue(workingHour, 5, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Sunday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 6, 3) == true ?
                                        <>       <Col md={6}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={6}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 6, 1)} - {getWorkingHourValue(workingHour, 6, 2)} </Label>
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


                    <Button
                        className="mt-1 mb-5"
                        color={'success'}
                        block
                        onClick={() => {
                            const email = utilsData.emailForChangeColor
                            const data = {
                                email: email,
                                color: color,
                                ownerMobileNumber: user.mobileNumber,
                            };
                            utilsData.changeColor = false;
                            dispatch(changePropertyColor(data)).then(resp => {
                                console.log('...change color..' + JSON.stringify(resp));
                                setTimeout(function () {
                                    callback(true, color, email);
                                }, 500)

                                // history.push("/");
                            })
                                .catch(error => {
                                    callback(false, color, email);
                                    console.log('...change color error..' + JSON.stringify(error));
                                })
                        }}>
                        Connect
                    </Button>
                </Col>
                <Col>
                    <Button
                        className="mt-1 mb-5"
                        color={'danger'}
                        block
                        onClick={() => {
                            // const data = {
                            //     email: utilsData.emailForChangeColor,
                            //     color: color
                            // };
                            utilsData.showBusinessInfo = false;
                            dispatch(cancelShowBusinessInfo());
                        }}>
                        Cancel
                    </Button>
                </Col>


            </Row>
        </Col>
    );
};
export default BusinessInfo;