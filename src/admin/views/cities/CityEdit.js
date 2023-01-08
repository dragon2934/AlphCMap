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
    fetchCity,
    saveCity,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';

const validationSchema = Yup.object().shape({
    shortName: Yup.string().required('short name is required'),
    fullName: Yup.string().required('full name is required'),
});

const CityEdit = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginedUser = useSelector((state) => state.auth.me);


    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            shortName: '',
            fullName: '',
            memo: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            const city = {
                ...values,
                short_name: values.shortName,
                full_name: values.fullName,
                memo: values.memo
            };

            dispatch(saveCity(city))
                .then(() => {
                    if (match.params.id)
                        history.push(`/admin/cities/${match.params.id}`);
                    else history.push('/admin/cities');
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
            dispatch(fetchCity(match.params.id)).then(({ value: city }) => {

                setValues({
                    ...city,
                    shortName: city.short_name,
                    fullName: city.full_name,
                    memo: city.memo
                });

            });
        }

    }, [dispatch, loginedUser, match.params.id, setValues]);


    return (
        <main>
            <Header />
            <div className="content">
                <CRow>
                    <CCol md={12}>
                        <CForm onSubmit={handleSubmit}>
                            <CCard>
                                <CCardHeader>City id: {match.params.id}</CCardHeader>
                                <CCardBody>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="shortName">
                                                Short Name (*例如: SC, NY,...)
                                            </CLabel>
                                            <CInput
                                                id="shortName"
                                                name="shortName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.shortName}
                                                invalid={
                                                    touched.shortName &&
                                                    errors.shortName
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.shortName}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="fullName">
                                                Full Name
                                            </CLabel>
                                            <CInput
                                                id="fullName"
                                                name="fullName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.fullName}
                                                invalid={
                                                    touched.fullName && errors.fullName
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.fullName}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>


                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="memo">Memo</CLabel>
                                            <CInput
                                                id="memo"
                                                name="memo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.memo}
                                                invalid={touched.memo && errors.memo}
                                            />
                                            <CInvalidFeedback>
                                                {errors.memo}
                                            </CInvalidFeedback>
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
        </main>
    );
};

export default CityEdit;
