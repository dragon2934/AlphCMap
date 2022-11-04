import {useFormik} from 'formik';
import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
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
} from 'reactstrap';
import Alert from 'reactstrap/es/Alert';
import * as Yup from 'yup';
import MobileInput from '../../common/components/MobileInput';
import {loginUser} from '../../redux/actionCreators/authActionCreators';
import HomeLayout from '../layouts/HomeLayout';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Mobile number is required'),
    password: Yup.string()
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!')
        .required('Password is required'),
});

const Login = ({history}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: 'test@nyzsoft.com',
            password: '123456',
        },
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setError(null);
            setSubmitting(true);
            dispatch(loginUser(values.email, values.password))
                .then((response) => {
                    if (response.statusCode > 300) {
                        setError(response.message[0].messages[0].message);
                    } else {
                        history.push('/');
                    }
                })
                .catch(() => {})
                .finally(() => {
                    setSubmitting(false);
                });
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
        setFieldTouched,
    } = formik;

    return (
        <HomeLayout>
            <Row noGutters className="login-container">
                <Col lg={4} md={12} className="sidenav">
                    <div className="login-main-text">
                        <h2>
                            Application
                            <br /> Login Page
                        </h2>
                        <p className="mt-5 flex-grow-0">
                            You can login with your email address or mobile
                            number. Click{' '}
                            <b>
                                <Link to={'/'}>here</Link>
                            </b>{' '}
                            to go back to homepage.
                        </p>
                    </div>
                </Col>
                <Col lg={4} md={12} className="main">
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
                                    <MobileInput
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
                                <Button block disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Spinner size={'sm'} />
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Col>
                        </Form>
                    </div>
                </Col>
            </Row>
        </HomeLayout>
    );
};

export default Login;
