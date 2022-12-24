import { MapMarkerUrls } from '../../../constants';
import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Row,
    Collapse,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { cancelChangePropertyColor } from '../../../redux/actionCreators/appActionCreators';
import { propertyBinding } from '../../../redux/actionCreators/adminActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const bindingSchema = Yup.object().shape({

    bindingName: Yup.string().required('This field is required'),
    bindingEmail: Yup.string().required('This field is required'),
    //  bindingPhone: Yup.string().required('This field is required'),
});
const BindingForm = ({ callback }) => {

    const utilsData = useSelector((state) => state.utilsData);
    console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    const history = useHistory();
    const [color, setColor] = useState('default');
    const property = utilsData.selectedProperty;

    const formik = useFormik({
        initialValues: {
            bindingName: property !== null && property !== undefined ? property.bindingName : '',
            bindingEmail: property !== null && property !== undefined ? property.bindingEmail : '',
            bindingPhone: property !== null && property !== undefined ? property.bindingPhone : '',
            bindingOthers: property !== null && property !== undefined ? property.bindingOthers : '',
        },
        isInitialValid: false,
        validationSchema: bindingSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            utilsData.bindingProperty = false;
            const email = utilsData.emailForChangeColor
            const data = {
                email: email,
                ...values
            }
            dispatch(propertyBinding(data)).then(resp => {

            })
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
        setFieldValue,
        values,
    } = formik;

    return (
        <Col md={3} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>
            <Form onSubmit={handleSubmit}>
                <Row >

                    <Col style={{ textAlign: "left" }}>
                        <FormGroup tag="fieldset">

                            <FormGroup>
                                <Label for="lblPropertyName">Name &nbsp;&nbsp;<span className="item_required">*</span></Label>
                                <Input
                                    type="text"
                                    name="bindingName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bindingName}
                                    invalid={touched.bindingName && errors.bindingName}
                                />
                                <FormFeedback>{errors.bindingName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="lblPropertyName">Email &nbsp;&nbsp;<span className="item_required">*</span></Label>
                                <Input
                                    type="text"
                                    name="bindingEmail"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bindingEmail}
                                    invalid={touched.bindingEmail && errors.bindingEmail}
                                />
                                <FormFeedback>{errors.bindingEmail}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="lblPropertyName">Phone</Label>
                                <Input
                                    type="text"
                                    name="bindingPhone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bindingPhone}
                                    invalid={touched.bindingPhone && errors.bindingPhone}
                                />
                                <FormFeedback>{errors.bindingPhone}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lblPropertyName">Others</Label>
                                <Input
                                    type="text"
                                    name="bindingOthers"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bindingOthers}
                                    invalid={touched.bindingOthers && errors.bindingOthers}
                                />
                                <FormFeedback>{errors.bindingOthers}</FormFeedback>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button block disabled={!isValid || isSubmitting}>
                            {isSubmitting ? <Spinner size={'sm'} /> : 'Confirm'}
                        </Button>

                        {/* <Button
                    className="mt-1 mb-5"
                    color={'success'}
                    block
                    onClick={() => {
                        const email = utilsData.emailForChangeColor
                        const data = {
                            email: email,
                            color: color
                        };
                        utilsData.changeColor = false;
                        dispatch(changePropertyColor(data)).then(resp=>{
                            console.log('...change color..' + JSON.stringify(resp));
                            callback(true, color, email);
                            // history.push("/");
                        })
                        .catch(error=>{
                            callback(false, color, email);
                            console.log('...change color error..' + JSON.stringify(error));
                        })
                    }}>
                    Confirm
                </Button> */}
                    </Col>
                    <Col>
                        <Button
                            className="mt-1 mb-5"
                            color={'danger'}
                            block
                            onClick={() => {
                                // const data = {
                                //     email: utilsData.emailForChangeColor,
                                //     color: color
                                // };
                                utilsData.bindingProperty = false;
                                dispatch(cancelChangePropertyColor());
                            }}>
                            Cancel
                        </Button>
                    </Col>


                </Row>
            </Form>
        </Col>
    );
};
export default BindingForm;