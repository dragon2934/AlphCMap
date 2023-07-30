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
    CSpinner,
} from '@coreui/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
// import MapContext from '../../../common/contexts/MapContext/MapContext';
import {

    fetchTemplate,
    saveTemplate
} from '../../../redux/actionCreators/adminActionCreators';

import TextArea from "antd/lib/input/TextArea";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';


import { TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer } from '@coreui/react';
import '../../../styles/admin/style.scss';

const validationSchema = Yup.object().shape({
    from_name: Yup.string().required('From name is required'),
    template_name: Yup.string().required('Template name is required'),
    subject: Yup.string().required('Subject is required'),


});

const TemplateEdit = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const roles = useSelector((state) => state.admin.roles);
    const loginedUser = useSelector((state) => state.auth.me);


    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    // console.log('loginedUser=' + JSON.stringify(loginedUser.role));
    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            from_name: '',
            template_name: '',
            subject: '',
            from_email: '',
            template_body: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            //PM add a tenant
            const user = {
                ...values,
                owner_id: loginedUser.id,
                tenant: loginedUser.id,
                // propertyId: property!=null && property!=undefined ? property.id:landlordId,
                // unitNo: unitNo
            };

            dispatch(saveTemplate(user))
                .then((resp) => {
                    console.log('..save template..', resp);
                    if (match.params.id)
                        history.push(`/admin/templates/${match.params.id}`);
                    else history.push('/admin/templates');
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
            dispatch(fetchTemplate(match.params.id)).then(({ value: record }) => {

                console.log('...fetch template..', record);
                setValues({
                    id: record.data.id,
                    template_name: record.data.attributes.template_name,
                    subject: record.data.attributes.subject,
                    from_email: record.data.attributes.from_email,
                    from_name: record.data.attributes.from_name,
                    template_body: record.data.attributes.template_body,
                });
                setEditorState(
                    EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(record.data.attributes.template_body)
                        )
                    )
                );
            });
        }

    }, [dispatch, loginedUser, match.params.id, setValues]);


    const onEditorStateChange = (state) => {
        setEditorState(state);
        const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
        console.log('..htmlContent..' + htmlContent);
        // const title = values.promotionTitle;
        setValues({
            ...values,
            template_body: htmlContent
        })
    }
    const [uploadedImages, setUploadedImages] = useState([]);
    const uploadCallback = async (fileData) => {
        let formData = new FormData();

        formData.append("files", fileData);

        const imgData = await http.post(apiUrl + "/upload", formData, {
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log('..imgData..' + JSON.stringify(imgData));
        return Promise.resolve({
            data: {
                link: `https://rest.klosertoyou.com${imgData.data[0].url}`
            }
        });
    }
    // const [unitNo,setUnitNo] = useState('');
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
                                                <CCardHeader>Template id: {match.params.id}</CCardHeader>
                                                <CCardBody>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="template_name">
                                                                Template Name
                                                            </CLabel>
                                                            <CInput
                                                                id="template_name"
                                                                name="template_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.template_name}
                                                                invalid={
                                                                    touched.template_name &&
                                                                    errors.template_name
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.template_name}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="subject">
                                                                Subject
                                                            </CLabel>
                                                            <CInput
                                                                id="subject"
                                                                name="subject"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.subject}
                                                                invalid={
                                                                    touched.subject && errors.subject
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.subject}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="from_email">
                                                                From Email
                                                            </CLabel>
                                                            <CInput
                                                                id="from_email"
                                                                name="from_email"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.from_email}
                                                                invalid={
                                                                    touched.from_email && errors.from_email
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.from_email}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="from_name">
                                                                From Name
                                                            </CLabel>
                                                            <CInput
                                                                id="from_name"
                                                                name="from_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.from_name}
                                                                invalid={
                                                                    touched.from_name && errors.from_name
                                                                }
                                                            />
                                                            <CInvalidFeedback>
                                                                {errors.from_name}
                                                            </CInvalidFeedback>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="12">
                                                        <TextArea
                                                            disabled
                                                            style={{ width: "1px", height: "1px", visibility: "hidden" }}
                                                            type="text"
                                                            name="template_body"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}

                                                            value={values.template_body}
                                                            invalid={touched.template_body && errors.template_body}
                                                        />
                                                        <Editor
                                                            editorState={editorState}
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                            onEditorStateChange={onEditorStateChange}
                                                            toolbar={{
                                                                options: ['inline', 'fontSize', 'fontFamily', 'list',
                                                                    'textAlign', 'colorPicker', 'link', 'image'],
                                                                link: {
                                                                    defaultTargetOption: '_blank',
                                                                    popupClassName: "mail-editor-link"
                                                                },
                                                                image: {
                                                                    urlEnabled: true,
                                                                    uploadEnabled: true,
                                                                    uploadCallback: uploadCallback,
                                                                    alignmentEnabled: true,
                                                                    defaultSize: {
                                                                        height: 'auto',
                                                                        width: '600px',
                                                                    },
                                                                    inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel,image/gif,image/jpeg,image/jpg,image/png,image/svg'
                                                                }
                                                            }}
                                                        />
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
                                <CRow>
                                    <br /> <br /> <br /> <br /> <br />
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

export default TemplateEdit;
