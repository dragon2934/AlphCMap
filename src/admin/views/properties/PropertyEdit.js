import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInvalidFeedback,
    CLabel,
    CRow,
    CSpinner,
    CTabs,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink,
} from '@coreui/react';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';

import {
    fetchProperty,
    saveProperty,
} from '../../../redux/actionCreators/adminActionCreators';
import UploadService from "../../file-upload/services/FileUploadService";

import {useSelector} from 'react-redux';
import Header from '../../../site/pages/newHome/Header';

const PropertyEdit = ({match}) => {
 

    const [selectedFormFiles, setSelectedFormFiles] = useState(undefined);
    const [selectedPlanFiles, setSelectedPlanFiles] = useState(undefined);
    const [currentProperty,setCurrentProperty] = useState(undefined);
    
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.jwt);
   

    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            address: '',
            area: '',
            serial_no: '' ,
            application_form_url: '',
            plans_url: ''  ,
            acreage:'',
        },
        // validationSchema: propertySchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true);
            let application_form_url = '';
            let plans_url = '';
            if (match.params.id){
                //edit mode
                application_form_url = currentProperty.application_form_url;
                plans_url = currentProperty.plans_url;
            }
            if(selectedFormFiles === undefined){
                // toastr.error('请上传地址信息文件');
                // setSubmitting(false);
                // return;
            }else{
                //do submit
                const resp= await UploadService.upload(selectedFormFiles[0],token,null);
                application_form_url = resp.data[0].url;
            }
            if(selectedPlanFiles === undefined){

            }else{
                const resp = await UploadService.upload(selectedPlanFiles[0],token,null);
                plans_url = resp.data[0].url;
            }

            if (values.settlementType === 'lowRise') {
                values.unitNo = '';
            }

            const property = {
                ...values,
                application_form_url,
                plans_url
            };
            console.log('save property=' + JSON.stringify(property));

            dispatch(saveProperty(property)).then(() => {
                if (match.params.id)
                    history.push(`/admin/properties/${match.params.id}`);
                else history.push('/admin/properties');
            });
        },
    });

    const {
        handleChange,
        handleSubmit,
        handleBlur,
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




    useEffect(() => {
        if (match.params.id)
            dispatch(fetchProperty(match.params.id)).then(
                ({value: property}) => {
                    setCurrentProperty(property);

                    setValues({
                        ...property,
                        ...property.location,
                        // users: property.users.map((u) => u.id),
                    });
                },
            );
    }, [dispatch,  match.params.id, setValues]);

 





    const selectApplicationFormFiles = (event) => {
        setSelectedFormFiles(event.target.files);
        console.log('file selected..' + JSON.stringify(event.target.files));
        // setProgressInfos({ val: [] });
    };
    const selectPlanFiles= (event) => {
        setSelectedPlanFiles(event.target.files);
        console.log('file selected..' + JSON.stringify(event.target.files));
        // setProgressInfos({ val: [] });
    };
    return (
        <main>
        <Header />
        <div className="content">

     <CTabs activeTab="home"
     onActiveTabChange={(idx) => setActiveTab(idx)}>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="home">
          {match.params.id
                                ? `Record id: ${match.params.id}`
                                : 'New Property'}
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="home"  >
        <CRow active={activeTab === 0}>
            <CCol md={10}>
                <CForm onSubmit={handleSubmit}>
                    <CCard>
                        {/* <CCardHeader>
                            {match.params.id
                                ? `Record id: ${match.params.id}`
                                : 'New Property'}
                        </CCardHeader> */}
                        <CCardBody>

                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="area">
                                        地区
                                    </CLabel>
                                    <CInput
                                        id="area"
                                        name="area"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.area}
                                        invalid={
                                            touched.area &&
                                            errors.area
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.area}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="serial_no">
                                        编号
                                    </CLabel>
                                    <CInput
                                        id="serial_no"
                                        name="serial_no"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.serial_no}
                                        invalid={
                                            touched.serial_no &&
                                            errors.serial_no
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.serial_no}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="address">
                                        地址
                                    </CLabel>
                                    <CInput
                                        id="address"
                                        name="address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        invalid={touched.address && errors.address}
                                    />
                                    <CInvalidFeedback>
                                        {errors.address}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="locality">地址信息 &nbsp;&nbsp;</CLabel>
                                    <CLabel htmlFor='fileName'>{values.application_form_url} &nbsp;&nbsp;</CLabel>
                                    <br/>
                                    <input type="file" onChange={selectApplicationFormFiles} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="locality">地址图纸&nbsp;&nbsp;</CLabel>
                                    <CLabel htmlFor='fileName'>{values.plans_url} &nbsp;&nbsp;</CLabel>
                                    <br/>
                                    <input type="file" onChange={selectPlanFiles} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="acreage">
                                        面积
                                    </CLabel>
                                    <CInput
                                        id="acreage"
                                        name="acreage"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.acreage}
                                        invalid={touched.acreage && errors.acreage}
                                    />
                                    <CInvalidFeedback>
                                        {errors.acreage}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton
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
        </CTabPane>
       
       

      </CTabContent>
    </CTabs>
</div>
</main>
        
    );
};

export default PropertyEdit;
