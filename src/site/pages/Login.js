import { useFormik } from 'formik';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
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
import { loginUser, getMe } from '../../redux/actionCreators/authActionCreators';
import HomeLayout from '../layouts/HomeLayout';
import { toastr } from 'react-redux-toastr';
import { setLoginType } from '../../utils/utils';


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Mobile number is required'),
    password: Yup.string()
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!')
        .required('Password is required'),
});

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loginAs, setLoginAs] = useState(1);

    const [txtPassword, setTxtPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...valutxtPasswordes, showPassword: !txtPassword.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const formik = useFormik({
        initialValues: {
            email: 'test@nyzsoft.com',
            password: '123456',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setError(null);
            setSubmitting(true);
            dispatch(loginUser(values.email, values.password, loginAs))
                .then((response) => {
                    if (response.value.error && response.value.error.status > 300) {
                        toastr.error('Error', response.value.error.details[0].messages[0].message);
                    } else {
                        console.log('..start get me');
                        dispatch(getMe(loginAs)).then(resp => {
                            history.push('/');
                        }).catch(error => {
                            toastr.error('Error', "Mobile Or Password doesn't match, Please verify!");
                        });

                    }
                })
                .catch((error) => {
                    console.log('..login error' + JSON.stringify(error));
                    // toastr.error('Error', response.message[0].messages[0].message);
                })
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

    const consumerLogin = (e) => {
        console.log('..consumer login');
        setLoginType(1);
        setLoginAs(1);
        handleSubmit();
    }
    const businessOwnerLogin = (e) => {
        console.log('..business owner login');
        setLoginType(2);
        setLoginAs(2);
        handleSubmit();
    }
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
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
                <Col lg={6} md={12} className="main">
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
                                <FormGroup className='passwordFormGroup'>
                                    <Label for="password">Password</Label>

                                    <Input
                                        type={password}
                                        name="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.password && errors.password
                                        }
                                        placeholder="********"

                                    />
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>

                                    <FormFeedback>
                                        {errors.password}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Form>
                        <Col>
                            <Row>
                                <Col>
                                    <Button onClick={(e) => consumerLogin(e)} block disabled={isSubmitting}>
                                        {isSubmitting && loginAs === 1 ? (
                                            <Spinner size={'sm'} />
                                        ) : (
                                            'Login Personal Account'
                                        )}
                                    </Button>
                                </Col><Col>
                                    <Button onClick={(e) => businessOwnerLogin(e)} block disabled={isSubmitting}>
                                        {isSubmitting && loginAs === 2 ? (
                                            <Spinner size={'sm'} />
                                        ) : (
                                            'Login Business Account'
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup> <br /> <br />
                                        <a href="/reset-password">Forgot Password ?</a>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>


                    </div>
                </Col>
            </Row>
        </HomeLayout>
    );
};

export default Login;
