import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    FormGroup,
    Label,
    Form,
    FormFeedback,
    Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getBusinessProfile, unSubscribeMerchant } from '../../../redux/actionCreators/adminActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from "antd/lib/input/TextArea";
const bindingSchema = Yup.object().shape({
    content: Yup.string().required('This field is required'),
});

const UnSubscribe = ({ match }) => {

    // console.log('..match..' + JSON.stringify(match));
    const history = useHistory();
    const queryPage = history.location.search;
    const email = queryPage.split('=')[1]
    // console.log('..queryPage..' + queryPage);
    const propertyId = match.params.id;
    const utilsData = useSelector((state) => state.utilsData);

    const dispatch = useDispatch();
    // const property = utilsData.selectedProperty;
    // console.log('..property.. ' + JSON.stringify(property));
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const [unscribed, setUnscribed] = useState(false);

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


    const formik = useFormik({
        initialValues: {
            content: ''
        },
        isInitialValid: false,
        validationSchema: bindingSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            const jsonData = {
                propertyId: propertyId,
                email: email,
                message: values.content
            }
            dispatch(unSubscribeMerchant(jsonData)).then(resp => {
                console.log('..unsubscribe return..' + JSON.stringify(resp));
                setUnscribed(true);
            }).catch(error => {
                console.log('..unscribe error..' + JSON.stringify(error));
            })

        }
    });
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isValid,
        isSubmitting,
        setFieldValue,
        values,
    } = formik;

    const [current, setCurrent] = useState(0);
    const limitWords = (e) => {
        const currentLength = e.target.value.length;
        setCurrent(currentLength)
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
            {unscribed ? <Row>
                <Col> UnSubscribe Successful! Sorry to see you go!
                </Col>
            </Row> :
                <Form onSubmit={handleSubmit} style={{ width: "80%" }}>
                    <Row md={12} sm={12} xs={12} style={{ width: "100%" }}>

                        <Col style={{ textAlign: "left" }}>
                            {
                                companyProfile && (
                                    <>

                                        <Row>
                                            <Col><h1>{companyProfile.companyName}</h1></Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-address"></i> {property.streetNumber + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postalCode} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-globe"></i> {companyProfile.website} </Col> </Row>
                                        {property.binding_email && property.binding_email !== null && property.binding_email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.binding_email} </Col> </Row> : null}
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
                        <Col style={{ textAlign: "left" }}>
                            <Label for="lblPropertyName">Please let us know why you want to disconnect:</Label>
                            <FormGroup class="wrapper">
                                <TextArea
                                    maxLength={1000}
                                    rows={5}
                                    type="text"
                                    name="content"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onKeyUp={(e) => limitWords(e)}
                                    value={values.content}
                                    invalid={touched.content && errors.content}
                                />
                                <div id="the-count">
                                    <span id="current">{current}</span>
                                    <span id="maximum">/ 1000</span>
                                </div>
                                <FormFeedback>{errors.content}</FormFeedback>
                            </FormGroup>
                            <Button block disabled={!isValid || isSubmitting}>
                                {isSubmitting ? <Spinner size={'sm'} /> : 'DisConnect'}
                            </Button>

                        </Col>
                    </Row>

                </Form>
            }
        </Col>
    );
};
export default UnSubscribe;