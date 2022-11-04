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
import {useFormik} from 'formik';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import * as Yup from 'yup';
// import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchRoles,
    fetchUser,
    saveUser,
    saveTenant
} from '../../../redux/actionCreators/adminActionCreators';
import MobileInput from '../../../common/components/MobileInput';
import Header from '../../../site/pages/newHome/Header';

const validationSchema = Yup.object().shape({
    mobileNumber: Yup.number().required('Mobile number is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    password: Yup.string()
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!'),
    role: Yup.string().required('Role is required'),
});
 
const UserEdit = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const roles = useSelector((state) => state.admin.roles);
    const loginedUser = useSelector((state) => state.auth.user);
    

    // console.log('loginedUser=' + JSON.stringify(loginedUser.role));
    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            mobileNumber: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',

            username: '',
            role: '',
            // property: undefined,
            emailVerified: true,
            mobileVerified: true,
            createAt:'',
            blocked: false,
            confirmed: true,
            location: {},
        },
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            if(loginedUser.role.name === process.env.REACT_APP_ROLE_PM_NAME){
                //PM add a tenant
                const user = {
                    ...values,
                    tenant: loginedUser.tenant,
                    // propertyId: property!=null && property!=undefined ? property.id:landlordId,
                    // unitNo: unitNo
                };

                dispatch(saveTenant(user))
                    .then(() => {
                        if (match.params.id)
                            history.push(`/admin/users/${match.params.id}`);
                        else history.push('/admin/users');
                    })
                    .catch(() => setSubmitting(false));
            }else{
                const user = {
                    ...values,
                    tenant: loginedUser.tenant,
                };

                dispatch(saveUser(user))
                    .then(() => {
                        if (match.params.id)
                            history.push(`/admin/users/${match.params.id}`);
                        else history.push('/admin/users');
                    })
                    .catch(() => setSubmitting(false));
            }
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
        if (match.params.id){
            dispatch(fetchUser(match.params.id)).then(({value: user}) => {
                delete user.user_alert;

                setValues({
                    ...user,
                    role: user.role.id,
                    // property: user.property.id,
                });

                // setLandlordId(user.property.landlordId); //房东的ID
                console.log('property =' + JSON.stringify(user.property));
                
            });
        }
      
    }, [dispatch,loginedUser,  match.params.id, setValues]);

    

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    // const [unitNo,setUnitNo] = useState('');
    return (
        <main>
        <Header />
        <div className="content">
        <CRow>
            <CCol md={12}>
                <CForm onSubmit={handleSubmit}>
                    <CCard>
                        <CCardHeader>User id: {match.params.id}</CCardHeader>
                        <CCardBody>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="firstName">
                                        First Name
                                    </CLabel>
                                    <CInput
                                        id="firstName"
                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        invalid={
                                            touched.firstName &&
                                            errors.firstName
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.firstName}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="lastName">
                                        Last Name
                                    </CLabel>
                                    <CInput
                                        id="lastName"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        invalid={
                                            touched.lastName && errors.lastName
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.lastName}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="username">
                                        User Name
                                    </CLabel>
                                    <CInput
                                        id="username"
                                        name="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        invalid={
                                            touched.username && errors.username
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.username}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="mobileNumber">
                                        Mobile Number
                                    </CLabel>
                                    <MobileInput
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        placeholder="Mobile Number"
                                        name={'mobileNumber'}
                                        value={values.mobileNumber}
                                        invalid={
                                            touched.mobileNumber &&
                                            errors.mobileNumber
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.mobileNumber}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        invalid={touched.email && errors.email}
                                    />
                                    <CInvalidFeedback>
                                        {errors.email}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="role">Role</CLabel>
                                    <CSelect
                                        custom
                                        id="role"
                                        name="role"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.role}
                                        invalid={touched.role && errors.role}>
                                        <option value="">Please select</option>
                                        {roles.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </CSelect>
                                    <CInvalidFeedback>
                                        {errors.role}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="password">Password</CLabel>
                                    <CInput
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        invalid={
                                            touched.password && errors.password
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.password}
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

export default UserEdit;
