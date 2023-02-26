import { MapMarkerUrls } from '../../../constants';
import { useFormik } from 'formik';
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
    InputGroup
} from 'reactstrap';
import {
    CTabs,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { getBusinessProfileByConnectToken, confirmConnection } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';
import MobileInput from '../../../common/components/MobileInput';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Mobile number is required'),
    password: Yup.string()
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!')
        .required('Password is required'),
});
const Connect = ({ match }) => {

    // console.log('..match..' + JSON.stringify(match));
    const propertyId = match.params.id;
    const utilsData = useSelector((state) => state.utilsData);
    const history = useHistory();
    const [activeKey, setActiveKey] = useState(1);

    const [error, setError] = useState(null);
    const token = history.location.search.split('=')[1];
    // console.log('..token..' + token);
    const dispatch = useDispatch();
    // const property = utilsData.selectedProperty;
    // console.log('..property.. ' + JSON.stringify(property));
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const [bindingProperty, setBindingProperty] = useState(null);
    const [merchantId, setMerchantId] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: 'test@nyzsoft.com',
            password: '123456',
            passwordConfirmation: '123456'
        },
        onSubmit: (values, { setSubmitting }) => {
            // setError(null);
            // console.log('... activeKey ..' + activeKey);

            // setSubmitting(true);
            // const data = {
            //     mobilePhone: values.email,
            //     password: values.password,
            //     action: activeKey,
            //     propertyId: bindingProperty.id,
            //     bindingName: bindingProperty.bindingName,
            //     merchantId: merchantId
            // }
            // dispatch(confirmConnection(data))
            //     .then((response) => {
            //         if (response.value.error && response.value.error.status > 300) {
            //             toastr.error('Error', response.value.error.details[0].messages[0].message);
            //         } else {
            //             console.log('..start get me');


            //         }
            //     })
            //     .catch((error) => {
            //         console.log('..login error' + JSON.stringify(error));
            //         // toastr.error('Error', response.message[0].messages[0].message);
            //     })
            //     .finally(() => {
            //         setSubmitting(false);
            //     });
        },
    });

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        values,
        setFieldValue,
        setValues,
        setFieldTouched,
    } = formik;
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
        dispatch(getBusinessProfileByConnectToken({ token: token })).then((resp) => {
            // console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);
            setProperty(resp.value.property);
            setBindingProperty(resp.value.bindingProperty);
            setLoading(false);
            setMerchantId(resp.value.merchantId);
            setValues({
                email: resp.value.bindingProperty.bindingPhone

            });

        }

        );
        return () => { };
    }, [dispatch]);
    const confirmConnect = (e) => {

        // setSubmitting(true);
        if (values.password === null || values.password === undefined || values.length < 6) {
            toastr.error('Error', 'Please enter a valid password, minimun 6 char');
            return;
        }
        if (activeKey === 2) {
            if (values.passwordConfirmation === null || values.passwordConfirmation === undefined || values.passwordConfirmation.length < 6) {
                toastr.error('Error', 'Please enter a valid confirm password, minimun 6 char');
                return;
            }
            if (values.password !== values.passwordConfirmation) {
                toastr.error('Error', 'Passwords must match');
                return;
            }
        }
        const data = {
            mobilePhone: values.email,
            password: values.password,
            action: activeKey,
            propertyId: bindingProperty.id,
            bindingName: bindingProperty.bindingName,
            merchantId: merchantId
        }
        console.log('..data..' + JSON.stringify(data));
        dispatch(confirmConnection(data))
            .then((response) => {
                console.log('..response..' + JSON.stringify(response));
                if (response.value.error && response.value.error.status > 300) {
                    toastr.error('Error', response.value.error.details[0].messages[0].message);
                } else {
                    console.log('..start get me');
                    toastr.success('Success', 'Connect successful!');
                    location.replace('/');


                }
            })
            .catch((error) => {
                console.log('..login error' + JSON.stringify(error));
                // toastr.error('Error', response.message[0].messages[0].message);
            })
            .finally(() => {
                // setSubmitting(false);
            });
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
                                {/* {property.binding_email && property.binding_email !== null && property.binding_email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.binding_email} </Col> </Row> : null} */}
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
                <Col>
                    <CTabs activeTab="login">
                        <CNav variant="pills" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    data-tab="login"
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Existing User
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    data-tab="register"
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => {

                                        setActiveKey(2);


                                    }}
                                >
                                    New User
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane role="tabpanel" data-tab="login" aria-labelledby="home-tab" visible={activeKey === 1} >
                                <div className="login-form">
                                    <Form onSubmit={handleSubmit}>
                                        {error && (
                                            <Col>
                                                <Alert color={'danger'}>{error}</Alert>
                                            </Col>
                                        )}
                                        <Col>
                                            <FormGroup>
                                                <Label for="email">Mobile Number</Label>
                                                <Input
                                                    setFieldValue={setFieldValue}
                                                    setFieldTouched={setFieldTouched}
                                                    placeholder="Mobile Number"
                                                    name={'email'}
                                                    value={values.email}
                                                    invalid={touched.email && errors.email}
                                                />
                                                <FormFeedback>{errors.email}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    invalid={
                                                        touched.password && errors.password
                                                    }
                                                    placeholder="********"
                                                />
                                                <FormFeedback>
                                                    {errors.password}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>

                                        <Col>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        onClick={(e) => confirmConnect(e)}
                                                        block
                                                        disabled={isSubmitting}
                                                        outline
                                                        className="float-right my-3">
                                                        {isSubmitting ? (
                                                            <Spinner size={'sm'} />
                                                        ) : (
                                                            'Login and Connect'
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Form>
                                </div>
                            </CTabPane>
                            <CTabPane role="tabpanel" data-tab="register" aria-labelledby="home-tab" visible={activeKey === 2} >
                                <div className='register-form'>
                                    <Form onSubmit={handleSubmit}>

                                        <FormGroup>
                                            <Label for="email">Mobile Number</Label>
                                            <Input
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                placeholder="Mobile Number"
                                                name={'email'}
                                                value={values.email}
                                                invalid={touched.email && errors.email}
                                            />
                                            <FormFeedback>{errors.email}</FormFeedback>
                                        </FormGroup>

                                        <InputGroup className="mb-3">
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                name={'password'}
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={touched.password && errors.password}
                                            />
                                            <FormFeedback>{errors.password}</FormFeedback>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input
                                                type="password"
                                                placeholder="Password Confirmation"
                                                name={'passwordConfirmation'}
                                                value={values.passwordConfirmation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={
                                                    touched.passwordConfirmation &&
                                                    errors.passwordConfirmation
                                                }
                                            />
                                            <FormFeedback>
                                                {errors.passwordConfirmation}
                                            </FormFeedback>
                                        </InputGroup>
                                        <Row className="contact-us-submit-container">
                                            <Col>
                                                <Button
                                                    onClick={(e) => confirmConnect(e)}
                                                    block
                                                    disabled={isSubmitting}
                                                    outline
                                                    className="float-right my-3">
                                                    {isSubmitting ? (
                                                        <Spinner size="sm" />
                                                    ) : (
                                                        'Register and Connect'
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                </Col>
            </Row>

        </Col>
    );
};
export default Connect;