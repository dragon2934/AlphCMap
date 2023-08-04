import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInvalidFeedback,
    CLabel,
    CRow,
    CSelect,
    CSpinner,
} from '@coreui/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import {
    fetchCoupon,
    saveCoupon,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
    couponCode: Yup.string().required('Coupon Code is required'),
    couponDescription: Yup.string().required('full name is required'),
});

const CouponEdit = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginedUser = useSelector((state) => state.auth.me);
    const toDay = new Date();

    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            couponCode: '',
            couponDescription: '',
            amountDiscount: '',
            percentageDiscount: '',
            startDate: toDay,
            expireDate: toDay,
            ownerId: loginedUser.id
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            const coupon = {
                id: match.params.id,
                data: {
                    couponCode: values.couponCode,
                    couponDescription: values.couponDescription,
                    amountDiscount: values.amountDiscount.includes('%') ? 0 : parseFloat(values.amountDiscount),
                    percentageDiscount: values.amountDiscount.includes('%') ? parseFloat(values.amountDiscount.replace('%', '') / 100) : 0,
                    startDate: startDate,
                    expireDate: endDate,
                    ownerId: loginedUser.id
                }
            };

            dispatch(saveCoupon(coupon))
                .then(() => {
                    if (match.params.id)
                        history.push(`/admin/coupons/${match.params.id}`);
                    else history.push('/admin/coupons');
                })
                .catch(() => setSubmitting(false));

        },
    });

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        isValid,
        isSubmitting,
        resetForm,
        setValues,
        setFieldValue,
        setFieldTouched,
    } = formik;
    // const [properties,setProperties] = useState(null);
    // const [property,setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [landlordId,setLandlordId] = useState('');
    useEffect(() => {
        if (match.params.id) {
            dispatch(fetchCoupon(match.params.id)).then(({ value: record }) => {
                const data = {
                    id: record.data.id,

                    couponCode: record.data.attributes.couponCode,
                    couponDescription: record.data.attributes.couponDescription,
                    amountDiscount: parseInt(record.data.attributes.percentageDiscount * 100) > 0 ? parseInt(record.data.attributes.percentageDiscount * 100) + '%' : record.data.attributes.amountDiscount,
                    // percentageDiscount: parseInt(record.data.attributes.percentageDiscount * 100) > 0 ? parseInt(record.data.attributes.percentageDiscount * 100) + '%' : '',
                    startDate: record.data.attributes.startDate,
                    expireDate: record.data.attributes.expireDate,
                }
                setValues({
                    ...data,
                });

            });
        }

    }, [dispatch, loginedUser, match.params.id, setValues]);

    const [startDate, setStartDate] = useState(new Date(moment().add(1, 'days').toISOString()));
    const [endDate, setEndDate] = useState(new Date(moment().add(30, 'days').toISOString()));

    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">

                <TheHeader />
                <div className="c-body">
                    <main className="c-main">
                        <CContainer fluid className={'h-100'}>
                            <div className="content">
                                <CRow>
                                    <CCol md={12}>
                                        <CForm onSubmit={handleSubmit}>
                                            <CCard>
                                                <CCardHeader>Coupon id: {match.params.id}</CCardHeader>
                                                <CCardBody>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="couponCode">
                                                                Coupon Code
                                                            </CLabel>
                                                            <CInput
                                                                id="couponCode"
                                                                name="couponCode"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.couponCode}
                                                                invalid={
                                                                    touched.couponCode &&
                                                                    errors.couponCode
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.couponCode}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="couponDescription">
                                                                Coupon Description
                                                            </CLabel>
                                                            <CInput
                                                                id="couponDescription"
                                                                name="couponDescription"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.couponDescription}
                                                                invalid={
                                                                    touched.couponDescription && errors.couponDescription
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.couponDescription}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>


                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="amountDiscount">Discount: (For percentage: add %). Ex. 50 or 20% </CLabel>
                                                            <CInput
                                                                id="amountDiscount"
                                                                name="amountDiscount"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.amountDiscount}
                                                                invalid={touched.amountDiscount && errors.amountDiscount}
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.amountDiscount}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="amountDiscount">Start Date</CLabel>
                                                            <br />
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                                selectsStart
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                dateFormat="dd/MM/yyyy"

                                                            />
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="amountDiscount">Expire Date</CLabel>
                                                            <br />
                                                            <DatePicker
                                                                selected={endDate}
                                                                onChange={(date) => setEndDate(date)}
                                                                selectsEnd
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                dateFormat="dd/MM/yyyy"></DatePicker>
                                                        </CFormGroup>
                                                    </CCol>

                                                </CCardBody>
                                                <CCardFooter className="text-right">
                                                    <CButton
                                                        disabled={!isValid || isSubmitting}
                                                        type="submit"
                                                        size="sm"
                                                        color="primary">
                                                        {isSubmitting ? (
                                                            <CSpinner size="sm" />
                                                        ) : (
                                                            'Submit'
                                                        )}
                                                    </CButton>{' '}
                                                    <CButton
                                                        type="reset"
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() => resetForm()}>
                                                        Reset
                                                    </CButton>
                                                </CCardFooter>
                                            </CCard>
                                        </CForm>
                                    </CCol>
                                </CRow>
                            </div>
                        </CContainer>
                    </main>
                </div>
                <TheFooter />
            </div>
        </div>
    );
};

export default CouponEdit;
