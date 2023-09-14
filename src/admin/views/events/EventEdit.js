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
    fetchEvent,
    saveEvent,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Event Code is required'),
    description: Yup.string().required('full name is required'),
});

const EventEdit = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginedUser = useSelector((state) => state.auth.me);
    const toDay = new Date();

    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            title: '',
            description: '',
            startDate: toDay,
            expireDate: toDay,
            ownerId: loginedUser.id
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            const Event = {
                id: match.params.id,
                data: {
                    title: values.title,
                    description: values.description,
                    startDate: startDate,
                    expireDate: endDate,
                    ownerId: loginedUser.id
                }
            };

            dispatch(saveEvent(Event))
                .then(() => {
                    if (match.params.id)
                        history.push(`/admin/events/${match.params.id}`);
                    else history.push('/admin/events');
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
            dispatch(fetchEvent(match.params.id)).then(({ value: record }) => {
                const data = {
                    id: record.data.id,

                    title: record.data.attributes.title,
                    description: record.data.attributes.description,
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
                                                <CCardHeader>Event id: {match.params.id}</CCardHeader>
                                                <CCardBody>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="title">
                                                                Title
                                                            </CLabel>
                                                            <CInput
                                                                id="title"
                                                                name="title"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.title}
                                                                invalid={
                                                                    touched.title &&
                                                                    errors.title
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.title}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="description">
                                                                Description
                                                            </CLabel>
                                                            <CInput
                                                                id="description"
                                                                name="description"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.description}
                                                                invalid={
                                                                    touched.description && errors.description
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.description}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>


                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="amountDiscount">Start Date</CLabel>
                                                            <br />
                                                            <DatePicker
                                                                showTimeSelect
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                                selectsStart
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                dateFormat="Pp"

                                                            />
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="amountDiscount">Expire Date</CLabel>
                                                            <br />
                                                            <DatePicker
                                                                showTimeSelect
                                                                selected={endDate}
                                                                onChange={(date) => setEndDate(date)}
                                                                selectsEnd
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                dateFormat="Pp"></DatePicker>
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

export default EventEdit;
