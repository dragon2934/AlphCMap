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
    CSwitch,
} from '@coreui/react';
import {useFormik} from 'formik';
import mapboxgl from 'mapbox-gl';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import { useLocation} from 'react-router-dom';
import * as Yup from 'yup';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchRoles,
    fetchUser,
    saveUser,
    fetchProperties,
    saveTenant
} from '../../../redux/actionCreators/adminActionCreators';
import MobileInput from '../../../common/components/MobileInput';
import {Col, FormGroup, Input, Label} from 'reactstrap';

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

    const {map} = useContext(MapContext);

    const [marker] = useState(
        new mapboxgl.Marker({
            draggable: true,
            color: 'red',
        }),
    );
    // const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    // const [page, setPage] = useState(currentPage);
    const roles = useSelector((state) => state.admin.roles);
    // console.log('roles=' + roles.name);
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
            property: undefined,
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
                    propertyId: property!=null && property!=undefined ? property.id:landlordId,
                    unitNo: unitNo
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
    const [properties,setProperties] = useState(null);
    const [property,setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [landlordId,setLandlordId] = useState('');
    useEffect(() => {
        if (match.params.id){
            dispatch(fetchUser(match.params.id)).then(({value: user}) => {
                delete user.user_alert;

                setValues({
                    ...user,
                    role: user.role.id,
                    property: user.property.id,
                });

                setLandlordId(user.property.landlordId); //房东的ID
                console.log('property =' + JSON.stringify(user.property));
                setUnitNo(user.property.unitNo);
                if(loginedUser.role.name === process.env.REACT_APP_ROLE_PM_NAME){
                    //No need show map

                }else{
                    const {latitude, longitude} = user.location;

                    if (longitude && latitude && map) {
                        marker.setLngLat([longitude, latitude]);
                        map.setCenter([longitude, latitude]);
                        marker.addTo(map);
                    }
                }
            });
        }
        // console.log('loginedUser.role.name=' + loginedUser.role.name);
        dispatch(fetchProperties({page:1, pageSize: 1000000,roleName:loginedUser.role.name})).then(properties=>{
            // console.log('properties: ', properties);
            setProperties(  properties.value);
        }).catch(error=>{
        }).finally(() => {
            setLoading(false);
            
        }
        );
    }, [dispatch,loginedUser,map, marker, match.params.id, setValues]);

    useEffect(() => {
        if (map) {
            const onClickMap = (e) => {
                const {lng: longitude, lat: latitude} = e.lngLat;
                marker.setLngLat([longitude, latitude]);
                setFieldValue('location', {
                    latitude,
                    longitude,
                });
                marker.addTo(map);
            };

            map.on('click', onClickMap);

            const onDragMarker = (e) => {
                const {lng: longitude, lat: latitude} = e.target.getLngLat();
                marker.setLngLat([longitude, latitude]);
                setFieldValue('location', {
                    latitude,
                    longitude,
                });
            };

            marker.on('dragend', onDragMarker);
        }
    }, [map, marker, setFieldValue]);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const [unitNo,setUnitNo] = useState('');
    return (
        <CRow>
            <CCol md={6}>
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
                            <CFormGroup row>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">
                                        Confirmed
                                    </CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        defaultChecked
                                        id="confirmed"
                                        name="confirmed"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.confirmed}
                                    />
                                </CCol>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">
                                        Email Verified
                                    </CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        defaultChecked
                                        id="emailVerified"
                                        name="emailVerified"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.emailVerified}
                                    />
                                </CCol>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">
                                        Mobile Verified
                                    </CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        defaultChecked
                                        id="mobileVerified"
                                        name="mobileVerified"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.mobileVerified}
                                    />
                                </CCol>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">Blocked</CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        defaultChecked
                                        id="blocked"
                                        name="blocked"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.blocked}
                                    />
                                </CCol>
                            </CFormGroup>
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
            <CCol md={6} className="pb-4 d-flex flex-column">
                <CLabel>User location</CLabel>
                <div className="d-flex flex-fill">
    {
        loginedUser.role.name === process.env.REACT_APP_ROLE_PM_NAME? 
        <CCard>
<CCardBody>
<CCol xs="12"><CFormGroup><CLabel htmlFor="firstName">Please choose property</CLabel></CFormGroup></CCol>
{ loading?<CCol xs="12">loading</CCol>: properties!=null && properties!=undefined?  properties.map((entity) => {
          
          return (  <FormGroup check>
                <Label check>
                    <Input
                    className="form-check-input"
                        type="radio"
                        defaultChecked = { landlordId.length>0 && entity.id === landlordId}
                        name="alertType"
                        onChange={(e) => setProperty(e.target.value)}
                        value={entity.id}
                        
                    />
                    {entity.fullData.formatted_address}
                </Label>
         </FormGroup>
          );
        }):<CCol xs="12">null</CCol>
        }
 <CCol xs="12"><CFormGroup><CLabel htmlFor="firstName">Please input Unit Number</CLabel>
<CInput id="unitNo" name="unitNo"  onChange={(e) => setUnitNo(e.target.value)} value={unitNo}/>

                                </CFormGroup>
                            </CCol>
</CCardBody>
        </CCard>
        :<Map />
    }            
                    
                </div>
            </CCol>
        </CRow>
    );
};

export default UserEdit;
