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
    Input,
    InputGroup,
    Label,
    Row,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import {verifyResetPassword} from '../../../redux/actionCreators/authActionCreators';

const validationSchema = Yup.object({
    verificationCode: Yup.number().required('Mobile number is required'),
});

const VerifyResetPassword = ({
    match: {
        params: {mobileNumber},
    },
}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            verificationCode: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            console.log('values: ', values);
            dispatch(verifyResetPassword(mobileNumber, values.verificationCode))
                .then(() => {
                    history.push(`/reset-password-3/${mobileNumber}`);
                })
                .catch((e) => {
                    setFieldError(
                        'verificationCode',
                        e.message[0].messages[0].message,
                    );
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    const {
        isValid,
        isSubmitting,
        setFieldError,
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
    } = formik;

    return (
        <div className="full-screen">
            <Container>
                <Row className="section-title">
                    <Col>Reset Password</Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label for="verificationCode">
                            Mobile Verification Code
                        </Label>
                        <InputGroup className="mb-3">
                            <Input
                                name="verificationCode"
                                placeholder="Enter verification code sent to your mobile..."
                                value={values.verificationCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={
                                    touched.verificationCode &&
                                    errors.verificationCode
                                }
                            />
                            <FormFeedback>
                                {errors.verificationCode}
                            </FormFeedback>
                        </InputGroup>
                    </div>
                    <Button
                        type={'submit'}
                        block
                        disabled={!isValid || isSubmitting}
                        outline
                        className="float-right my-3">
                        {isSubmitting ? <Spinner bsSize="sm" /> : 'Submit'}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default VerifyResetPassword;
