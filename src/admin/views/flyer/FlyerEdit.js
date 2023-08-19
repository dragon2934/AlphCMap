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
    fetchFlyer,
    saveFlyers,
} from '../../../redux/actionCreators/adminActionCreators';
import FilesUpload from '../../file-upload/components/FilesUpload';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
    description: Yup.string().required('full name is required'),
});

const FlyerEdit = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginedUser = useSelector((state) => state.auth.me);
    const toDay = new Date();
    const uploadedFiles = useSelector((state) => state.admin.uploadedFiles);
    // console.log('..uploadedFiles...from flyer edit..', uploadedFiles);

    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            description: '',
            uploadedFiles: []
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log('..uploadedFiles..', uploadedFiles);
            const data = {
                ownerId: loginedUser.id,
                description: values.description,
                uploadedFiles: uploadedFiles
            }
            dispatch(saveFlyers(data))
                .then(() => {
                    if (match.params.id)
                        history.push(`/admin/flyers/${match.params.id}`);
                    else history.push('/admin/flyers');
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
            dispatch(fetchFlyer(match.params.id)).then(({ value: record }) => {
                const data = {
                    id: record.data.id,
                    description: record.data.attributes.description,

                }
                setValues({
                    ...data,
                });

            });
        }
        // return uploadedFiles.splice(0, uploadedFiles.length);
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
                                                <CCardHeader>Flyer id: {match.params.id}</CCardHeader>
                                                <CCardBody>

                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="description">
                                                                Flyer Description
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
                                                        <hr />
                                                        Upload Flyers:
                                                        <FilesUpload extension={"image/*"} />
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

export default FlyerEdit;
