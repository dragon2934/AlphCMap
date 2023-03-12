import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
    Button,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    Row,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import { iOSChangePassword } from '../../../redux/actionCreators/authActionCreators';
import { useHistory } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const validationSchema = Yup.object({
    password: Yup.string()
        // eslint-disable-next-line no-template-curly-in-string
        .min(6, 'Password must be at least ${min} characters!')
        .max(32)
        .required('Password is required'),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     'Must contain 8 characters, one uppercase, one lowercase and one number',
    // ),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('This field is required'),
});

const ResetPassword3 = ({
    match: {
        params: { mobileNumber },
    },
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);

            dispatch(iOSChangePassword(mobileNumber, values.password)).then((response) => {
                setSubmitting(false);
                if (response.value.error && response.value.error.status > 300) {
                    toastr.error('Error', response.value.error.details[0].messages[0].message);

                } else {
                    toastr.success('Successful!', 'Password has been changed.');
                }
            });
        },
    });

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
    } = formik;

    return (
        <main>
            <Header />
            <div className="full-screen">
                <Container>
                    <Row className="section-title">
                        <Col>Change Password</Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
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
                                    type={'submit'}
                                    block
                                    disabled={isSubmitting}
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
                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default ResetPassword3;
