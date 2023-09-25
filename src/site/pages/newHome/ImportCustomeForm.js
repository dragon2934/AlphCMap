import { MapMarkerUrls } from '../../../constants';
import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
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
import { Link } from 'react-router-dom';
import { cancelChangePropertyColor } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import FilesUpload from '../../../admin/file-upload/components/FilesUpload';
import { importCustomer } from '../../../redux/actionCreators/adminActionCreators';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ImportCustomeForm = ({ callback }) => {

    const utilsData = useSelector((state) => state.utilsData);
    console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    const history = useHistory();
    const [color, setColor] = useState('default');
    const user = useSelector((state) => state.auth.me);

    const uploadedFiles = useSelector((state) => state.admin.uploadedFiles);
    // console.log('..uploadedFiles...from flyer edit..', uploadedFiles);
    // const property = utilsData.selectedProperty;
    // const shareUrl = "https://klosertoyou.com/business-portal/" + property.id;
    const formik = useFormik({
        initialValues: {
            uploadedFiles: []
        },
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log('..uploadedFiles..', values);
            const data = {
                fileName: uploadedFiles[0].url
            }
            console.log('..data..', data);
            dispatch(importCustomer(data))
                .then(() => {
                    setSubmitting(false);
                    console.log('...flyer upload DONE..');
                    utilsData.showImportCustomer = false;
                    dispatch(cancelChangePropertyColor());
                    history.push('/');

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
    return (
        <Col md={6} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row style={{ width: "80%", paddingLeft: "70px" }}>

                <Col style={{ textAlign: "left" }}>
                    <CForm onSubmit={handleSubmit}>


                        <Row>

                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="description">
                                        Note: Please verify your Excel file is the same as
                                        <a href='https://rest.klosertoyou.com/uploads/CUSTOMERLIST_7a2348c38f.xlsx'>this template</a>
                                    </CLabel>

                                    <CInvalidFeedback>
                                        {errors.description}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12">
                                <hr />
                                Upload Excel File:
                                <FilesUpload extension={".xlsx"} />
                            </CCol>

                        </Row>
                        <Row>
                            <CCol xs="6">
                                <CButton
                                    disabled={!isValid || isSubmitting}
                                    type="submit"

                                    color="primary">
                                    {isSubmitting ? (
                                        <CSpinner size="sm" />
                                    ) : (
                                        'Submit'
                                    )}
                                </CButton>{' '}
                            </CCol>
                            <CCol xs="6">
                                <CButton
                                    className="mt-1 mb-5"
                                    color={'danger'}
                                    block
                                    onClick={() => {

                                        utilsData.showImportCustomer = false;
                                        dispatch(cancelChangePropertyColor());
                                    }}>
                                    Cancel
                                </CButton>
                            </CCol>
                        </Row>

                    </CForm>
                </Col>
            </Row>

        </Col>
    );
};
export default ImportCustomeForm;