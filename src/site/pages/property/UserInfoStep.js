import {useFormik} from 'formik';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import MobileInput from '../../../common/components/MobileInput';
import {
    registerUser,
    resetRegistrationForm,
    setPropertyRegistrationForm,
} from '../../../redux/actionCreators/registrationActionCreators';
import {generateEmail} from '../../../utils/propertyUtils';

const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string().required('Mobile number is required'),
    email: Yup.string().required('Email is required')
           .email('Invalid email'),
    companyName: Yup.string(),
    lastName: Yup.string(),
    // email: Yup.string().email('Invalid email'),
    password: Yup.string()
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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

const UserInfoStep = ({wizardInstance}) => {
    const dispatch = useDispatch();

    const registerForm = useSelector((state) => state.registerForm);
    const {address} = useSelector((state) => state.registerForm);
    address.steps = 3;

    const formik = useFormik({
        initialValues: {
            mobileNumber: '',
            companyName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            consent: false,
            liability:false
        },
        isInitialValid: false,
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            const newUser = {
                property: {
                    email: generateEmail(registerForm.address),
                    rural: registerForm.rural,
                    primaryAddress: registerForm.primaryAddress,
                    addressType: registerForm.addressType,
                    hightRiseOrCommercial: registerForm.hightRiseOrCommercial,
                    totalFloors: registerForm.totalFloors,
                    propertyName: registerForm.propertyName,
                    totalUnitsEachFloor:registerForm.totalUnitsEachFloor,
                    settlementType: registerForm.settlementType,
                    unitNo: registerForm.unitNo,
                    location: {
                        longitude: registerForm.longitude,
                        latitude: registerForm.latitude,
                    },
                    ...registerForm.address,
                },
                mobileNumber: values.mobileNumber,
                companyName: values.companyName,
                lastName: values.lastName,
                email: values.email,
                username: values.email,
                password: values.password,
                provider: 'local',
            };

            dispatch(registerUser(newUser))
                .then(() => {
                    dispatch(
                        setPropertyRegistrationForm({
                            user: newUser,
                        }),
                    ).then(() => {
                        wizardInstance.nextStep();
                    });
                })
                .catch((response) => {
                    if(response.message && response.message[0].messages){
                        switch (response.message[0].messages[0].id) {
                            case 'Auth.form.error.mobileNumber.taken':
                                setFieldError(
                                    'mobileNumber',
                                    'Mobile No. already registered',
                                );
                                break;
                            default:
                                break;
                        }
                    }
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
        values,
        setFieldError,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
    } = formik;

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <FormGroup>
                    <Label for="mobileNumber">Mobile Number</Label>
                    <MobileInput
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        placeholder="Mobile Number"
                        name={'mobileNumber'}
                        value={values.mobileNumber}
                        invalid={touched.mobileNumber && errors.mobileNumber}
                    />
                    <FormFeedback>{errors.mobileNumber}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.companyName && errors.companyName}
                    />
                    <FormFeedback>{errors.companyName}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="lastName">Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.lastName && errors.lastName}
                    />
                    <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.email && errors.email}
                        placeholder="myemail@email.com"
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
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.password && errors.password}
                        placeholder="********"
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="passwordConfirmation">
                        Password Confirmation
                    </Label>
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={
                            touched.passwordConfirmation &&
                            errors.passwordConfirmation
                        }
                        placeholder="********"
                    />
                    <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Input type="hidden" invalid={errors.invalidProperty} />
                    <FormFeedback>{errors.invalidProperty}</FormFeedback>
                </FormGroup>
            </Col>
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
                            <a target={'_blank'} href="/privacy-policy">Privacy Policy</a> and{' '}
                            <a target={ '_blank'} href="/terms-of-use">Terms of Use</a>.
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
                <Button
                    block
                    color={'success'}
                    disabled={!isValid || isSubmitting}>
                    {isSubmitting ? <Spinner size={'sm'} /> : 'Create Account'}
                </Button>
            </Col>
            <Col>
                <Button
                    className="mt-1 mb-5"
                    color={'danger'}
                    block
                    onClick={() => dispatch(resetRegistrationForm())}>
                    Cancel
                </Button>
            </Col>
        </Form>
    );
};

export default UserInfoStep;
