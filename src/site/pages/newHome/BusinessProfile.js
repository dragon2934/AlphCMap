import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Row,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
    Container,
} from 'reactstrap';
import { saveBusinessProfile, getBusinessProfile } from '../../../redux/actionCreators/adminActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from './Footer';
import Header from './Header';
import { toastr } from 'react-redux-toastr';

const bindingSchema = Yup.object().shape({
    companyName: Yup.string().required('This field is required'),
    phone: Yup.string().required('This field is required'),

});
const BusinessProfile = () => {

    const utilsData = useSelector((state) => state.utilsData);
    // console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    const [color, setColor] = useState('default');

    let domain = localStorage.getItem('current_domain');
    if (domain === undefined || domain === null) {
        domain = 'alphc.com'
    }
    const history = useHistory();

    const queryPage = history.location.search.match(/id=([0-9]+)/, '');
    // console.log('..queryPage..' + queryPage);
    const propertyId = queryPage[1];

    const [companyProfile, setCompanyProfile] = useState({});

    const getWorkingHourValue = (hours, dayOfWeek, index) => {
        const item = hours.filter((hour) => {
            return parseInt(hour.dayOfWeek) === dayOfWeek;

        });
        console.log('..item..' + JSON.stringify(item));
        if (item && item.length > 0) {
            if (index === 1) return item[0].openHour;
            if (index === 2) return item[0].closeHour;
            if (index === 3) return item[0].closed;
        }
        return '';
    };
    const [workingHour, setWorkingHour] = useState([]);

    const formik = useFormik({
        initialValues: {
            companyName: '',
            phone: '',
            website: '',
        },
        isInitialValid: false,
        validationSchema: bindingSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);

            const postData = {
                ...values,
                property_id: propertyId
            }
            dispatch(saveBusinessProfile(postData)).then(resp => {
                console.log('..save business profile..' + JSON.stringify(resp));
                setSubmitting(false);
                toastr.success('Success', 'Business profile saved!');
            });
        }
    });
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isValid,
        isSubmitting,
        values,
        setValues
    } = formik;

    const [current, setCurrent] = useState(0);


    useEffect(() => {
        dispatch(getBusinessProfile({ id: propertyId })).then(resp => {
            // console.log('..load profile..' + JSON.stringify(resp));
            setWorkingHour(resp.value.workingHour);

            const profile = resp.value.companyProfile;
            const hours = resp.value.workingHour;
            setCompanyProfile(profile);
            console.log('..hours..' + JSON.stringify(hours));

            setValues({
                companyName: profile.companyName,
                phone: profile.phone,
                website: profile.website,
                openHour0: getWorkingHourValue(hours, 0, 1),
                closeHour0: getWorkingHourValue(hours, 0, 2),
                close0: getWorkingHourValue(hours, 0, 2) === true ? true : false,

                openHour1: getWorkingHourValue(hours, 1, 1),
                closeHour1: getWorkingHourValue(hours, 1, 2),
                close1: getWorkingHourValue(hours, 1, 3) === true ? true : false,

                openHour2: getWorkingHourValue(hours, 2, 1),
                closeHour2: getWorkingHourValue(hours, 2, 2),
                close2: getWorkingHourValue(hours, 2, 3) === true ? true : false,

                openHour3: getWorkingHourValue(hours, 3, 1),
                closeHour3: getWorkingHourValue(hours, 3, 2),
                close3: getWorkingHourValue(hours, 3, 3) === true ? true : false,

                openHour4: getWorkingHourValue(hours, 4, 1),
                closeHour4: getWorkingHourValue(hours, 4, 2),
                close4: getWorkingHourValue(hours, 4, 3) === true ? true : false,

                openHour5: getWorkingHourValue(hours, 5, 1),
                closeHour5: getWorkingHourValue(hours, 5, 2),
                close5: getWorkingHourValue(hours, 5, 3) === true ? true : false,

                openHour6: getWorkingHourValue(hours, 6, 1),
                closeHour6: getWorkingHourValue(hours, 6, 2),
                close6: getWorkingHourValue(hours, 6, 3) === true ? true : false,
            });


        });

    }, [dispatch]);



    return (
        <main>
            <Header />
            <div className="content">
                <Container>
                    <Col md={12} sm={12} xs={12} style={{ marginTop: "80px" }}>

                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="lblPropertyName">Business Name:</Label>
                                                <Input
                                                    type="text"
                                                    name="companyName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.companyName}
                                                    invalid={touched.companyName && errors.companyName}
                                                />
                                                <FormFeedback>{errors.companyName}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="lblPropertyName">Contact Phone:</Label>
                                                <Input
                                                    type="text"
                                                    name="phone"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.phone}
                                                    invalid={touched.phone && errors.phone}
                                                />
                                                <FormFeedback>{errors.phone}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="lblPropertyName">Website:</Label>
                                                <Input
                                                    type="text"
                                                    name="website"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.website}
                                                    invalid={touched.website && errors.website}
                                                />
                                                <FormFeedback>{errors.website}</FormFeedback>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md={12}>
                                            <Label for="lblPropertyName">Business Hour</Label></Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ marginTop: "40px", textAlign: "right" }}>
                                                <Label for="lblPropertyName">Monday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="lblPropertyName">Open:</Label>
                                                <Input
                                                    type="text"
                                                    name="openHour0"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour0}
                                                    invalid={touched.openHour0 && errors.openHour0}
                                                />
                                                <FormFeedback>{errors.openHour0}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="lblPropertyName">Close:</Label>
                                                <Input
                                                    type="text"
                                                    name="closeHour0"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour0}
                                                    invalid={touched.closeHour0 && errors.closeHour0}
                                                />
                                                <FormFeedback>{errors.closeHour0}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup style={{ marginTop: "40px" }}>
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close0"
                                                        onChange={handleChange}
                                                        value={values.close0}
                                                        checked={values.close0}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close0 && errors.close0}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Tuesday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour1"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour1}
                                                    invalid={touched.openHour1 && errors.openHour1}
                                                />
                                                <FormFeedback>{errors.openHour1}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour1"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour1}
                                                    invalid={touched.closeHour1 && errors.closeHour1}
                                                />
                                                <FormFeedback>{errors.closeHour1}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close1"
                                                        onChange={handleChange}
                                                        value={values.close1}
                                                        checked={values.close1}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close1 && errors.close1}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Wednesday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour2"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour2}
                                                    invalid={touched.openHour2 && errors.openHour2}
                                                />
                                                <FormFeedback>{errors.openHour2}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour2"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour2}
                                                    invalid={touched.closeHour2 && errors.closeHour2}
                                                />
                                                <FormFeedback>{errors.closeHour2}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close2"
                                                        onChange={handleChange}
                                                        value={values.close2}
                                                        checked={values.close2}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close2 && errors.close2}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Thursday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour3"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour3}
                                                    invalid={touched.openHour3 && errors.openHour3}
                                                />
                                                <FormFeedback>{errors.openHour3}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour3"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour3}
                                                    invalid={touched.closeHour3 && errors.closeHour3}
                                                />
                                                <FormFeedback>{errors.closeHour3}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close3"
                                                        onChange={handleChange}
                                                        value={values.close3}
                                                        checked={values.close3}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close3 && errors.close3}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Friday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour4"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour4}
                                                    invalid={touched.openHour4 && errors.openHour4}
                                                />
                                                <FormFeedback>{errors.openHour4}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour4"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour4}
                                                    invalid={touched.closeHour4 && errors.closeHour4}
                                                />
                                                <FormFeedback>{errors.closeHour4}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close4"
                                                        onChange={handleChange}
                                                        value={values.close4}
                                                        checked={values.close4}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close4 && errors.close4}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Saturday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour5"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour5}
                                                    invalid={touched.openHour5 && errors.openHour5}
                                                />
                                                <FormFeedback>{errors.openHour5}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour5"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour5}
                                                    invalid={touched.closeHour5 && errors.closeHour5}
                                                />
                                                <FormFeedback>{errors.closeHour5}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close5"
                                                        onChange={handleChange}
                                                        value={values.close5}
                                                        checked={values.close5}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close5 && errors.close5}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>

                                            <FormGroup style={{ textAlign: "right" }}>
                                                <Label for="lblPropertyName">Sunday:</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="openHour6"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.openHour6}
                                                    invalid={touched.openHour6 && errors.openHour6}
                                                />
                                                <FormFeedback>{errors.openHour6}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                <Input
                                                    type="text"
                                                    name="closeHour6"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.closeHour6}
                                                    invalid={touched.closeHour6 && errors.closeHour6}
                                                />
                                                <FormFeedback>{errors.closeHour6}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>

                                            <FormGroup >
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        name="close6"
                                                        onChange={handleChange}
                                                        value={values.close6}
                                                        checked={values.close6}
                                                        onBlur={handleBlur}
                                                        invalid={touched.close6 && errors.close6}
                                                    />
                                                    We're Close
                                                </Label></FormGroup>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Button block disabled={!isValid || isSubmitting}>
                                        {isSubmitting ? <Spinner size={'sm'} /> : 'Confirm'}
                                    </Button>


                                </Col>
                                <Col>

                                </Col>


                            </Row>


                        </Form>
                    </Col>
                </Container>
            </div>
            <Footer />
        </main>
    );
};
export default BusinessProfile;