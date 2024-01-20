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
import { sendPromotionContents, uploadFiles } from '../../../redux/actionCreators/adminActionCreators';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from "antd/lib/input/TextArea";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw } from 'draft-js';
import http from "../../../utils/http-common";


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
    const token = useSelector((state) => state.auth.jwt);
    const apiUrl = process.env.REACT_APP_SERVICE_URL;
    const uploadUrl = apiUrl.replace('/api', '');

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
            let bindingPhones = [];
            let userPropertiesIds = [];
            properties.map((p) => {
                console.log('....flyer form, property..' + JSON.stringify(p));
                if (p.properties.bindingEmail) {
                    bindingEmails.push(p.properties.bindingEmail);
                    bindingPhones.push(p.properties.bindingPhone);
                    userPropertiesIds.push(p.properties.userPropertiesId);
                }
            });
            console.log('.. user..', user);
            bindingEmails.push(user.email);
            bindingPhones.push(user.mobileNumber);
            userPropertiesIds.push(0);
            const postData = {
                emails: bindingEmails.join(','),
                phones: bindingPhones.join(','),
                properties: userPropertiesIds.join(','),
                promotionTitle: values.promotionTitle,
                promotionContent: values.promotionContent
            }
            console.log('..post data..', postData);
            // dispatch(sendPromotionContents(postData));
            const fncCallback = utilsData.fncCallback;
            if (fncCallback !== null) {
                console.log('..should trigger call back');
                fncCallback();
            }
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
        setValues
    } = formik;

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [current, setCurrent] = useState(0);
    const limitWords = (e) => {
        const currentLength = e.target.value.length;
        setCurrent(currentLength);
    }
    const onEditorStateChange = (state) => {
        setEditorState(state);
        const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
        console.log('..htmlContent..' + htmlContent);
        const title = values.promotionTitle;
        setValues({
            promotionTitle: title,
            promotionContent: htmlContent
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
        // dispatch( uploadFiles(file)).then(imgData => {
        //     console.log('..imgData..' + JSON.stringify(imgData));

        // });
        // return Promise.resolve({ data: { 
        //   link: `${uploadUrl}${imgData[0].formats.small.url}`
        // }});

        // console.log('..uploadCallback..' + JSON.stringify(file));
        // // long story short, every time we upload an image, we
        // // need to save it to the state so we can get it's data
        // // later when we decide what to do with it.

        // // Make sure you have a uploadImages: [] as your default state
        // let images = uploadedImages;

        // const imageObject = {
        //     file: file,
        //     localSrc: URL.createObjectURL(file),
        // }

        // images.push(imageObject);

        // setUploadedImages(images);

        // // We need to return a promise with the image src
        // // the img src we will use here will be what's needed
        // // to preview it in the browser. This will be different than what
        // // we will see in the index.md file we generate.
        // return new Promise(
        //     (resolve, reject) => {
        //         resolve({ data: { link: imageObject.localSrc } });
        //     }
        // );
    }
    return (
        <Col md={6} sm={12} xs={12} className="overlay-form-container">
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
                        <FormGroup >
                            <Label for="lblPropertyName">Content:</Label>
                            <TextArea
                                disabled
                                style={{ width: "1px", height: "1px", visibility: "hidden" }}
                                type="text"
                                name="promotionContent"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyUp={(e) => limitWords(e)}
                                value={values.promotionContent}
                                invalid={touched.promotionContent && errors.promotionContent}
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
                                const fncCallback = utilsData.fncCallback;
                                dispatch(cancelChangePropertyColor());
                                if (fncCallback !== null) {
                                    console.log('..should trigger call back');
                                    fncCallback();
                                }
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