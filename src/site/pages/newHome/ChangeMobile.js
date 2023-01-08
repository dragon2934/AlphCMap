import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Col,
    Container,
    Form,
    FormFeedback,
    InputGroup,
    Row,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import MobileInput from '../../../common/components/MobileInput';
import {
    resendMobileVerificationCode,
    updateAccount,
} from '../../../redux/actionCreators/appActionCreators';
import MobileVerification from '../accountVerification/MobileVerification';
import { toastr } from 'react-redux-toastr';
import Footer from './Footer';
import Header from './Header';

const validationSchema = Yup.object({
    mobileNumber: Yup.number().required('Mobile number is required'),
});

const ChangeMobile = () => {
    const [mobileNumberSelected, setMobileNumberSelected] = useState(false);
    const user = useSelector((state) => state.auth.me);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            mobileNumber: user.mobileNumber,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(
                updateAccount({
                    username: values.mobileNumber,
                    mobileNumber: values.mobileNumber,
                    mobileVerified: false,
                })
            ).then((res) => {
                setSubmitting(false);
                setMobileNumberSelected(true);

                dispatch(resendMobileVerificationCode(values.mobileNumber))
                    .then(({ value: { user } }) => {
                        console.log('change mobile..ret:' + JSON.stringify(user));
                        if (user.mobileVerified) {
                            if (window.ReactNativeWebView) {
                                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({ result: 'success' }),
                                );
                            }
                        }
                    }).catch(error => {
                        console.log(' error...' + JSON.stringify(error));
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }).catch(error => {
                if (error.statusCode && error.statusCode === 401) {
                    toastr.error('Error', error.message);
                }
                if (error.statusCode && error.statusCode === 500) {
                    toastr.error('Error', 'Mobile No. already registered');
                }
                setSubmitting(false);
                console.log('update account...error:' + JSON.stringify(error));
            });
        },
    });

    const {
        values,
        touched,
        errors,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
    } = formik;

    return (
        <main>
            <Header />
            <div className="full-screen">
                <Container>
                    <Row className="section-title">
                        <Col>Change Mobile Number</Col>
                    </Row>
                    {!mobileNumberSelected && (
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <MobileInput
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    placeholder="Mobile Number"
                                    disabled={mobileNumberSelected}
                                    name={'mobileNumber'}
                                    value={values.mobileNumber}
                                    invalid={
                                        touched.mobileNumber && errors.mobileNumber
                                    }
                                />
                                <FormFeedback>{errors.mobileNumber}</FormFeedback>
                            </InputGroup>
                            <Row className="contact-us-submit-container">
                                <Col>
                                    <Button
                                        type={'submit'}
                                        block
                                        disabled={!isValid || isSubmitting}
                                        outline
                                        className="float-right my-3">
                                        {isSubmitting ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            'Submit'
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}

                    {mobileNumberSelected && <MobileVerification />}
                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default ChangeMobile;
