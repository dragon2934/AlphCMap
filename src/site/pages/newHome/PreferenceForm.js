import { MapMarkerUrls } from '../../../constants';
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { changePropertyColor, showPreferenceForm } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import { fetchUserPreference, saveUserPreference } from '../../../redux/actionCreators/adminActionCreators';
const PreferenceForm = ({ callback }) => {

    const utilsData = useSelector((state) => state.utilsData);

    const dispatch = useDispatch();
    const history = useHistory();

    const [userPreference, setUserPreference] = useState([]);
    const formik = useFormik({
        initialValues: {
            coupons: false,
            flyer: false,
            promoting_event: false
        },
        isInitialValid: false,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log('...submit..', values);
            const preference1 = userPreference.find(item => item.attributes.preference === 'coupons');
            const couponsData = preference1 ?
                {
                    id: preference1.id,
                    data: {
                        users_id: user.id,
                        preference: 'coupons',
                        selected: values.coupons
                    }
                } :
                {
                    data: {
                        users_id: user.id,
                        preference: 'coupons',
                        selected: values.coupons
                    }
                }
            const couponResult = await dispatch(saveUserPreference(couponsData));

            const preference2 = userPreference.find(item => item.attributes.preference === 'flyer')

            const flyersData = preference2 ? {
                id: preference2.id,
                data: {
                    users_id: user.id,
                    preference: 'flyer',
                    selected: values.flyer
                }
            } : {
                data: {
                    users_id: user.id,
                    preference: 'flyer',
                    selected: values.flyer
                }
            }
            const flyerResult = await dispatch(saveUserPreference(flyersData));

            const preference3 = userPreference.find(item => item.attributes.preference === 'promoting_event')

            const promotingEventData = preference3 ? {
                id: preference3.id,
                data: {
                    users_id: user.id,
                    preference: 'promoting_event',
                    selected: values.promoting_event
                }
            } : {
                data: {
                    users_id: user.id,
                    preference: 'promoting_event',
                    selected: values.promoting_event
                }
            }
            const promotingEventResult = await dispatch(saveUserPreference(promotingEventData));


            setSubmitting(false);
            utilsData.showPreference = false;
            dispatch(showPreferenceForm());
        },
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

    const user = useSelector((state) => state.auth.me);
    // console.log('...user..' + JSON.stringify(user));
    useEffect(() => {
        // setLoading(true);
        dispatch(fetchUserPreference(user.id)).then(resp => {
            console.log('...user preference..', resp);
            const data = resp.value.data;
            data.map(item => {
                if (item.attributes.preference === 'coupons') {
                    setFieldValue('coupons', item.attributes.selected)
                }
                if (item.attributes.preference === 'flyer') {
                    setFieldValue('flyer', item.attributes.selected)
                }
                if (item.attributes.preference === 'promoting_event') {
                    setFieldValue('promoting_event', item.attributes.selected)
                }
            })

            setUserPreference(resp.value.data);

        });
    }, [dispatch,]);


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
                <Row style={{ width: "100%", paddingLeft: "10px" }}>

                    <Col style={{ textAlign: "left" }}>
                        <FormGroup tag="fieldset">
                            I agree to receive the following newsletter. You can withdraw your consent at any time
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="coupons"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'coupons',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.coupons}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.coupons &&
                                            errors.coupons
                                        }
                                    />
                                    Coupons
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="promoting_event"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'promoting_event',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.promoting_event}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.promoting_event &&
                                            errors.promoting_event
                                        }
                                    />
                                    Promoting Event
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="flyer"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'flyer',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.flyer}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.flyer &&
                                            errors.flyer
                                        }
                                    />
                                    Flyer
                                </Label>
                            </FormGroup>


                            {/* <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                value={"secondary"}
                            />
                            <img src={MapMarkerUrls.property.secondary} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>    */}
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
                                utilsData.showPreference = false;
                                dispatch(showPreferenceForm());
                            }}>
                            Cancel
                        </Button>
                    </Col>


                </Row>
            </Form>
        </Col>
    );
};
export default PreferenceForm;