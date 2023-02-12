import React, { useState } from "react";
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
} from 'reactstrap';
import {
    CLabel,
    CListGroup,
    CListGroupItem,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { cancelChangePropertyColor } from '../../../redux/actionCreators/appActionCreators';
import { sendPromotionContents } from '../../../redux/actionCreators/adminActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from "antd/lib/input/TextArea";
const bindingSchema = Yup.object().shape({
    promotionTitle: Yup.string().required('This field is required'),
    promotionContent: Yup.string().required('This field is required'),

});
const FlyerForm = ({ callback }) => {

    const utilsData = useSelector((state) => state.utilsData);
    console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    const history = useHistory();
    const [color, setColor] = useState('default');
    const properties = utilsData.selectedProperty;
    const user = useSelector((state) => state.auth.me);

    let domain = localStorage.getItem('current_domain');
    if (domain === undefined || domain === null) {
        domain = 'alphc.com'
    }
    const formik = useFormik({
        initialValues: {
            promotionTitle: '',
            promotionContent: ''
        },
        isInitialValid: false,
        validationSchema: bindingSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            utilsData.drawFinished = false;
            let bindingEmails = [];
            properties.map((p) => {
                console.log('....flyer form, property..' + JSON.stringify(p));
                if (p.properties.bindingEmail) {
                    bindingEmails.push(p.properties.bindingEmail);
                }
            });
            bindingEmails.push(user.email);
            const postData = {
                emails: bindingEmails.join(','),
                promotionTitle: values.promotionTitle,
                promotionContent: values.promotionContent
            }
            dispatch(sendPromotionContents(postData));
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

    const [current, setCurrent] = useState(0);
    const limitWords = (e) => {
        const currentLength = e.target.value.length;
        setCurrent(currentLength)
    }
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
                            <CLabel>Send Communication:</CLabel>
                            <CListGroup accent className="mb-3">
                                {properties.map((p) => (
                                    <CListGroupItem key={p.properties.id}>
                                        {p.properties.email + '@' + domain}
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="lblPropertyName">Title:</Label>
                            <Input
                                type="text"
                                name="promotionTitle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.promotionTitle}
                                invalid={touched.promotionTitle && errors.promotionTitle}
                            />
                            <FormFeedback>{errors.promotionTitle}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup class="wrapper">
                            <Label for="lblPropertyName">Content:</Label>
                            <TextArea
                                maxLength={1000}
                                rows={5}
                                type="text"
                                name="promotionContent"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyUp={(e) => limitWords(e)}
                                value={values.promotionContent}
                                invalid={touched.promotionContent && errors.promotionContent}
                            />
                            <div id="the-count">
                                <span id="current">{current}</span>
                                <span id="maximum">/ 1000</span>
                            </div>
                            <FormFeedback>{errors.promotionContent}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button block disabled={!isValid || isSubmitting}>
                            {isSubmitting ? <Spinner size={'sm'} /> : 'Confirm'}
                        </Button>


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
                                utilsData.drawFinished = false;
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
export default FlyerForm;