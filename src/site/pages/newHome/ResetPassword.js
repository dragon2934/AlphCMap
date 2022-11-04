import {useFormik} from 'formik';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
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
import {resetPassword} from '../../../redux/actionCreators/authActionCreators';

const validationSchema = Yup.object({
    mobileNumber: Yup.number().required('Mobile number is required'),
});

const ResetPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            mobileNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(resetPassword(values.mobileNumber))
                .then((res) => {
                    history.push(
                        `/mobile-verify-reset-password/${values.mobileNumber}`,
                    );
                })
                .catch((e) => {
                    setFieldError(
                        'mobileNumber',
                        e.message[0].messages[0].message,
                    );
                })
                .finally(() => {
                    setSubmitting(false);
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
        setFieldError,
    } = formik;

    return (
        <div className="full-screen">
            <Container>
                <Row className="section-title">
                    <Col>Reset Password</Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <MobileInput
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            placeholder="Mobile Number"
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
                                    <Spinner bsSize="sm" />
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default ResetPassword;
