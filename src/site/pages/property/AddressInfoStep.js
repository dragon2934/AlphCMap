import {useFormik} from 'formik';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Col,
    Collapse,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import {propertySchema} from '../../../common/validation/propertySchema';
import {
    resetRegistrationForm,
    setPropertyRegistrationForm,
    isPropertyRegistered
} from '../../../redux/actionCreators/registrationActionCreators';
import {
    generateEmail,
} from '../../../utils/propertyUtils';
// import { isAppEmbedWebview } from '../../../utils/utils';

const AddressInfoStep = ({wizardInstance}) => {
    const dispatch = useDispatch();
    const {address} = useSelector((state) => state.registerForm);
    address.steps = 2;
    const emailDisplay = generateEmail(address);
    const formik = useFormik({
        initialValues: {
            primaryAddress: true,
            hightRiseOrCommercial:false,
            propertyName:'',
            totalFloors:'1',
            totalUnitsEachFloor:'1',
            addressType: '',
            settlementType: '',
            unitNo: '',
        },
        isInitialValid: false,
        validationSchema: propertySchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            let email = generateEmail(address);
            console.log('email=' + email);
            // if this is hightRiseOrCommercial, check property register
            // if(values.hightRiseOrCommercial){
            //     dispatch(isPropertyRegistered(email)).then(result=>{
            //         // console.log('check property registration=' + JSON.stringify( result));
            //         if(result.value.registered){
            //             //reject with error
            //             setErrorMessage('This address is already registered! Please contact property management');
            //             setSubmitting(false);
            //         }else{
            //             //continue register
            //             if (values.settlementType === 'lowRise') {
            //                 values.unitNo = '';
            //             }
        
            //             const {unitNo, ...otherValues} = values;
        
            //             dispatch(
            //                 setPropertyRegistrationForm({
            //                     ...otherValues,
            //                     address: {
            //                         ...address,
            //                         unitNo,
            //                     },
            //                 }),
            //             );
        
            //             wizardInstance.nextStep();
            //         }
            //     }).catch(error=>{
            //         console.log('check property error' + error);
            //         setErrorMessage(JSON.stringify(error));
            //         setSubmitting(false);
            //     });
            // }else if(values.settlementType=='highRise'){
            //     //check unit number register ?
            //     email = values.unitNo+'-' + email;
            //     dispatch(isPropertyRegistered(email)).then(result=>{
            //         // console.log('check property registration=' + JSON.stringify( result));
            //         if(result.value.registered){
            //             //reject with error
            //             setErrorMessage('This address is already registered! Please contact anything@alphc.com');
            //             setSubmitting(false);
            //         }else{
            //             //continue register
            //             if (values.settlementType === 'lowRise') {
            //                 values.unitNo = '';
            //             }
            //             const {unitNo, ...otherValues} = values;
            //             dispatch(
            //                 setPropertyRegistrationForm({
            //                     ...otherValues,
            //                     address: {
            //                         ...address,
            //                         unitNo,
            //                     },
            //                 }),
            //             );
        
            //             wizardInstance.nextStep();
            //         }
            //     }).catch(error=>{
            //         console.log('check property error' + error);
            //         setErrorMessage(JSON.stringify(error));
            //         setSubmitting(false);
            //     });

            // }else{
                if (values.settlementType === 'lowRise') {
                    values.unitNo = '';
                }

                const {unitNo, ...otherValues} = values;

                dispatch(
                    setPropertyRegistrationForm({
                        ...otherValues,
                        address: {
                            ...address,
                            unitNo,
                        },
                    }),
                );

                wizardInstance.nextStep();
            // }
        },
    });
    // Modal open state
 
    const [errorMessage,setErrorMessage] = useState('');

   
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
    } = formik;

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Input type="hidden" value={2} name="steps"/>
            </Col>
            <Col>
                <FormGroup tag="fieldset">
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                name="primaryAddress"
                                onChange={(e) => {
                                    setFieldValue(
                                        'primaryAddress',
                                        e.currentTarget.checked,
                                    );
                                }}
                                checked={values.primaryAddress}
                                onBlur={handleBlur}
                                invalid={
                                    touched.primaryAddress &&
                                    errors.primaryAddress
                                }
                            />
                            This is my primary address
                        </Label>
                        
                        {/* <Label check>
                            <Input
                                type="checkbox"
                                name="hightRiseOrCommercial"
                                onChange={(e) => {
                                    setFieldValue(
                                        'hightRiseOrCommercial',
                                        e.currentTarget.checked,
                                    );
                                }}
                                checked={values.hightRiseOrCommercial}
                                onBlur={handleBlur}
                                invalid={
                                    touched.hightRiseOrCommercial &&
                                    errors.hightRiseOrCommercial
                                }
                            />
                            High Rise residential/Commercial use ONLY
                        </Label> */}
                    </FormGroup>
                </FormGroup>
            </Col>
            <Col>
            <Collapse isOpen={values.hightRiseOrCommercial === false}>
                    
                <FormGroup tag="fieldset">
                    <Label for="postalCode">Address Type</Label>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'residential'}
                                invalid={
                                    touched.addressType && errors.addressType
                                }
                            />
                            Residential
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'commercial'}
                                invalid={
                                    touched.addressType && errors.addressType
                                }
                            />
                            Commercial
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'Incorporate'}
                                invalid={
                                    touched.addressType && errors.addressType
                                }
                            />
                            Incorporate
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'School'}
                                invalid={
                                    touched.addressType && errors.addressType
                                }
                            />
                            School
                        </Label>
                    </FormGroup>
                </FormGroup>
                </Collapse>
            </Col>
            <Col>
                <Collapse isOpen={values.addressType === 'Incorporate' || values.addressType === 'School'}>
                <FormGroup>
                        <Label for="lblPropertyName">Name</Label>
                        <Input
                            type="text"
                            name="propertyName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertyName}
                            invalid={touched.propertyName && errors.propertyName}
                        />
                        <FormFeedback>{errors.propertyName}</FormFeedback>
                    </FormGroup>
                </Collapse>
            </Col>
            {/* <Col>
                <FormGroup tag="fieldset">
                    <Label for="postalCode">Settlement Type</Label>
                    <Collapse isOpen={values.hightRiseOrCommercial === false}>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="settlementType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'lowRise'}
                                invalid={
                                    touched.settlementType &&
                                    errors.settlementType
                                }
                            />
                            Single Dwelling
                        </Label>
                    </FormGroup>
                    </Collapse>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="settlementType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'highRise'}
                                invalid={
                                    touched.settlementType &&
                                    errors.settlementType
                                }
                            />
                            High Rise / Multiple Units
                        </Label>
                    </FormGroup>
                </FormGroup>
            </Col> */}
            {/* <Col>
                <Collapse isOpen={values.settlementType === 'highRise'}>
                    {values.hightRiseOrCommercial?
                    <Col>
                    <FormGroup>
                    <FormGroup>
                        <Label for="totalFloors">Total Floors</Label>
                        <Input
                            type="text"
                            name="totalFloors"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.totalFloors}
                            invalid={touched.totalFloors && errors.totalFloors}
                        />
                        <FormFeedback>{errors.totalFloors}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalUnitsEachFloor">Total Units each floor</Label>
                        <Input
                            type="text"
                            name="totalUnitsEachFloor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.totalUnitsEachFloor}
                            invalid={touched.totalUnitsEachFloor && errors.totalUnitsEachFloor}
                        />
                        <FormFeedback>{errors.totalUnitsEachFloor}</FormFeedback>
                    </FormGroup>
                    </FormGroup>
                   </Col> :
                    <Col>
                        <FormGroup>
                            <Label for="postalCode">Unit No</Label>
                            <Input
                                type="text"
                                name="unitNo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.unitNo}
                                invalid={touched.unitNo && errors.unitNo}
                            />
                            <FormFeedback>{errors.unitNo}</FormFeedback>
                        </FormGroup>
                    </Col>
                    }
                </Collapse>
            </Col> */}
            <Col>
            <Collapse isOpen={errorMessage.length > 0 }>
            <Label color={'danger'} for="errorMessage">{errorMessage}</Label>
            </Collapse>
            </Col>
            <Col>
                <Button block disabled={!isValid || isSubmitting}>
                    {isSubmitting ? <Spinner size={'sm'} /> : 'Next'}
                </Button>
            </Col>

            <Col>
                <Button
                    className="mt-1 mb-5"
                    color={'danger'}
                    block
                    onClick={() => dispatch(resetRegistrationForm())}>
                    Cancel
                </Button>
            </Col>
{/* {    isAppEmbedWebview() ?        
           <Col>
           <div className={'info-window'}>
            <div>Your AlphC contact email:</div>
                <h4 style={{color:'#cccccc'}}>{emailDisplay}@alphc.com</h4>
                <div>Patented Technology</div>
            </div>
           </Col>:null
} */}
        </Form>
    );
};

export default AddressInfoStep;
