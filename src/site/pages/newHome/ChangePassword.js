import {useFormik} from 'formik';
import React from 'react';
import {useDispatch} from 'react-redux';
import {toastr} from 'react-redux-toastr';
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
import {changePassword} from '../../../redux/actionCreators/authActionCreators';
import {useHistory} from 'react-router';

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

const ChangePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            dispatch(changePassword(values.password)).then(() => {
                setSubmitting(false);

                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({result: 'success'}),
                    );
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
    );
};

export default ChangePassword;
