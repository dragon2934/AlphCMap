import {useFormik} from 'formik';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {useHistory} from 'react-router';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Row,
    Col,
    Collapse,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import GMap from '../../../common/components/GMap';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {additionalPropertySchema} from '../../../common/validation/propertySchema';
import {
    getUserProperty,
    saveUserProperty,
} from '../../../redux/actionCreators/appActionCreators';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';
import Footer from '../newHome/Footer';
import Header from '../newHome/Header';

const EditProperty = () => {
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

    const currentUser = useSelector((state) => state.auth.user);
    if(!currentUser.primaryHolder){
        toastr.warning('Warning','Only Primary Holder can edit this address');
    }


    const {id: propertyId} = useSelector((state) => state.auth.user.property);
    const dispatch = useDispatch();

    const {map} = useContext(MapContext);

    const [marker] = useState(
        new window.google.maps.Marker({
            draggable: true,
        }),
    );

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            id: propertyId,
            email: '',
            rural: false,
            primaryAddress: true,
            hightRiseOrCommercial:false,
            totalFloors:'1',
            totalUnitsEachFloor:'1',
            addressType: '',
            settlementType: '',
            unitNo: '',
            postalCode: '',
            streetNumber: '',
            route: '',
            locality: '',
            lotNo: '',
            plotNo: '',
            region: '',
            province: '',
            city: '',
            country: '',
            location: {},
        },
        validationSchema: additionalPropertySchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            if (values.settlementType === 'lowRise') {
                values.unitNo = '';
            }

            const property = {
                ...values,
            };

            dispatch(saveUserProperty(property)).then((resp) => {
                setSubmitting(false);

                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({result: 'success'}),
                    );
                } else {
                    console.log('..save property..' + JSON.stringify(resp));
                    currentUser.property =  resp.value;
                    // history.push('/');
                    toastr.success(
                        'Successful!',
                        'New location is successfully.',
                    );
                    setTimeout(() => {
                        history.push('/');
                    }, 1000);
                }
            });
        },
    });

    const {
        handleChange,
        handleBlur: handleBlurOrig,
        handleSubmit,
        errors,
        touched,
        values,
        isValid,
        isSubmitting,
        setValues,
        setFieldValue,
    } = formik;

    const handleBlur = (...params) => {
        console.log('values: ', values);
        setValues({
            ...values,
            email: generateEmail(values),
        });
        geocodeAddress({
            address: [
                values.postalCode,
                values.streetNumber,
                values.route,
                values.locality,
                values.city,
                values.country,
            ].join(' '),
        }).then((response) => {
            if (response && response.latitude && response.longitude) {
                changeMarkerPosition(
                    response.longitude,
                    response.latitude,
                    false,
                );
            }
        });
        handleBlurOrig(...params);
    };

    const changeMarkerPosition = useCallback(
        (longitude, latitude, geocode = true) => {
            marker.setPosition({
                lng: longitude,
                lat: latitude,
            });

            if (geocode)
                reverseGeocodePoint({latitude, longitude}).then((data) => {
                    Object.keys(data).forEach((i) => {
                        if (data[i] === undefined) data[i] = '';
                    });

                    setValues({
                        ...values,
                        ...data,
                        unitNo: values.unitNo,
                        rural: Object.values(data).some((value) => !value),
                        email: generateEmail({
                            ...data,
                            unitNo: values.unitNo,
                        }),
                        location: {
                            latitude,
                            longitude,
                        },
                    });
                });
        },
        [marker, setValues, values],
    );

    useEffect(() => {
        dispatch(getUserProperty()).then(({value: property}) => {
            setValues({
                ...property,
                ...property.location,
            });

            const {latitude, longitude} = property.location;

            if (longitude && latitude && map) {
                marker.setPosition({
                    lng: longitude,
                    lat: latitude,
                });

                marker.setMap(map);
                map.panTo({
                    lng: longitude,
                    lat: latitude,
                });
            }
        });
    }, [dispatch, map, marker, propertyId, setValues]);

    
    useEffect(() => {
        if (map && currentUser.primaryHolder) {
            const onClickMap = (e) => {
                changeMarkerPosition(e.latLng.lng(), e.latLng.lat());
                marker.setMap(map);
            };

            map.addListener('click', onClickMap);

            const onDragMarker = (e) => {
                changeMarkerPosition(e.latLng.lng(), e.latLng.lat());
            };

            const handle = window.google.maps.event.addListener(
                marker,
                'dragend',
                onDragMarker,
            );

            return () => {
                window.google.maps.event.clearListeners(map, 'click');
                if (handle) window.google.maps.event.removeListener(handle);
            };
        }
    }, [changeMarkerPosition, map, marker, setValues, values]);
    
    const onSubmitSearchText = useCallback(
        (e) => {
            setSearching(true);

            e.preventDefault();
            e.stopPropagation();

            if (!searchText.trim()) return;

            geocodeAddress({
                address: searchText,
            })
                .then((data) => {
                    if (!data?.latitude) return false;

                    changeMarkerPosition(data.longitude, data.latitude);

                    map.panTo({
                        lng: data.longitude,
                        lat: data.latitude,
                    });
                })
                .finally(() => {
                    setSearching(false);
                });
        },
        [changeMarkerPosition, map, searchText],
    );

    return (
        <main>
            <Header />
            <div className='content'>
        <Card className="mb-5">
            <CardHeader>Edit Property</CardHeader>
           
                <CardBody className="pb-4 d-flex flex-column">
                <Row xs={12}>
                <Col xs="8">
                    <div
                        className="d-flex flex-fill mb-4"
                        style={{height: '600px'}}>
                       { currentUser.primaryHolder?  <div className={'map-top-actions'}>
                            <div className={'search-actions'}>
                                <Form onSubmit={onSubmitSearchText}>
                                    <Input
                                        bsSize={'sm'}
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.currentTarget.value)
                                        }
                                        placeholder={'Search...'}
                                    />
                                    <Button
                                        className="btn-no-focus"
                                        color={'info'}
                                        size={'sm'}
                                        onClick={onSubmitSearchText}
                                        type={'submit'}>
                                        {searching ? (
                                            <i className="fa fa-spin fa-spinner" />
                                        ) : (
                                            <i className="fa fa-search" />
                                        )}
                                    </Button>
                                </Form>
                            </div>
                        </div> : null }
                        <GMap />
                    </div>
                </Col>
                
                <Col xs="4">
                    <Row>
                    <Form onSubmit={handleSubmit}>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="firstName">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                style={{minWidth:"500px"}}
                                disabled={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={`${values.email}@alphc.com`}
                                invalid={touched.email && errors.email}
                            />
                            <FormFeedback>{errors.email}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
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
                                        checked={
                                            values.addressType === 'residential'
                                        }
                                        invalid={
                                            touched.addressType &&
                                            errors.addressType
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
                                        checked={
                                            values.addressType === 'commercial'
                                        }
                                        invalid={
                                            touched.addressType &&
                                            errors.addressType
                                        }
                                    />
                                    Commercial
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup tag="fieldset">
                            <Label for="postalCode">Settlement Type</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="settlementType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={'lowRise'}
                                        checked={
                                            values.settlementType === 'lowRise'
                                        }
                                        invalid={
                                            touched.settlementType &&
                                            errors.settlementType
                                        }
                                    />
                                    Single Dwelling
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="settlementType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={'highRise'}
                                        checked={
                                            values.settlementType === 'highRise'
                                        }
                                        invalid={
                                            touched.settlementType &&
                                            errors.settlementType
                                        }
                                    />
                                    High Rise/Multiple Units
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <Col>
                            <Collapse
                                isOpen={values.settlementType === 'highRise'}>
                                <Col>
                                    <FormGroup>
                                        <Label for="postalCode">Unit No</Label>
                                        <Input
                                            type="text"
                                            name="unitNo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.unitNo}
                                            invalid={
                                                touched.unitNo && errors.unitNo
                                            }
                                        />
                                        <FormFeedback>
                                            {errors.unitNo}
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Collapse>
                        </Col>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                name="postalCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postalCode}
                                invalid={
                                    touched.postalCode && errors.postalCode
                                }
                            />
                            <FormFeedback>{errors.postalCode}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="streetNumber">Street Number</Label>
                            <Input
                                id="streetNumber"
                                name="streetNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.streetNumber}
                                invalid={
                                    touched.streetNumber && errors.streetNumber
                                }
                            />
                            <FormFeedback>{errors.streetNumber}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="route">
                                Route / Lot No / Plot No / Local Identifier
                            </Label>
                            <Input
                                id="route"
                                name="route"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.route}
                                invalid={touched.route && errors.route}
                            />
                            <FormFeedback>{errors.route}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="locality">Locality</Label>
                            <Input
                                id="locality"
                                name="locality"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.locality}
                                invalid={touched.locality && errors.locality}
                            />
                            <FormFeedback>{errors.locality}</FormFeedback>
                        </FormGroup>
                    </Col>
                    {values.rural && (
                        <>
                            <Col>
                                <FormGroup>
                                    <Label for="lotNo">Lot No</Label>
                                    <Input
                                        type="text"
                                        name="lotNo"
                                        id="lotNo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lotNo}
                                        invalid={touched.lotNo && errors.lotNo}
                                        placeholder=""
                                    />
                                    <FormFeedback>{errors.lotNo}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="plotNo">Plot No</Label>
                                    <Input
                                        type="text"
                                        name="plotNo"
                                        id="plotNo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.plotNo}
                                        invalid={
                                            touched.plotNo && errors.plotNo
                                        }
                                        placeholder=""
                                    />
                                    <FormFeedback>{errors.plotNo}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="region">Region</Label>
                                    <Input
                                        type="text"
                                        name="region"
                                        id="region"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.region}
                                        invalid={
                                            touched.region && errors.region
                                        }
                                        placeholder=""
                                    />
                                    <FormFeedback>{errors.region}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="province">Province</Label>
                                    <Input
                                        type="text"
                                        name="province"
                                        id="province"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.province}
                                        invalid={
                                            touched.province && errors.province
                                        }
                                        placeholder=""
                                    />
                                    <FormFeedback>
                                        {errors.province}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </>
                    )}
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="city">
                                City / Province / State
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                invalid={touched.city && errors.city}
                            />
                            <FormFeedback>{errors.city}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                name="country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                invalid={touched.country && errors.country}
                            />
                            <FormFeedback>{errors.country}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
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
                                    onBlur={handleBlur}
                                    invalid={
                                        touched.primaryAddress &&
                                        errors.primaryAddress
                                    }
                                    checked={values.primaryAddress}
                                />
                                This is my primary address
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input
                                type="hidden"
                                invalid={errors.inValidProperty}
                            />
                            <FormFeedback>
                                {errors.inValidProperty}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                    { currentUser.primaryHolder ?  <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        block
                        color="primary">
                        {isSubmitting ? <Spinner size="sm" /> : 'Submit'}
                    </Button>:null}
                    </Col>
                    </Form>
                    </Row>
                    </Col>
                    
                    </Row>
                </CardBody>
                <CardFooter className="text-right">
                  
                </CardFooter>
            
        </Card>
        </div>
        <Footer />
        </main>

    );
};

export default EditProperty;
