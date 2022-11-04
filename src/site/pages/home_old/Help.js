import {useFormik} from 'formik';
import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    Row,
} from 'reactstrap';
import * as Yup from 'yup';
import {sendContactForm} from '../../../redux/actionCreators/appActionCreators';

const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    email: Yup.string()
        .email('Email address is not valid')
        .required('This field is required'),
    phone: Yup.string().required('This field is required'),
    message: Yup.string().required('This field is required'),
});

const Help = () => {
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema,
        validateOnBlur: true,
        onSubmit: (values) => {
            submitHelpForm(values);
        },
    });

    const submitHelpForm = useCallback(
        (values) => {
            dispatch(sendContactForm(values))
                .then(() => {
                    formik.resetForm();
                    setAlert(!alert);
                })
                .finally(() => {});
        },
        [alert, dispatch, formik],
    );

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;

    return (
        <>
            <Container className={'help-content-container'}>
                <Row className="justify-content-center">
                    <Col md="12" lg="7" xl="10">
                        <Row className={'alert-container'}>
                            <Alert
                                color="warning"
                                isOpen={alert}
                                toggle={() => setAlert(!alert)}>
                                Your message has been sent. We will get in touch
                                to you soon.
                            </Alert>
                        </Row>
                        <p className="text-muted">
                            Please feel free to contact us for more information
                        </p>
                        <Form className="help-Form" onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    name={'name'}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={touched.name && errors.name}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="email"
                                    invalid={touched.email && errors.email}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Input
                                    type="text"
                                    placeholder="Mobile Phone"
                                    name={'phone'}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="phone"
                                    invalid={touched.phone && errors.phone}
                                />
                                <FormFeedback>{errors.phone}</FormFeedback>
                            </InputGroup>

                            <Input
                                type="textarea"
                                name={'message'}
                                id="textarea-input"
                                rows="5"
                                placeholder="Message..."
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={touched.message && errors.message}
                            />
                            <FormFeedback>{errors.message}</FormFeedback>
                            <Row className="contact-us-submit-container">
                                <Button type={'submit'} block>
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Help;
