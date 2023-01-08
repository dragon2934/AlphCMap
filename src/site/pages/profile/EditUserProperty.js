import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useHistory } from 'react-router';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
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
import { additionalPropertySchema } from '../../../common/validation/propertySchema';
import {
    getUserPropertyById,
    saveAdditionalAddress
} from '../../../redux/actionCreators/appActionCreators';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';
import { isAppEmbedWebview } from '../../../utils/utils';
const EditUserProperty = ({
    match: {
        params: { id },
    },
}) => {
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

    const [isPrimaryHolder, setIsPrimaryHolder] = useState(false);


    const currentUser = useSelector((state) => state.auth.me);


    const dispatch = useDispatch();

    const { map } = useContext(MapContext);

    const [marker] = useState(
        new window.google.maps.Marker({
            draggable: true,
        }),
    );

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            id: id,
            email: '',
            rural: false,
            primaryAddress: true,
            hightRiseOrCommercial: false,
            totalFloors: '1',
            totalUnitsEachFloor: '1',
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
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);

            if (values.settlementType === 'lowRise') {
                values.unitNo = '';
            }

            const property = {
                ...values,
            };

            dispatch(saveAdditionalAddress(property)).then((savedProperty) => {
                console.log(' savedProperty=' + JSON.stringify(savedProperty));
                if (savedProperty.value.error) {
                    if (savedProperty.value.error === -1) {
                        toastr.error('Error', 'Address has been activated! Contact Primary Resident and request to be added as Secondary Resident or Contact anything@alphc.com if you are the Primary Resident.', {
                            "positionClass": "toast-top-right",
                            "timeOut": "6000",
                        });
                    } else if (savedProperty.value.error === -2) {
                        toastr.error('Error', 'You already added this address', {
                            "positionClass": "toast-top-right",
                            "timeOut": "6000",
                        });
                    } else {
                        toastr.error('Error', 'Add property error! Please contact anything@alphc.com', {
                            "positionClass": "toast-top-right",
                            "timeOut": "6000",
                        });
                    }
                    setSubmitting(false);
                } else {
                    setSubmitting(false);
                    if (isAppEmbedWebview()) {
                        history.push('/mobile-user-properties');
                    } else {
                        history.push('/profile');
                        toastr.success(
                            'Successful!',
                            'New property is successfully registered.',
                        );
                    }
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
            if (isPrimaryHolder || (id == null || id == undefined)) {
                marker.setPosition({
                    lng: longitude,
                    lat: latitude,
                });

                if (geocode)
                    reverseGeocodePoint({ latitude, longitude }).then((data) => {
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
            }
        },
        [marker, setValues, values],
    );

    useEffect(() => {
        if (id) {
            console.log('property id=' + id);
            dispatch(getUserPropertyById(id)).then(({ value: property }) => {
                console.log('get property....' + JSON.stringify(property));
                const users = property.users;
                const user = users.find(u => {
                    return u.id === currentUser.id;
                });
                if (property.primaryHolder) {
                    setIsPrimaryHolder(true);
                }
                setValues({
                    ...property,
                    ...property.location,
                });

                const { latitude, longitude } = property.location;

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
        } else {
            //adding property
            setIsPrimaryHolder(true);
        }
    }, [dispatch, map, marker, id, setValues]);

    useEffect(() => {
        if (map) {
            const onClickMap = (e) => {
                changeMarkerPosition(e.latLng.lng(), e.latLng.lat());
                marker.setMap(map);
            };

            if (isPrimaryHolder || (id == null || id == undefined)) {
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
                    marker.setMap(map);
                })
                .finally(() => {
                    setSearching(false);
                });
        },
        [changeMarkerPosition, map, searchText],
    );

    return (
        <Card className="mb-1">
            <CardHeader> {id === null || id === undefined ? 'Add Property' : isPrimaryHolder ? 'Edit Property' : 'View Property'} </CardHeader>
            <Form onSubmit={handleSubmit}>
                <CardBody className="pb-4 d-flex flex-column">
                    <div
                        className="d-flex flex-fill mb-4"
                        style={{ height: '400px' }}>
                        {isPrimaryHolder ? <div className={'map-top-actions'}>
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
                                        type={'submit'}>
                                        {searching ? (
                                            <i className="fa fa-spin fa-spinner" />
                                        ) : (
                                            <i className="fa fa-search" />
                                        )}
                                    </Button>
                                </Form>
                            </div>
                        </div> : null}
                        <GMap />
                    </div>

                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="firstName">Email</Label>
                            <Input
                                id="email"
                                name="email"
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
                                        disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                    <Col XS="12">
                        <FormGroup tag="fieldset">
                            <Label for="postalCode">Settlement Type</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="settlementType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                                            disabled={!isPrimaryHolder}
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
                                disabled={!isPrimaryHolder}
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
                                disabled={!isPrimaryHolder}
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
                                Street /Route / Lot No / Plot No / Local Identifier
                            </Label>
                            <Input
                                id="route"
                                name="route"
                                onChange={handleChange}
                                disabled={!isPrimaryHolder}
                                onBlur={handleBlur}
                                value={values.route}
                                invalid={touched.route && errors.route}
                            />
                            <FormFeedback>{errors.route}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="locality"> City / Locality</Label>
                            <Input
                                id="locality"
                                name="locality"
                                onChange={handleChange}
                                disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                                        disabled={!isPrimaryHolder}
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
                                Province / State
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                onChange={handleChange}
                                disabled={!isPrimaryHolder}
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
                                disabled={!isPrimaryHolder}
                                onBlur={handleBlur}
                                value={values.country}
                                invalid={touched.country && errors.country}
                            />
                            <FormFeedback>{errors.country}</FormFeedback>
                        </FormGroup>
                    </Col>
                    {/* <Col>
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
                    </Col> */}
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
                </CardBody>
                <CardFooter className="text-right" style={{ "padding-bottom": "60px" }}>
                    {isPrimaryHolder ? <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        block
                        color="primary">
                        {isSubmitting ? <Spinner size="sm" /> : 'Submit'}
                    </Button> : null}
                    {isAppEmbedWebview() ? <Button
                        className="mt-1"
                        block
                        tag={Link}
                        to={`/mobile-user-properties`}>
                        Back
                    </Button> : null}
                </CardFooter>
            </Form>
        </Card>
    );
};

export default EditUserProperty;
