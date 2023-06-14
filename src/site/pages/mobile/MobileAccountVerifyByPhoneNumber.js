import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// import {Button, Modal, ModalBody, Row} from 'reactstrap';
import {
    Button,
    Collapse,
    Input,
    InputGroup,
    Label,
    Row,
    Spinner,
    Col,
    Form,
    FormFeedback,
    FormGroup,
} from 'reactstrap';
import { toggleVerificationModal } from '../../../redux/actionCreators/appActionCreators';
import EmailVerification from '../accountVerification/EmailVerification';
// import MobileVerification from '../accountVerification/MobileVerification';
import { resetRegistrationForm, isMobileRegistered } from '../../../redux/actionCreators/registrationActionCreators';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { resendMobileVerificationCodeByMobileNumber } from '../../../redux/actionCreators/appActionCreators';
import { verifyAccount } from '../../../redux/actionCreators/registrationActionCreators';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required('Verify code is required')
        .min(6, 'Verify code  is too Short!')
        .max(6, 'Verify code  is too Long!'),
    consent: Yup.boolean()
        .required('Confirm you have read Privacy Policy and Terms of Use')
        .oneOf(
            [true],
            'Confirm you have read Privacy Policy and Terms of Use.',
        ),
    liability: Yup.boolean()
        .required('Confirm you have read above instruction')
        .oneOf(
            [true],
            'Confirm you have read above instruction.',
        )

});

const MobileAccountVerifyByPhoneNumber = ({
    match: {
        params: { mobileNumber },
    },
}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [userVerified, setUserVerified] = useState(false);

    const [verificationCode, setVerificationCode] = useState();
    const [remainingTime, setRemainingTime] = useState(0);

    const [resendVisible, setResendVisible] = useState(false);
    const [pendingResend, setPendingResend] = useState(false);
    const [pendingVerify, setPendingVerify] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) { }
    });
    const onClickResendVerificationCode = useCallback(() => {
        setPendingResend(true);

        dispatch(resendMobileVerificationCodeByMobileNumber(mobileNumber)).finally(() => {
            setPendingResend(false);
            toastr.success('Success', ' Verification Code has been sent!');
        });
    }, [dispatch]);
    useEffect(() => {
        dispatch(isMobileRegistered(mobileNumber)).then(({ value: checkUser }) => {
            console.log('get user infor...' + JSON.stringify(checkUser));
            setUser(checkUser);
            const userHasEmail = checkUser.email != null && checkUser.email != undefined
                && checkUser.email.length > 4 && checkUser.username !== checkUser.email;

            const verified =
                (userHasEmail && checkUser.emailVerified && checkUser.mobileVerified) ||
                (!userHasEmail && checkUser.mobileVerified);
            console.log('user verify...' + verified);
            setUserVerified(verified);
        }).catch(error => {
            console.log('check mobile regster error...' + JSON.stringify(error));
        });
    }, [dispatch, setUser, setUserVerified]);

    const formik = useFormik({
        initialValues: {
            verificationCode: '',
            consent: false,
            liability: false
        },
        isInitialValid: false,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(
                verifyAccount({
                    userId: user.mobileNumber,
                    mobileVerificationCode: values.verificationCode,
                }),
            )
                .then(({ value: { user } }) => {
                    if (!user.mobileVerified) {
                        setError('Invalid Verification Code');
                        setPendingVerify(false);
                    }
                    else {
                        setError(null);
                        console.log('mobile verfied...' + JSON.stringify(user));
                        if (currentUser != null || currentUser != undefined) {
                            window.location.reload();
                        }
                    }
                })
                .finally(() => {
                    setPendingVerify(false);
                });
        },
    });

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldError,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
    } = formik;

    const verifyForm = useSelector((state) => state.verifyForm);
    if (user == null) return null;


    let currentUser = user;
    console.log('user ...' + JSON.stringify(user));
    {
        if (user.id != null && user.id === '-1') {
            return (
                <>
                    <div className="content ml-1 mr-1 mt-5 mb-3">
                        <div className={'success mt-5 mb-3'}>
                            This mobile number is not register, please check!
                        </div>
                    </div>
                </>
            )
        } else if (!userVerified) {





            return (
                <div className="content ml-1 mr-1 mt-5 mb-3">

                    <EmailVerification currentUser={user} />


                    <div className="mb-4">
                        <Form onSubmit={handleSubmit}>
                            <Col>
                                <FormGroup>
                                    <Label for="verificationCode">Mobile Verification</Label>
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <InputGroup className="mb-3">
                                        <Input
                                            type="text"
                                            size={'lg'}
                                            name="verificationCode"
                                            value={values.verificationCode}
                                            invalid={!!error}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // invalid={touched.verificationCode && errors.verificationCode}
                                            placeholder="Enter verification code sent to your mobile..."
                                        // onChange={(e) => setVerificationCode(e.currentTarget.value)}
                                        />
                                        <FormFeedback>{error}</FormFeedback>
                                    </InputGroup>
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <Row noGutters className="mt-2 mb-2 justify-content-end">
                                        <Button
                                            className="btn-no-focus"
                                            color={'link'}
                                            tag={'a'}
                                            onClick={() => setResendVisible(!resendVisible)}>
                                            Did not Receive SMS
                                        </Button>


                                        {/* <Button
                    className="btn-no-focus"
                    onClick={onClickVerify}
                    color={pendingVerify ? 'link' : 'primary'}>
                    {pendingVerify ? <Spinner size="sm" /> : 'Verify Mobile'}
                </Button> */}
                                    </Row>
                                </FormGroup></Col>

                            <Col>
                                <FormGroup tag="fieldset">
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                name="consent"
                                                onChange={(e) => {
                                                    setFieldTouched('consent');
                                                    setFieldValue(
                                                        'consent',
                                                        e.currentTarget.checked,
                                                    );
                                                }}
                                                checked={values.consent}
                                                onBlur={handleBlur}
                                                invalid={touched.consent && errors.consent}
                                            />
                                            I've read{' '}
                                            <a href="/privacy-policy">Privacy Policy</a> and{' '}
                                            <a href="/terms-of-use">Terms of Use</a>.
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                name="liability"
                                                onChange={(e) => {
                                                    setFieldTouched('liability');
                                                    setFieldValue(
                                                        'liability',
                                                        e.currentTarget.checked,
                                                    );
                                                }}
                                                checked={values.liability}
                                                onBlur={handleBlur}
                                                invalid={touched.liability && errors.liability}
                                            />
                                            Disclaimer: In an emergency contact your local first responder directly. AlphC E-Alert App is only an aid and is not intended to replace first responders. First responders can license this technology to increase the safety of your community.
                                        </Label>

                                    </FormGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input type="hidden" invalid={errors.consent} />
                                    <FormFeedback>{errors.consent}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input type="hidden" invalid={errors.liability} />
                                    <FormFeedback>{errors.liability}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Button
                                        block
                                        color={'success'}
                                        disabled={!isValid || isSubmitting}>
                                        {isSubmitting && error === null ? <Spinner size={'sm'} /> : 'Verify Mobile'}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Form>

                        <Collapse isOpen={resendVisible}>
                            <Row noGutters className="justify-content-end">
                                <Button
                                    className="btn-no-focus"
                                    size={'lg'}
                                    disabled={remainingTime !== 0}
                                    color={
                                        pendingResend
                                            ? 'link'
                                            : remainingTime !== 0
                                                ? 'danger'
                                                : 'success'
                                    }
                                    onClick={onClickResendVerificationCode} >
                                    {pendingResend ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <>
                                            Resend Verification Code{' '}
                                            {remainingTime !== 0 && (
                                                <>
                                                    {moment()
                                                        .startOf('day')
                                                        .seconds(remainingTime)
                                                        .format('mm:ss')}
                                                </>
                                            )}
                                        </>
                                    )}
                                </Button>
                            </Row>
                        </Collapse>
                    </div>

                </div>
            );


        } else {
            return (
                <>
                    <div className="content ml-1 mr-1 mt-5 mb-3">
                        <div className={'success mt-5 mb-3'}>
                            Verification Successful!
                        </div>
                        <Button
                            block
                            color={'success'}
                            onClick={() => {
                                try {
                                    if (window.ReactNativeWebView) {
                                        dispatch(resetRegistrationForm());
                                        window.ReactNativeWebView.postMessage(
                                            JSON.stringify({ action: 'goBack' }),
                                        );
                                    }
                                } catch (e) {

                                }
                                dispatch(toggleVerificationModal());
                                localStorage.setItem("show_login_tips", 2);
                                setTimeout(() => {
                                    // history.push("/");
                                    history.push('/logout');
                                }, 500);

                            }}>
                            Login and Complete Business Profile
                        </Button>
                    </div>
                </>
            );

        };
    }
    // else{
    //     return (
    //         <div></div>
    //     );
    // }
};

export default MobileAccountVerifyByPhoneNumber;
