import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Col,
    Container,
    Form,
    FormFeedback,
    InputGroup,
    Input,
    Row,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
// import MobileInput from '../../../common/components/MobileInput';
import {
    resendEmailVerificationCode,
    updateAccount,
} from '../../../redux/actionCreators/appActionCreators';
import EmailVerification from '../accountVerification/EmailVerification';
import {toastr} from 'react-redux-toastr';

const validationSchema = Yup.object({
    eMailAddress: Yup.string().email('Invalid email format').required('E-Mail address is required'),
});

const ChangeEMail = () => {
    const [eMailAddressSelected, setEMailAddressSelected] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            eMailAddress: user.email,
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(
                updateAccount({
                    email: values.eMailAddress,
                    emailVerified: false,
                })
            ).then((res) => {
                setSubmitting(false);
                setEMailAddressSelected(true);

                dispatch(resendEmailVerificationCode(values.eMailAddress))
                    .then(({value: {user}}) => {
                        console.log('change mobile..ret:' + JSON.stringify(user));
                        if (user.emailVerified) {
                            if (window.ReactNativeWebView) {
                                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({result: 'success'}),
                                );
                            }
                        }
                    }).catch(error=>{
                        console.log(' error...' + JSON.stringify(error));
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }).catch(error=>{
                if(error.statusCode && error.statusCode ===401){
                    toastr.error('Error',error.message);
                }
                if(error.statusCode && error.statusCode ===500){
                    toastr.error('Error','Mobile No. already registered');
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
        handleBlur,
        handleChange,
        setFieldValue,
        setFieldTouched,
    } = formik;

    return (
        <div className="full-screen">
            <Container>
                <Row className="section-title">
                    <Col>Change Email Address</Col>
                </Row>
                {!eMailAddressSelected && (
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            {/* <Input
                                type="text"
                                // setFieldValue={setFieldValue}
                                // setFieldTouched={setFieldTouched}
                                placeholder="Email address"
                                disabled={eMailAddressSelected}
                                name={'eMailAddress'}
                                // onChange={handleChange}
                                value={values.eMailAddress}
                                invalid={
                                    touched.eMailAddress && errors.eMailAddress
                                }
                            /> */}
                             <Input
                                type="email"
                                name="eMailAddress"
                                id="email"
                                value={values.eMailAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}

                                invalid={touched.eMailAddress && errors.eMailAddress}
                                placeholder="myemail@email.com"
                            />
                            <FormFeedback>{errors.eMailAddress}</FormFeedback>
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

                {eMailAddressSelected && <EmailVerification />}
            </Container>
        </div>
    );
};

export default ChangeEMail;
