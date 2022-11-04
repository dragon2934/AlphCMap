import {CButton, CCol, CFormGroup, CInput, CLabel, CRow} from '@coreui/react';
import mapboxgl from 'mapbox-gl';
import React, {Component} from "react";
import {Form, Input} from 'reactstrap';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';

class CreateEmails extends Component {
    state = {
        pins: [],
        mapInitialized: false,
        domain: 'alphc.com',
        searchText: '',
    };

    static contextType = MapContext;

    componentDidUpdate(prevProps, prevState, pre) {
        const {map} = this.context;
        const {mapInitialized} = this.state;
        if (!mapInitialized && map) {
            this.initMap();

            this.setState({
                mapInitialized: true,
            });
        }
    }

    initMap = () => {
        const {map} = this.context;
        map.on('click', this.onClickMap);
    };

    onClickMap = (e) => {
        const {lng: longitude, lat: latitude} = e.lngLat;

        this.createMarker({latitude, longitude});
    };

    createMarker = async ({latitude, longitude}) => {
        const {domain} = this.state;
        const {map} = this.context;

        const marker = new mapboxgl.Marker({
            draggable: true,
        }).setPopup(
            new mapboxgl.Popup({
                closeOnClick: true,
                closeButton: true,
                maxWidth: 'none',
            }).setHTML('<h1>No address</h1>'),
        );
        marker.setLngLat([longitude, latitude]);
        marker.addTo(map);

        marker.on('dragend', this.onDragMarker);
        marker.on('click', () => marker.togglePopup());

        const geocodeData = await reverseGeocodePoint({longitude, latitude});

        const email = generateEmail(geocodeData);
        marker.getPopup().setHTML(`<h4>${email}@${domain}</h4>`);
        marker.togglePopup();

        const {pins} = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        this.setState((state) => {
            return {
                ...state,
                pins: [
                    ...pins,
                    {
                        marker,
                        email,
                    },
                ],
            };
        });
    };

    onDragMarker = async (event) => {
        const {pins, domain} = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        const {lng: longitude, lat: latitude} = event.target.getLngLat();

        const geocodeData = await reverseGeocodePoint({longitude, latitude});

        const email = generateEmail(geocodeData);

        const index = pins.map((p) => p.marker === event.target).indexOf(true);

        const marker = pins[index].marker;

        marker.getPopup().setHTML(`<h4>${email}@${domain}</h4>`);
        marker.togglePopup();

        this.setState((state) => {
            return {
                ...state,
                pins: [
                    ...pins.slice(0, index),
                    {
                        marker,
                        email,
                    },
                    ...pins.slice(index + 1, pins.length),
                ],
            };
        });
    };

    onClickEmail = (email) => {
        const {map} = this.context;

        const {pins, domain} = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        pins.filter((p) => p.email === email).forEach((p) => {
            if (!p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
                p.marker.getPopup().setHTML(`<h4>${email}@${domain}</h4>`);
            }

            map.flyTo({
                center: [p.marker.getLngLat().lng, p.marker.getLngLat().lat],
            });
        });
    };

    onChangeDomain = (e) => {
        const {pins} = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        this.setState({
            domain: e.currentTarget.value,
        });
    };
    onChangeSearchText = (e) => {
        this.setState({
            searchText: e.currentTarget.value,
        });
    };

    onSubmitSearch = (e) => {
        e.preventDefault();

        const {searchText} = this.state;

        if (!searchText.trim()) return;

        geocodeAddress({address: searchText}).then((data) => {
            const {map} = this.context;

            if (data) {
                this.createMarker({
                    latitude: data.latitude,
                    longitude: data.longitude,
                });

                map.flyTo({
                    center: [data.longitude, data.latitude],
                });
            }
        });
    };

    render() {
        const {pins, domain, searchText} = this.state;

        return (
            <CRow className="h-100">
                <CCol className="d-flex" xs="12" sm="6" md="8">
                    <div className={'map-top-actions'}>
                        <div className={'search-actions'}>
                            <Form onSubmit={this.onSubmitSearch}>
                                <Input
                                    bsSize={'lg'}
                                    className=""
                                    value={searchText}
                                    onChange={this.onChangeSearchText}
                                    placeholder={'Search...'}
                                />
                            </Form>
                        </div>
                    </div>
                    <Map />
                </CCol>
                <CCol xs="12" sm="6" md="4">
                    <CFormGroup>
                        <CLabel htmlFor="domain">Domain</CLabel>
                        <CInput
                            id="domain"
                            name="domain"
                            onChange={this.onChangeDomain}
                        />
                    </CFormGroup>
                    <ul>
                        {pins.map((p) => (
                            <CButton
                                block
                                className="m-1 text-left"
                                color={'success'}
                                onClick={() => this.onClickEmail(p.email)}>
                                {p.email}@{domain}
                            </CButton>
                        ))}
                    </ul>
                </CCol>
            </CRow>
        );
    }
}

export default CreateEmails;
