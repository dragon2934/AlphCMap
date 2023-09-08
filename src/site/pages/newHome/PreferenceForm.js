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
            restaurant: false,
            groceries: false,
            cannibus: false
        },
        isInitialValid: false,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log('...submit..', values);
            const preference1 = userPreference.find(item => item.attributes.preference === 'restaurant');
            const restaurantData = preference1 ?
                {
                    id: preference1.id,
                    data: {
                        users_id: user.id,
                        preference: 'restaurant',
                        selected: values.restaurant
                    }
                } :
                {
                    data: {
                        users_id: user.id,
                        preference: 'restaurant',
                        selected: values.restaurant
                    }
                }
            const couponResult = await dispatch(saveUserPreference(restaurantData));

            const preference2 = userPreference.find(item => item.attributes.preference === 'groceries')

            const groceriessData = preference2 ? {
                id: preference2.id,
                data: {
                    users_id: user.id,
                    preference: 'groceries',
                    selected: values.groceries
                }
            } : {
                data: {
                    users_id: user.id,
                    preference: 'groceries',
                    selected: values.groceries
                }
            }
            const groceriesResult = await dispatch(saveUserPreference(groceriessData));

            const preference3 = userPreference.find(item => item.attributes.preference === 'cannibus')

            const promotingEventData = preference3 ? {
                id: preference3.id,
                data: {
                    users_id: user.id,
                    preference: 'cannibus',
                    selected: values.cannibus
                }
            } : {
                data: {
                    users_id: user.id,
                    preference: 'cannibus',
                    selected: values.cannibus
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
                if (item.attributes.preference === 'restaurant') {
                    setFieldValue('restaurant', item.attributes.selected)
                }
                if (item.attributes.preference === 'groceries') {
                    setFieldValue('groceries', item.attributes.selected)
                }
                if (item.attributes.preference === 'cannibus') {
                    setFieldValue('cannibus', item.attributes.selected)
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
                            I agree to receive coupon, flyer, and promoting events from the following companies. You can withdraw your consent at any time
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="restaurant"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'restaurant',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.restaurant}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.restaurant &&
                                            errors.restaurant
                                        }
                                    />
                                    Restaurant
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="cannibus"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'cannibus',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.cannibus}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.cannibus &&
                                            errors.cannibus
                                        }
                                    />
                                    Cannibus
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="groceries"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'groceries',
                                                e.currentTarget.checked,
                                            );
                                        }}
                                        checked={values.groceries}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.groceries &&
                                            errors.groceries
                                        }
                                    />
                                    Groceries
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