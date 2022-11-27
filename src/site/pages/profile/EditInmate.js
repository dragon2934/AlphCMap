import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import MobileInput from '../../../common/components/MobileInput';
import {
    getInmate,
    saveInmate,
} from '../../../redux/actionCreators/appActionCreators';
import { isAppEmbedWebview } from '../../../utils/utils';
import {toastr} from 'react-redux-toastr';
import { isMobileRegistered} from '../../../redux/actionCreators/registrationActionCreators';

const validationSchema = Yup.object().shape({
    mobileNumber: Yup.number().required('Mobile number is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    // email: Yup.string().email('Invalid email'),
    // password: Yup.string()
    //     .min(6, 'Password is  too Short!')
    //     .max(16, 'Password is too Long!'),
    // // .required('Password is required'),
    // passwordConfirmation: Yup.string()
    //     // .required('Password confirmation is required')
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const addUserSchema = Yup.object().shape({
    mobileNumber: Yup.number().required('Mobile number is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    // email: Yup.string().email('Invalid email'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is  too Short!')
        .max(16, 'Password is too Long!'),
    passwordConfirmation: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const EditInmate = ({
    match: {
        params: {id},
    },
}) => {
    const currentUser = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(!!id);
    const [mobileAvailable,setMobileAvailable] = useState(id!=null && id!= undefined ? 3: 0);



    const dispatch = useDispatch();
    const history = useHistory();

    const getPropertyId = () =>{
        let propertyId = currentUser.property.id;
        const query = new URLSearchParams(window.location.search);

        if(query!=null && query!==undefined){
            const pid = query.get('propertyId');
            // console.log('pid ==' + pid);
            propertyId = pid;
        }
        return propertyId;
    }

    const saveInmateData = (values, {setSubmitting}) =>{

        setSubmitting(true);
        const propertyId = getPropertyId();

        const isEdit = id!=null && id!=undefined ? true: mobileAvailable ==2? true: false;
        //编译用户，或者用户已经存在的，不能传入password，否则密码就变空了
        const newUser =isEdit? {
            id: id,
            property: propertyId,
            mobileNumber: values.mobileNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.email,
        }: {
            id: id,
            property: propertyId,
            mobileNumber: values.mobileNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            username: values.email,
            password: values.password,
            provider: 'local',
        };
        

        dispatch(saveInmate(newUser))
            .then(({value: user}) => {
                console.log(' save in mate...' + JSON.stringify(user));
                if(user.error){
                    toastr.error('Error !',user.message);
                }else{
                    if(id===null || id===undefined){
                        toastr.success(
                            'Successful!',
                            mobileAvailable ==2?'User added as a secondary resident to this address.':
                            'User added as a secondary resident to this address.  Advise resident to download AlphC E-Alert App and register using SMS verification code and password created. ',
                        );
                    }
                    
                    if(isAppEmbedWebview()){
                        history.push(`/mobile-resident/view/${user.id}?propertyId=`+propertyId);
                    }else{
                        history.push(`/profile/other-resident/view/${user.id}?propertyId=`+propertyId);
                    }
                }
            })
            .catch((response) => {
                if(response && response.message && response.message[0].messages && response.message[0].messages[0].id){
                    console.log('response: ', response);

                    switch (response.message[0].messages[0].id) {
                        case 'Auth.form.error.mobileNumber.taken':
                            setFieldError(
                                'mobileNumber',
                                'Mobile No. already registered',
                            );
                            break;
                        default:
                            break;
                    }
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    }
    const formik = useFormik({
        initialValues: {
            mobileNumber: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        isInitialValid: false,
        validationSchema: id!=null && id!=undefined ? validationSchema: mobileAvailable ==2? validationSchema: addUserSchema,
        onSubmit: (values, {setSubmitting}) => {

            if(mobileAvailable===2){
                toastr.confirm(
                    'Are you sure you want to add this user as resident? The resident’s name and phone no. will be displayed and accessible by all residents at this address!',
                    {
                        onOk: () => {
                            saveInmateData(values, {setSubmitting});
                        },
                    },
                );
            }else{
                saveInmateData(values, {setSubmitting});
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
        setValues,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        setFieldError,
    } = formik;

    useEffect(() => {
        if (id) {
            let propertyId = getPropertyId();
            dispatch(getInmate(id,propertyId)).then(({value: user}) => {
                setValues(user);
                setLoading(false);
            });
        }
    }, [dispatch, id, setValues]);

    const searchUser=()=>{
        console.log('checking user existing....' + values.mobileNumber);
        dispatch(isMobileRegistered(values.mobileNumber)).then(({value: user}) => {
           console.log('check registration....' + JSON.stringify(user));
           if(user.id === '-1'){
            // this mobile is available
            setMobileAvailable(1);
           }else{
            setMobileAvailable(2);
            toastr.warning('','User is already registered and will be added as secondary resident');
            values.firstName = user.firstName;
            values.lastName = user.lastName;
            // values.email = user.email;
           }
        });
    }

    // const query = new URLSearchParams(window.location.search);
    // // console.log('query = ' + query);
    // const [propertyId,setPropertyId] = useState(null);
    // if(query!=null && query!==undefined){
    //     const pid = query.get('propertyId');
    //     // console.log('pid ==' + pid);
    //     setPropertyId(pid);
    // }
    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <CardHeader>User Info</CardHeader>
                <CardBody className={'profile-content-user-card'}>
                    {loading && (
                        <div className="text-center">
                            <Spinner size={'sm'} />
                        </div>
                    )}
                    {!loading && (
                        <>
                            <Col>
                                <FormGroup>
                                    <Label for="mobileNumber">
                                        Mobile Number &nbsp;&nbsp; { mobileAvailable===0 || mobileAvailable===3 ?null: mobileAvailable===1?'✅ ':'❌'}
                                    </Label>
                                    <MobileInput
                                        
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={()=>{
                                            
                                            setFieldTouched();
                                            searchUser();
                                        }}
                                        placeholder="Mobile Number"
                                        name={'mobileNumber'}
                                        value={values.mobileNumber}
                                        invalid={
                                            touched.mobileNumber &&
                                            errors.mobileNumber
                                        }
                                    />
                                    <FormFeedback>
                                        {errors.mobileNumber}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.firstName &&
                                            errors.firstName
                                        }
                                    />
                                    <FormFeedback>
                                        {errors.firstName}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.lastName && errors.lastName
                                        }
                                    />
                                    <FormFeedback>
                                        {errors.lastName}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            {/* <Col>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email}
                                        placeholder="myemail@email.com"
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </FormGroup>
                            </Col> */}
                         {mobileAvailable===2 || mobileAvailable===3 ?null:   <Col>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.password && errors.password
                                        }
                                        placeholder="********"
                                    />
                                    <FormFeedback>
                                        {errors.password}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
}
{mobileAvailable===2 || mobileAvailable===3 ?  null:    <Col>
                                <FormGroup>
                                    <Label for="passwordConfirmation">
                                        Password Confirmation
                                    </Label>
                                    <Input
                                        type="password"
                                        name="passwordConfirmation"
                                        id="passwordConfirmation"
                                        value={values.passwordConfirmation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.passwordConfirmation &&
                                            errors.passwordConfirmation
                                        }
                                        placeholder="********"
                                    />
                                    <FormFeedback>
                                        {errors.passwordConfirmation}
                                    </FormFeedback>
                                </FormGroup>
                            </Col> 
 } 
                        </>
                    )}
                </CardBody>
                <CardFooter>
                    <>
                        <Button
                            block
                            type={'submit'}
                            color={'success'}
                            disabled={!isValid || isSubmitting}>
                            {isSubmitting ? <Spinner size={'sm'} /> : 'Save'}
                        </Button>
                      { isAppEmbedWebview()?  <Button
                            className="mt-1"
                            block
                            tag={Link}
                            color={'danger'}
                            to={`/mobile-residents/` + getPropertyId()}>
                            Cancel
                        </Button> :  <Button
                            className="mt-1"
                            block
                            tag={Link}
                            color={'danger'}
                            to={`/profile/other-resident/view/${id}?propertyId=`+getPropertyId()}>
                            Cancel
                        </Button>
                      }
                       {/* { isAppEmbedWebview?  <Button
                            className="mt-1"
                            block
                            tag={Link}
                            to={`/mobile-residents/` + getPropertyId()}>
                            Back
                        </Button> : null} */}
                    </>
                </CardFooter>
            </Form>
        </Card>
    );
};

export default EditInmate;
