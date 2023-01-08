import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import GMap from '../../../common/components/GMap';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import { getUserProperty } from '../../../redux/actionCreators/appActionCreators';

const ViewProperty = () => {
    const dispatch = useDispatch();
    const { map } = useContext(MapContext);

    const [property, setProperty] = useState(null);
    const [marker] = useState(
        new window.google.maps.Marker({
            draggable: false,
        }),
    );

    useEffect(() => {
        dispatch(getUserProperty()).then(({ value: property }) => {
            setProperty({
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
    }, [dispatch, map, marker]);

    return (
        <Card className="mb-3">
            <CardHeader>Property</CardHeader>
            <CardBody className="pb-4 d-flex flex-column">
                <div
                    className="d-flex flex-fill mb-4"
                    style={{ height: '400px' }}>
                    <GMap />
                </div>
                {!property && (
                    <div className={'text-center'}>
                        <Spinner
                            type={'grow'}
                            color={'primary'}
                            style={{ width: '5rem', height: '5rem' }}>
                            {''}
                        </Spinner>
                    </div>
                )}
                {property && (
                    <>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="firstName">Email</Label>
                                <Input
                                    id="email"
                                    disabled={true}
                                    value={`${property.email}@alphc.com`}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup tag="fieldset">
                                <Label for="postalCode">Address Type</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            disabled={true}
                                            value={'residential'}
                                            checked={
                                                property.addressType ===
                                                'residential'
                                            }
                                        />
                                        Residential
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            disabled={true}
                                            value={'commercial'}
                                            checked={
                                                property.addressType ===
                                                'commercial'
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
                                            disabled={true}
                                            value={'lowRise'}
                                            checked={
                                                property.settlementType ===
                                                'lowRise'
                                            }
                                        />
                                        Single Dwelling
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            disabled={true}
                                            value={'highRise'}
                                            checked={
                                                property.settlementType ===
                                                'highRise'
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
                                    isOpen={
                                        property.settlementType === 'highRise'
                                    }>
                                    <Col>
                                        <FormGroup>
                                            <Label for="postalCode">
                                                Unit No
                                            </Label>
                                            <Input
                                                type="text"
                                                value={property.unitNo}
                                                disabled={true}
                                            />
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
                                    value={property.postalCode}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="streetNumber">
                                    Street Number
                                </Label>
                                <Input
                                    id="streetNumber"
                                    value={property.streetNumber}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="route">
                                    Street /Route / Lot No / Plot No / Local Identifier
                                </Label>
                                <Input
                                    id="route"
                                    value={property.route}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="locality"> City / Locality</Label>
                                <Input
                                    id="locality"
                                    value={property.locality}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        {property.rural && (
                            <>
                                <Col>
                                    <FormGroup>
                                        <Label for="lotNo">Lot No</Label>
                                        <Input
                                            type="text"
                                            value={property.lotNo}
                                            id="lotNo"
                                            disabled={true}
                                            placeholder=""
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="plotNo">Plot No</Label>
                                        <Input
                                            type="text"
                                            value={property.plotNo}
                                            id="plotNo"
                                            disabled={true}
                                            placeholder=""
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="region">Region</Label>
                                        <Input
                                            type="text"
                                            value={property.region}
                                            id="region"
                                            disabled={true}
                                            placeholder=""
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="province">Province</Label>
                                        <Input
                                            type="text"
                                            value={property.province}
                                            id="province"
                                            disabled={true}
                                            placeholder=""
                                        />
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
                                    value={property.city}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={property.country}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        value={property.primaryAddress}
                                    />
                                    This is my primary address
                                </Label>
                            </FormGroup>
                        </Col>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default ViewProperty;
