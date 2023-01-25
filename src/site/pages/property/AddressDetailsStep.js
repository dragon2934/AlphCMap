import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
    resetRegistrationForm,
    setPropertyRegistrationForm,
} from '../../../redux/actionCreators/registrationActionCreators';

const validationSchema = Yup.object().shape({});

const AddressDetailsStep = ({ wizardInstance }) => {
    const dispatch = useDispatch();
    const { address, rural } = useSelector((state) => state.registerForm);
    const utilsData = useSelector((state) => state.utilsData);
    address.steps = 1;
    const formik = useFormik({
        initialValues: address,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);

            dispatch(
                setPropertyRegistrationForm({
                    address: {
                        ...address,
                        ...values,
                    },
                }),
            );

            wizardInstance.nextStep();
        },
    });

    const {
        handleChange,
        handleBlur: handleBlurOrig,
        handleSubmit,
        errors,
        touched,
        values,
        isValid,
        isSubmitting,
    } = formik;

    const handleBlur = (...params) => {
        dispatch(
            setPropertyRegistrationForm({
                address: {
                    ...address,
                    ...values,
                },
            }),
        );
        handleBlurOrig(...params);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Input type="hidden" value={1} name="steps" />
            </Col>
            <Col>
                <FormGroup>
                    <Label for="postalCode">Postal Code</Label>
                    <Input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postalCode}
                        invalid={touched.postalCode && errors.postalCode}
                        placeholder=""
                    />
                    <FormFeedback>{errors.postalCode}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="postalCode">Street Number</Label>
                    <Input
                        type="text"
                        name="streetNumber"
                        id="streetNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.streetNumber}
                        invalid={touched.streetNumber && errors.streetNumber}
                        placeholder=""
                    />
                    <FormFeedback>{errors.streetNumber}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="route">
                        Street /Route / Lot No / Plot No / Local Identifier
                    </Label>
                    <Input
                        type="text"
                        name="route"
                        id="route"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.route}
                        invalid={touched.route && errors.route}
                        placeholder=""
                    />
                    <FormFeedback>{errors.route}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="route"> City / Locality</Label>
                    <Input
                        type="text"
                        name="locality"
                        id="locality"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.locality}
                        invalid={touched.locality && errors.locality}
                        placeholder=""
                    />
                    <FormFeedback>{errors.locality}</FormFeedback>
                </FormGroup>
            </Col>
            {rural && (
                <>
                    <Col>
                        <FormGroup>
                            <Label for="lotNo">Lot No</Label>
                            <Input
                                type="text"
                                name="lotNo"
                                id="lotNo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lotNo}
                                invalid={touched.lotNo && errors.lotNo}
                                placeholder=""
                            />
                            <FormFeedback>{errors.lotNo}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="plotNo">Plot No</Label>
                            <Input
                                type="text"
                                name="plotNo"
                                id="plotNo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.plotNo}
                                invalid={touched.plotNo && errors.plotNo}
                                placeholder=""
                            />
                            <FormFeedback>{errors.plotNo}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="region">Region</Label>
                            <Input
                                type="text"
                                name="region"
                                id="region"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.region}
                                invalid={touched.region && errors.region}
                                placeholder=""
                            />
                            <FormFeedback>{errors.region}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="province">Province</Label>
                            <Input
                                type="text"
                                name="province"
                                id="province"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.province}
                                invalid={touched.province && errors.province}
                                placeholder=""
                            />
                            <FormFeedback>{errors.province}</FormFeedback>
                        </FormGroup>
                    </Col>
                </>
            )}
            <Col>
                <FormGroup>
                    <Label for="route">Province / State</Label>
                    <Input
                        type="text"
                        name="city"
                        id="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        invalid={touched.city && errors.city}
                        placeholder=""
                    />
                    <FormFeedback>{errors.city}</FormFeedback>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="route">Country</Label>
                    <Input
                        type="text"
                        name="country"
                        id="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        invalid={touched.country && errors.country}
                        placeholder=""
                    />
                    <FormFeedback>{errors.country}</FormFeedback>
                </FormGroup>
            </Col>

            <Col>
                <Button block disabled={!isValid || isSubmitting}>
                    {isSubmitting ? <Spinner size={'sm'} /> : 'Next'}
                </Button>
            </Col>
            <Col>
                <Button
                    className="mt-1 mb-5"
                    color={'danger'}
                    block
                    onClick={() => {
                        utilsData.connectToMerchantId = 0;
                        dispatch(resetRegistrationForm())
                    }}>
                    Cancel
                </Button>
            </Col>
            <Col>
                <Label for="route"> ---------------- OR ----------------- </Label>
            </Col>
            <Col>
                <Button
                    className="mt-1 mb-5"

                    block
                    onClick={() => {
                        address.noDelivery = 1;
                        address.property = utilsData.selectedProperty;
                        wizardInstance.goToStep(3);
                        // utilsData.connectToMerchantId = 0;
                        // dispatch(resetRegistrationForm())
                    }}>
                    No Delivery
                </Button>
            </Col>
        </Form>
    );
};

export default AddressDetailsStep;
