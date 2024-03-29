import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchUsers,
    loadBusinessAddress,
    loadConnected,
    getAddressByType,
    checkBusinessProfile
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearDistancesFromMap,
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showPrimaryDistancesOnMap,
    showHomeAndBusinessOnMap,
    showPropertiesOnMap,
    showLineLayer,
    clearLayer,
    removeAllImages
} from '../../../utils/mapUtils';
import { generateString } from '../../../utils/utils';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';
import PropertiesTooltip from '../../../admin/components/PropertiesTooltip';
import PropertyForm from '../property/PropertyForm';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import ReactDOM from 'react-dom';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';

import { saveBatchProperties, deleteUserAdditionalAddressById } from '../../../redux/actionCreators/appActionCreators';
import { getMe } from '../../../redux/actionCreators/authActionCreators';
import {
    MapMarkerUrls,
} from '../../../constants';
import ChangeColorForm from './ChangeColorForm';
import BindingForm from './BindingForm';

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import FlyerForm from './FlyerForm';
import { convertAttributes, convertLocation, convertGeoProperty } from '../../../utils/utils';
import BusinessInfo from './BusinessInfo';
import { getLoginType } from '../../../utils/utils';
import { toastr } from 'react-redux-toastr';
import { parseInt } from 'lodash-es';
// import mitt from 'mitt';
import EventBus from '../../../utils/eventBus';
import ShowHighRiseInfo from './ShowHighRiseInfo';
import ShowNoDelivery from './ShowNoDelivery';
import PreferenceForm from './PreferenceForm';
import UploadFlyerForm from './UploadFlyerForm';
import ImportCustomeForm from './ImportCustomeForm';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

class Showcase extends Component {
    static contextType = MapContext;

    state = {
        pins: [],
        mapInitialized: false,
        searchText: '',
        // active: false,
        selectedAddress: null,
        email: '',
        properties: [],
        changeColor: false,
        layerAdded: [],
        draw: null,
        drawedBefore: false,
        drawing: false,
        selectedProperties: [],
        feature: null,
        selectedPropertyEmail: [],
        satelliteMode: false,
        showMapLegend: false,
        showBusinessInfo: false,
        propertyByTpe: null,
        has2Address: true,
        hasBusinessProfile: true,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { map } = this.context;
        const { mapInitialized } = this.state;
        if (!mapInitialized && map) {
            this.initializeLayers();

            this.setState({
                mapInitialized: true,
            });
            EventBus.$on('onSendFlyerBtnClick', (data) => {
                console.log('....onSendFlyerBtnClick...', data);
                const { utilsData, } = this.props;
                const { properties } = this.state;
                //goto send flyer page
                let selected = [];
                properties.map(property => {
                    let columnJson = {
                        "Email": property.properties.email
                    }
                    selected.push(columnJson)
                });
                console.log(' end drawing 1=' + JSON.stringify(data) + ' 2=' + JSON.stringify(selected));

                // const { properties } = this.state;
                utilsData.drawFinished = true;

                utilsData.selectedProperty = properties;
                utilsData.fncCallback = this.cbBusinessInfoCallBack;
                this.setState({
                    // drawing: !drawing,
                    selectedProperties: data,
                    selectedPropertyEmail: selected,
                    // feature: featureCollection.features[0]
                });
            })
        }

    }

    componentWillUnmount() {
        const { map } = this.context;
        try {
            if (map) {
                clearPropertiesFromMap(map);
                clearResidentsFromMap(map);
                clearDistancesFromMap(map);
                map.removeLayer('area');
                map.removeSource('area');
            }
        } catch (e) {
            console.log('..componment unmount error');
        }
    }



    renderPropertiesTooltip = ({ id, email, property }) => {
        const { utilsData, } = this.props;
        const { properties } = this.state;
        const { auth } = this.props;
        const user = auth.user;
        console.log('...renderPropertiesTooltip..', property);
        if (property.usuage && parseInt(property.usuage) === 2) {
            utilsData.selectedProperty = property;
            utilsData.showBusinessInfo = true;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;

            // if this is merchant login && this is merchant's property, check whether has no-delivery
            const loginType = getLoginType();
            if (parseInt(loginType) === 2) {
                let noDeliveryCount = 0;
                properties.map(item => {
                    if (item.properties.no_delivery === 1) {
                        noDeliveryCount++;
                    }
                })
                if (noDeliveryCount > 0) {
                    utilsData.properties = properties;
                    utilsData.showBusinessInfo = true;
                    utilsData.showNoDelivery = true;
                    this.setState({
                        showBusinessInfo: true,

                    });
                } else {
                    this.setState({
                        showBusinessInfo: true,
                    });
                }
            } else {
                this.setState({
                    showBusinessInfo: true,
                });
            }


        } else if ((parseInt(property.usuage) === 3 || parseInt(property.usuage) === 1) && property.settlement_type === 'highRise' && property.unit_no) {
            utilsData.selectedProperty = property;
            utilsData.showHighRiseInfo = true;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;
            this.setState({
                showBusinessInfo: true,
            });

        } else {
            return <PropertiesTooltip email={email} id={id}
                property={property} cb={this.removeProperty}
                changeColor={this.changeColor} editMode={utilsData.editMode}
                cbBinding={this.bindingProperty}
                cbSendEmail={this.cbSendEmail}
                cbBusiness={this.cbBusiness}
                user={user}
                cbBusinessInfo={this.cbBusinessInfo}
            />;
        }
    };
    cbSendEmail = (e, property) => {
        const { utilsData } = this.props;
        utilsData.drawFinished = true;
        const data = [];
        data.push({
            properties: property
        });
        utilsData.selectedProperty = data;

        this.setState({
            selectedProperties: data,
        });
    }
    changeColor = async (email) => {
        const { utilsData } = this.props;
        // const { properties } = this.state;
        utilsData.changeColor = true;
        utilsData.emailForChangeColor = email;
        console.log('....setting utilsData.changeColor.....' + email);
        this.setState({
            changeColor: true
        });
    }
    cbBusiness = async (email, property) => {
        const { history } = this.props;
        history.push("/business-profile?id=" + property.id);
    }
    cbBusinessInfo = async (email, property) => {
        const { utilsData } = this.props;
        const { auth } = this.props;
        utilsData.selectedProperty = property;
        utilsData.showBusinessInfo = true;
        utilsData.fncCallback = this.cbBusinessInfoCallBack;

        this.setState({
            showBusinessInfo: true,
        });
    }
    cbBusinessInfoCallBack = () => {
        console.log('...call back function works...');
        this.redrawMap();
    }
    bindingProperty = async (email, property) => {
        const { utilsData } = this.props;
        if (property && property.is_business && (property.is_business === 1 || property.is_business === true)) {
            //show business profile
            utilsData.selectedProperty = property;
            utilsData.showBusinessInfo = true;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;

            this.setState({
                showBusinessInfo: true,
            });
        } else {
            console.log('..binding property..' + JSON.stringify(property));
            utilsData.bindingProperty = true;
            utilsData.emailForChangeColor = email;
            utilsData.selectedProperty = property;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;
            console.log('....setting utilsData.bindingProperty.....' + email);
            this.setState({
                bindingProperty: true
            });
        }
    }
    bindingBusiness = (email) => {

    }
    redrawMap = async () => {
        const { map } = this.context;
        if (map) {
            clearPropertiesFromMap(map);
            clearResidentsFromMap(map);
            clearDistancesFromMap(map);
            map.removeLayer('area');
            map.removeSource('area');
        }

        const draw = new MapboxDraw({
            controls: {
                point: false,
                line_string: false,
                polygon: false,
                trash: false,
                combine_features: false,
                uncombine_features: false,
            },
        });
        const { loadConnected, } = this.props;
        const { value: properties } = await loadConnected();
        const convertedProperties = convertLocation(properties.value);

        try {
            //remove all the markers
            const { pins } = this.state;
            pins.map(pin => {
                const markerTobeRemove = pin.marker;
                markerTobeRemove.remove();
            })

            this.setState({
                properties:
                    convertedProperties.map((p) => ({
                        type: 'Feature',
                        properties: p,
                        geometry: {
                            type: 'Point',
                            coordinates: [
                                p.location.longitude,
                                p.location.latitude,
                            ],
                        },
                    })),

                draw: draw
            });
            map.addSource('area', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: 'area',
                type: 'fill',
                source: 'area',
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });

            const popups = document.getElementsByClassName("mapboxgl-popup");

            if (popups.length) {
                let popupTotal = popups.length;
                for (let i = popupTotal - 1; i >= 0; i--) {
                    console.log('...remove popup box i= ..' + i);
                    try {
                        if (popups[i]) {
                            popups[i].remove();
                        }
                    } catch (e1) {
                        console.log('..remove popup error..');
                    }
                };
            }
            const { auth } = this.props;
            const user = auth.user;

            if (user !== null && user !== undefined) {
                showPropertiesOnMap(map, convertedProperties, this.renderPropertiesTooltip, false,);
                showPrimaryDistancesOnMap(map, convertedProperties, user);
                showHomeAndBusinessOnMap(map, convertedProperties, user);
            } else {
                showPropertiesOnMap(map, convertedProperties, this.renderPropertiesTooltip, false,);

            }

        } catch (e) {

        }
    }

    changeColorCallack = async (callbackResult, color, email) => {
        if (callbackResult) {
            this.redrawMap();
        } else {
            // change color failed
            // find the pin
            // console.log('..this property not added yet, but we still need to update the color');
            const { pins } = this.state;
            const currentPin = pins.filter(item => item.email.split('@')[0] === email.split('@')[0]);
            const othersPin = pins.filter(item => item.email.split('@')[0] !== email.split('@')[0]);
            console.log('..others pin..' + othersPin.length + '..current pin..' + currentPin.length + ' email=' + email + ' color=' + color);
            if (currentPin && currentPin.length > 0) {
                //change the marker
                const { map } = this.context;
                const markerTobeRemove = currentPin[0].marker;
                markerTobeRemove.remove();

                const el = document.createElement('div');
                const width = 48;
                const height = 48;
                el.className = 'marker';
                let imgSrc = 'map-markers/blue_home_pin.png';
                if (color === 'default') imgSrc = '/map-markers/blue_home_pin.png';
                if (color === 'hasInjured') imgSrc = '/map-markers/red_home_pin.png';
                if (color === 'pending') imgSrc = '/map-markers/grey_home_pin.png';
                if (color === 'safe') imgSrc = '/map-markers/green_home_pin.png';
                if (color === 'secondary') imgSrc = '/map-markers/second_home_pin.png';
                console.log('..change color..' + imgSrc);
                el.style.backgroundImage = `url(` + imgSrc + `)`;
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.backgroundSize = '100%';

                const marker = new mapboxgl.Marker(el).setPopup(
                    new mapboxgl.Popup({
                        closeOnClick: true,
                        closeButton: true,
                        maxWidth: 'none',
                    }).setHTML('<h1>No address</h1>'),
                );
                marker.setLngLat([currentPin[0].geocodeData.longitude, currentPin[0].geocodeData.latitude]);
                marker.addTo(map);

                const element = document.createElement('div');
                ReactDOM.render(
                    <div className={'info-window'}>
                        <h4>{email}</h4>
                        <Row className="justify-content-end ">
                            <Col className="list-unstyled text-right">

                                <li>
                                    <Button
                                        size={'sm'}
                                        onClick={() => this.bindingProperty(email)}>
                                        Info
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                                    {/* <Button
                                        size={'sm'}
                                        onClick={() => this.changeColor(email)}>
                                        Color
                                    </Button> */}
                                    {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                                    <Button
                                        size={'sm'}
                                        onClick={() => this.addAddress(3)}>
                                        Add
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                                    <Button
                                        size={'sm'}
                                        onClick={() => this.removeAddress(email)}>
                                        Remove
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                                </li>
                            </Col>
                        </Row>
                    </div>,
                    element,
                );

                marker.getPopup().setDOMContent(element);// setHTML(html);

                this.setState((state) => {
                    return {
                        ...state,
                        pins: [
                            ...othersPin,
                            {
                                marker,
                                email: currentPin[0].email,
                                geocodeData: currentPin[0].geocodeData,
                                color: color
                            },
                        ],
                    };
                });
            }
        }
    }
    removeProperty = async (email, primaryAddress) => {
        console.log('..remove this property..' + email);
        const prePart = email.split('@')[0];
        const { properties } = this.state;
        let tobeRemain = properties.filter(property => property.properties.email.split('@')[0] !== prePart);
        let tobeDelete = properties.filter(property => property.properties.email.split('@')[0] === prePart);
        if (primaryAddress) {
            const { history } = this.props;
            history.push("/edit-property");
            return;
        }
        // console.log('..to be remove..' + JSON.stringify(tobeDelete));
        //clear everything, then reload
        const { deleteUserAdditionalAddressById } = this.props;
        const { utilsData } = this.props;

        if (tobeDelete && tobeDelete.length > 0) {
            const resp = await deleteUserAdditionalAddressById(tobeDelete[0].properties.id);
            //need to change total connected count
            // console.log('.. property to be deleted, color is: ' + tobeDelete[0].properties.color);
            if (tobeDelete[0].properties.color !== "grey") {
                // console.log('....should change total connected...');
                // const emitter = mitt();
                // emitter.emit('onTotalConnectChange', { totalConnected: -1 })
                EventBus.$dispatch('onTotalConnectChange', { totalConnected: -1 });
                // console.log('....emitter event onTotalConnectChange ...');
            }
        }
        const { map } = this.context;


        try {

            const popups = document.getElementsByClassName("mapboxgl-popup");


            if (popups.length) {
                let popupTotal = popups.length;
                for (let i = popupTotal - 1; i >= 0; i--) {
                    console.log('...remove popup box i= ..' + i);
                    try {
                        if (popups[i]) {
                            popups[i].remove();
                        }
                    } catch (e1) {
                        console.log('..remove popup error..');
                    }
                };
            }
            // const {pins} = this.state;

            // const currentPin =  pins.filter(item => item.email ===  email);
            // if(currentPin && currentPin.length >0){
            //     if (currentPin[0].marker.getPopup().isOpen()) {
            //         currentPin[0].marker.togglePopup();
            //       }
            // }


            // console.log('...remove map...');
            if (map) {
                clearPropertiesFromMap(map);
                clearResidentsFromMap(map);
                clearDistancesFromMap(map);
                // removeAllImages(map);
            }
            this.setState({
                properties: tobeRemain
            });
            // console.log('...redraw the map after remove property...');
            const properties = convertGeoProperty(tobeRemain);
            const { auth } = this.props;
            const user = auth.user;
            showPropertiesOnMap(map, properties, this.renderPropertiesTooltip, false,);

            showPrimaryDistancesOnMap(map, properties, user);
            showHomeAndBusinessOnMap(map, properties, user);
        } catch (e) {

            console.log('...remove property error...' + JSON.stringify(e));
        }
    }

    async initializeLayers() {
        const { map } = this.context;
        const { loadConnected, loadBusinessAddress, getAddressByType, checkBusinessProfile } = this.props;
        const draw = new MapboxDraw({
            controls: {
                point: false,
                line_string: false,
                polygon: false,
                trash: false,
                combine_features: false,
                uncombine_features: false,
            },
        });
        const { auth } = this.props;
        const user = auth.user;
        let convertedProperties = [];
        let loginHints = '';

        if (user === null || user === undefined) {
            const { value: properties } = await loadBusinessAddress();

            convertedProperties = convertLocation(properties.propertyInfo);
        } else {
            const { value: properties } = await loadConnected();
            convertedProperties = convertLocation(properties.value);
            const loginType = getLoginType();
            const { value: property } = await getAddressByType(loginType);
            // console.log('.. property by type..' + JSON.stringify(property));

            if (property.value && property.value.length > 0) {
                //already has business Or Home Address
                // loginHints = 'Please login to access account';
            } else {
                this.setState({
                    has2Address: false,
                });
                // loginHints = 'Please login to access account and complete registration';
                // const usuage = parseInt(loginType) === 1 ? ' Home Address' : ' Business Address';
                let msg = 'Please switch to Edit Mode and add your Business Address';
                if (parseInt(loginType) === 1) {
                    msg = 'Please enter and register home address';
                }
                toastr.info('Tips', msg);
            }
            if (parseInt(loginType) === 2) {
                const { value: hasBusinessProfile } = await checkBusinessProfile();
                console.log('..hasBusinessProfile..' + JSON.stringify(hasBusinessProfile));
                if (parseInt(hasBusinessProfile.value[0].profileTotal) === 0) {
                    toastr.info('Tips', "Please setup your business profile!");
                    if (property.value && property.value.length > 0) {
                        location.href = '/business-profile?id=' + property.value[0].id
                    } else {
                        console.log('..me is ..' + JSON.stringify(user));
                    }
                }
            }

        }

        // console.log('..load business.. ' + JSON.stringify(convertedProperties));
        try {
            this.setState({
                properties:
                    convertedProperties.map((p) => ({
                        type: 'Feature',
                        properties: p,
                        geometry: {
                            type: 'Point',
                            coordinates: [
                                p.location.longitude,
                                p.location.latitude,
                            ],
                        },
                    })),

                draw: draw
            });
            map.addSource('area', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: 'area',
                type: 'fill',
                source: 'area',
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });

            if (user === null || user === undefined) {
                showPropertiesOnMap(map, convertedProperties, this.renderPropertiesTooltip, true,);
            } else {
                showPropertiesOnMap(map, convertedProperties, this.renderPropertiesTooltip, true,);
                showPrimaryDistancesOnMap(map, convertedProperties, user);
                showHomeAndBusinessOnMap(map, convertedProperties, user);
            }
            // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            const showLoginTips = localStorage.getItem('show_login_tips');
            if (showLoginTips && parseInt(showLoginTips) === 1) {
                localStorage.removeItem('show_login_tips');

                toastr.info('Tips', 'Please login to access account');
            }
            if (showLoginTips && parseInt(showLoginTips) === 2) {
                localStorage.removeItem('show_login_tips');

                toastr.info('Tips', 'Please login to access account and complete registration');
            }


        } catch (e) {
            console.log('init map layer error:' + JSON.stringify(e));
        }
        // map.on('click', this.onClickMap);
    }

    onClickMap = (e) => {
        const { lng: longitude, lat: latitude } = e.lngLat;
        // console.log('..map..on click..' + longitude);
        const { utilsData, auth } = this.props;
        const user = auth.user;
        if (utilsData.editMode) {
            console.log('..in edit mode..');
            this.createMarker({ latitude, longitude });
        } else {
            if (user === null || user == undefined) {
                //user logout Or not register
                this.createMarker({ latitude, longitude });
            } else {
                console.log('.. editMode turn off..');
            }
        }
    };



    createMarker = async ({ latitude, longitude }) => {
        // const {domain} = this.state;
        const { map } = this.context;
        const loginType = getLoginType();
        const { has2Address } = this.state;

        let addText = 'Add';
        let usuage = 3;
        if (!has2Address) {
            if (parseInt(loginType) === 1) {
                addText = 'Add Home Address'
                usuage = 1;
            } else {
                addText = 'Add Business Address'
                usuage = 2;
            }

        }
        const el = document.createElement('div');
        const width = 48;
        const height = 48;
        el.className = 'marker';
        el.style.backgroundImage = `url(https://klosertoyou.com/map-markers/blue_home_pin.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        const marker = new mapboxgl.Marker(el).setPopup(
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

        const geocodeData = await reverseGeocodePoint({ longitude, latitude });

        let domain = localStorage.getItem('current_domain');
        if (domain === undefined || domain === null) {
            domain = 'alphc.com'
        }
        const email = generateEmail(geocodeData) + '@' + domain;
        this.setState({
            selectedAddress: geocodeData,
            email: email
        });
        const { auth } = this.props;


        const element = document.createElement('div');

        if (auth.user !== null && auth.user !== undefined) {
            //这里需要区分
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">

                            <li>
                                {/* <Button
                                    size={'sm'}
                                    onClick={() => this.addUnitNumber(email)}>
                                    Add Unit #
                                </Button>
                                &nbsp;&nbsp;&nbsp;&nbsp; */}
                                <Button
                                    size={'sm'}
                                    onClick={() => this.addAddress(usuage)}>
                                    {addText}
                                </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                                <Button
                                    size={'sm'}
                                    onClick={() => this.removeAddress(email)}>
                                    Remove
                                </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        } else {
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => this.activateAddress()}>
                                    Activate this address
                                </Button>
                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        }

        marker.getPopup().setDOMContent(element);// setHTML(html);
        marker.togglePopup();


        const { pins } = this.state;
        // console.log('..pins..' + JSON.stringify(pins));


        if (auth.user !== null && auth.user !== undefined) {
            pins.forEach((p) => {
                // console.log('..pins..' + JSON.stringify(p));
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
                            geocodeData,
                            color: 'default'
                        },
                    ],
                };
            });
        } else {
            pins.forEach((p) => {
                // console.log('..pins..' + JSON.stringify(p));
                if (p.marker.getPopup().isOpen()) {
                    p.marker.togglePopup();
                }
                const marker = p.marker;
                marker.remove();
            });
            this.setState((state) => {
                return {
                    ...state,
                    pins: [
                        {
                            marker,
                            email,
                            geocodeData,
                        },
                    ],
                };
            });
        }
    };

    removeAddress = (emailIn) => {
        const { pins } = this.state;
        const tobeRemove = pins.filter((p) => p.email === emailIn);
        const marker = tobeRemove[0].marker;
        marker.remove();
        const data = pins.filter((p) => p.email !== emailIn);
        this.setState((state) => {
            return {
                ...state,
                pins: data,
            };
        });
        //check wheter exist
        const { layerAdded } = this.state;
        // console.log('..layerAdded..' + JSON.stringify(layerAdded) + " ..emailIn.." + emailIn);
        let tobeDelete = layerAdded.filter(layer => layer.email === emailIn);
        const { map } = this.context;
        if (tobeDelete && tobeDelete.length > 0) {
            // console.log('..tobeDelete..' + JSON.stringify(tobeDelete));
            clearLayer(map, tobeDelete[0].layerId);
        }

    }
    addUnitNumber = (email) => {
        const unitNumber = prompt("Please enter unit number", "");
        if (unitNumber) {
            //change property address
            const { selectedAddress, properties, pins, } = this.state;
            const currentPin = pins.filter(item => item.email === email);
            console.log('..selectedAddress..' + JSON.stringify(selectedAddress));
            selectedAddress.unitNo = unitNumber;
            const emailDisplay = generateEmail(selectedAddress);
            console.log('..emailDisplay..' + emailDisplay);
            selectedAddress.email = emailDisplay;
            currentPin[0].email = emailDisplay;
            this.setState({
                selectedAddress: selectedAddress,
                pins: pins
            });


        }
    }
    addAddress = (usuage) => {
        const { selectedAddress, email, properties, pins, layerAdded, has2Address } = this.state;
        const { map } = this.context;
        const { utilsData } = this.props;
        const loginType = getLoginType();
        const currentPin = pins.filter(item => item.email === email);
        const postData = {
            item: {
                email: email,
                usuage: usuage,
                ...selectedAddress,
                color: has2Address ? 'grey' : parseInt(loginType) === 1 ? 'default' : 'red' //consumer is pending
            }
        }
        const data = {
            type: 'Feature',
            properties: {
                email: email,
                ...selectedAddress,
                color: currentPin[0].color
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    selectedAddress.location.longitude,
                    selectedAddress.location.latitude,
                ],
            },
        }
        const { saveBatchProperties, getMe } = this.props;
        properties.push(data);
        saveBatchProperties(postData).then(async (resp) => {
            // console.log('..saveBatchProperties..' + JSON.stringify(resp));
            //remove the popup and show line

            // console.log('..pins..' + JSON.stringify(pins));

            //  pins.forEach((p) => {
            //      // console.log('..pins..' + JSON.stringify(p));
            //      if (p.marker.getPopup().isOpen()) {
            //          p.marker.togglePopup();
            //      }
            //  });

            //  console.log('... current pin ..'  +  currentPin.length );
            if (currentPin) {
                //rebind
                const element = document.createElement('div');

                ReactDOM.render(
                    <div className={'info-window'}>
                        <h4>{email}</h4>
                        <Row className="justify-content-end ">
                            <Col className="list-unstyled text-right">

                                <li>
                                    <Button
                                        size={'sm'}
                                        onClick={() => this.bindingProperty(email)}>
                                        Info
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {/* <Button
                                        size={'sm'}
                                        onClick={() => this.changeColor(email)}>
                                        Color
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp; */}

                                    <Button
                                        size={'sm'}
                                        onClick={() => this.removeAddress(email)}>
                                        Remove
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                                </li>
                            </Col>
                        </Row>
                    </div>,
                    element,
                );
                currentPin[0].marker.getPopup().setDOMContent(element);
                if (currentPin[0].marker.getPopup().isOpen()) {
                    currentPin[0].marker.togglePopup();
                }
            }

            //  this.redrawMap();
            //get primery address
            const primaryAddress = properties.filter(property => property.properties.primaryAddress === true);


            const residentsWithLocation = [];
            residentsWithLocation.push(selectedAddress);
            const randomString = generateString(10);

            const newItem = {
                email: email,
                layerId: randomString
            };
            layerAdded.push(newItem);
            this.setState({
                layerAdded: layerAdded,
                properties: properties
            });
            if (primaryAddress && primaryAddress.length > 0) {
                showLineLayer(
                    map,
                    MapMarkerUrls.user.injured,
                    randomString,
                    residentsWithLocation,
                    (i) => [
                        [primaryAddress[0].properties.location.longitude, primaryAddress[0].properties.location.latitude],
                        [i.location.longitude, i.location.latitude],
                    ],
                );
            }


            console.log('..binding property..' + JSON.stringify(selectedAddress));
            utilsData.bindingProperty = true;
            utilsData.emailForChangeColor = email;
            utilsData.selectedProperty = selectedAddress;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;
            // console.log('....setting utilsData.bindingProperty.....' + email);
            if (has2Address) {
                this.setState({
                    bindingProperty: true
                });
            } else {
                // get me and reload to refresh data
                getMe(loginType).then(resp => {
                    location.reload()
                }).catch(error => {
                    toastr.error('Error', "Get information error!");
                });


            }

        });

    }
    activateAddress = () => {
        const { setPropertyRegistrationForm, registerForm } = this.props;
        const { selectedAddress } = this.state;
        //  = address;
        console.log('..selectedAddress..' + JSON.stringify(selectedAddress));
        let that = this;
        registerForm.address = selectedAddress;
        setPropertyRegistrationForm({
            address: selectedAddress,
            active: true,
        });
        this.setState({
            // active: true,
            address: selectedAddress
        });
        // dispatch(
        //     setPropertyRegistrationForm({
        //         // address: data,
        //         active: true,
        //         // rural: Object.values(data).some((value) => !value),
        //     }),
        // );
    };
    onDragMarker = async (event) => {
        const { pins } = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        const { lng: longitude, lat: latitude } = event.target.getLngLat();

        const geocodeData = await reverseGeocodePoint({ longitude, latitude });
        let domain = localStorage.getItem('current_domain');
        if (domain === undefined || domain === null) {
            domain = 'alphc.com'
        }
        const email = generateEmail(geocodeData) + '@' + domain;
        this.setState({
            selectedAddress: geocodeData,
            email: email
        });

        const index = pins.map((p) => p.marker === event.target).indexOf(true);

        const marker = pins[index].marker;
        const { auth } = this.props;

        const element = document.createElement('div');

        if (auth.user !== null && auth.user !== undefined) {
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}@alphc.com</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => this.removeAddress(email)}>
                                    Remove
                                </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    size={'sm'}
                                    onClick={() => this.addAddress(3)}>
                                    Add
                                </Button>
                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        } else {
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}@alphc.com</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => this.activateAddress()}>
                                    Activate this address
                                </Button>
                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        }

        marker.getPopup().setDOMContent(element);
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
    onSubmitSearch = (e) => {
        e.preventDefault();

        const { searchText } = this.state;

        if (!searchText.trim()) return;
        geocodeAddress({ address: searchText }).then((data) => {
            const { map } = this.context;

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
    onChangeSearchText = (e) => {
        this.setState({
            searchText: e.currentTarget.value,
        });
    };
    toggleSatelliteMode = (e) => {
        const { satelliteMode } = this.state;
        const { map } = this.context;
        if (!satelliteMode) {
            map.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
        } else {
            map.setStyle('mapbox://styles/mapbox/streets-v12');
        }
        this.setState({
            satelliteMode: !satelliteMode,
        });
        this.redrawMap();
    }
    toggleDrawing = (e) => {
        const { drawing, draw, selectedProperties, feature, properties } = this.state;
        console.log('...toggleDrawing...');
        const { map } = this.context;
        const { utilsData } = this.props;
        utilsData.drawing = !drawing;
        if (!drawing) {
            try {
                map.addControl(draw, 'top-left');
                draw.changeMode(draw.modes.DRAW_POLYGON);

                map.getSource('area').setData({
                    type: 'FeatureCollection',
                    features: [],
                });
                this.setState({
                    drawing: !drawing,
                    selectedProperties: [],
                    feature: null,
                    selectedPropertyEmail: []
                });
            } catch (e) {

            }
        } else {
            const featureCollection = draw.getAll();
            try {
                map.getSource('area').setData(featureCollection);
            } catch (e) {

            }

            const data = properties.filter((p) =>
                booleanPointInPolygon(p, featureCollection.features[0]),
            );
            let selected = [];
            selectedProperties.map(property => {
                let columnJson = {
                    "Email": property.properties.email
                }
                selected.push(columnJson)
            });
            console.log(' end drawing 1=' + JSON.stringify(data) + ' 2=' + JSON.stringify(selected));

            // const { properties } = this.state;
            utilsData.drawFinished = true;

            utilsData.selectedProperty = data;
            utilsData.fncCallback = this.cbBusinessInfoCallBack;
            this.setState({
                drawing: !drawing,
                selectedProperties: data,
                selectedPropertyEmail: selected,
                feature: featureCollection.features[0]
            });
            map.removeControl(draw);
        }

    }
    toggleShowMapLegend = (e) => {
        const { showMapLegend } = this.state;
        this.setState({
            showMapLegend: !showMapLegend,
        });
    }
    PropertyMarkerDescriptions = [
        {
            marker: MapMarkerUrls.property.default,
            description: 'Add your Address Makers based on need and requirements',
        },
        {
            marker: MapMarkerUrls.property.hasInjured,
            description:
                'Add your Address Makers based on need and requirements',
        },
        {
            marker: MapMarkerUrls.property.pending,
            description:
                'Add your Address Makers based on need and requirements',
        },
        {
            marker: MapMarkerUrls.property.safe,
            description:
                'Add your Address Makers based on need and requirements',
        },
    ];
    render() {
        const { pins, searchText, drawing, satelliteMode, showMapLegend, has2Address, } = this.state;
        const { utilsData, active, editMode, auth } = this.props;

        const user = auth.user;
        let showIcon = true;
        const loginType = getLoginType();
        if (user === null || user === undefined) showIcon = false;
        if (utilsData.editMode) showIcon = false;
        if (utilsData.changeColor) showIcon = false;
        if (utilsData.bindingProperty) showIcon = false;
        if (utilsData.drawFinished) showIcon = false;
        if (utilsData.showBusinessInfo) showIcon = false;
        if (utilsData.connectToMerchantId > 0) showIcon = false;
        if (showMapLegend) showIcon = false;
        if (parseInt(loginType) === 1) showIcon = false;
        let mapDisabled = false;
        if (!utilsData.editMode && user !== null && user !== undefined) {
            if (parseInt(loginType) === 1 && !has2Address) {
                // mapDisabled = true;
            } else {
                mapDisabled = true;
            }
        }

        return <>
            <div className={'showcase-map-top-actions'}>
                <div className={'search-actions'}>
                    {user !== null && user !== undefined && parseInt(loginType) === 1 && has2Address ? null : <Form onSubmit={this.onSubmitSearch}>
                        <Input
                            bsSize={'lg'}
                            disabled={mapDisabled}
                            className=""
                            value={searchText}
                            onChange={this.onChangeSearchText}
                            placeholder={'Search...'}
                        />
                    </Form>}
                </div>
            </div>

            {!showIcon ? null : satelliteMode ? null :
                drawing ?
                    (

                        <i title='End Drawing' onClick={(e) => this.toggleDrawing(e)} className="draw-button fa-2x fa-solid fa-arrow-pointer"></i>

                    ) : (


                        <i title='Pan, Draw, Connect, Addresses boundary and identify area to Send Email' onClick={(e) => this.toggleDrawing(e)} className="draw-button fa-2x fa-solid fa-draw-polygon"></i>


                    )
            }
            {
                !showIcon ? null : satelliteMode ?
                    (
                        <i onClick={(e) => this.toggleSatelliteMode(e)} className="satellite-button red-color fa-2x fa-solid fa-globe"></i>
                    ) :
                    (
                        <i onClick={(e) => this.toggleSatelliteMode(e)} className="satellite-button fa-2x fa-solid fa-satellite"></i>
                    )


            }


            {!showIcon ? null : !showMapLegend && (
                <>

                    <i
                        className="mapLegend-button  close-button fa-3x fa fa-question"
                        onClick={(e) => this.toggleShowMapLegend(e)}
                    />

                </>
            )}
            {showMapLegend && (
                <div className="map-legend_content">
                    <i
                        className="mapLegend-button-close  fa fa-3x fa-close"
                        onClick={(e) => this.toggleShowMapLegend(e)}
                    />

                    <b>Address Markers</b>

                    <table>
                        <tr><td > Business </td>
                            <td>
                                <img
                                    alt={this.PropertyMarkerDescriptions[1].description}
                                    src={this.PropertyMarkerDescriptions[1].marker}
                                    height={20}
                                /> &nbsp;&nbsp;
                            </td>
                            <td > Connected Customer </td>
                            <td>
                                <img
                                    alt={this.PropertyMarkerDescriptions[0].description}
                                    src={this.PropertyMarkerDescriptions[0].marker}
                                    height={20}
                                /> &nbsp;&nbsp;
                            </td>
                            <td > Unactivated </td>
                            <td>
                                <img
                                    alt={this.PropertyMarkerDescriptions[2].description}
                                    src={this.PropertyMarkerDescriptions[2].marker}
                                    height={20}
                                /> &nbsp;&nbsp;
                            </td>
                        </tr>
                        {/* <tr>
                        {this.PropertyMarkerDescriptions.map(
                            ({ marker, description }) => (

                                <td>
                                    <img
                                        alt={description}
                                        src={marker}
                                        height={40}
                                    /> &nbsp;&nbsp;
                                </td>


                            ),
                        )}
                    </tr>
                    <tr><td colSpan={this.PropertyMarkerDescriptions.length}><hr />{this.PropertyMarkerDescriptions[0].description}<hr /></td></tr> */}
                    </table>
                    <hr />
                    <table>
                        <tr>
                            <td>
                                <img
                                    alt='Manually add clients'
                                    src={MapMarkerUrls.extra.edit_mode}
                                    height={30}
                                /> &nbsp;&nbsp;
                            </td>
                            <td>Manually Add Clients</td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    alt='Connect with Clients'
                                    src={MapMarkerUrls.extra.connect_mode}
                                    height={30}
                                /> &nbsp;&nbsp;
                            </td>
                            <td>Connect with Clients</td>
                        </tr>
                    </table>

                    <hr />
                    <b>Tools Bar</b>
                    <table>
                        <tr><td><i className="fa-2x fa-solid fa-draw-polygon"></i></td><td>Pan, Draw, Connect, Addresses boundary and identify area to Send Email<hr /></td></tr>
                        <tr><td><i className="fa-2x fa-solid fa-arrow-pointer"></i></td><td>Send Email to identified Opt-in Addresses<hr /></td></tr>
                        <tr><td><i className="fa-2x fa-solid fa-satellite"></i></td><td>Satellite Mode<hr /></td></tr>
                        <tr><td><i className="fa-2x fa-solid fa-globe"></i></td><td>Map Mode</td></tr>
                    </table>



                </div>
            )}

            <Map />
            {active && <PropertyForm />}
            {utilsData.changeColor && <ChangeColorForm callback={this.changeColorCallack} />}
            {utilsData.bindingProperty && <BindingForm />}
            {utilsData.drawFinished && <FlyerForm />}
            {utilsData.showBusinessInfo && <BusinessInfo />}
            {utilsData.connectToMerchantId > 0 && <PropertyForm />}
            {utilsData.showHighRiseInfo && <ShowHighRiseInfo />}
            {utilsData.showNoDelivery && <ShowNoDelivery />}
            {utilsData.showPreference && <PreferenceForm />}
            {utilsData.showFlyerUpload && <UploadFlyerForm />}
            {utilsData.showImportCustomer && <ImportCustomeForm />}

        </>

            ;
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    registerForm: state.registerForm,
    active: state.registerForm.active,
    utilsData: state.utilsData,
    editMode: state.utilsData.editMode
});

const mapDispatchToProps = (dispatch) => ({
    getAddressByType: (data) =>
        dispatch(getAddressByType(data)),
    loadBusinessAddress: () =>
        dispatch(loadBusinessAddress()),
    loadConnected: (data) =>
        dispatch(loadConnected(data)),
    fetchUsers: () => dispatch(fetchUsers({ page: 1, pageSize: 100000 })),
    setPropertyRegistrationForm: (data) => dispatch(setPropertyRegistrationForm(data)),
    saveBatchProperties: (data) => dispatch(saveBatchProperties(data)),
    deleteUserAdditionalAddressById: (propertyId) => dispatch(deleteUserAdditionalAddressById(propertyId)),
    checkBusinessProfile: () => dispatch(checkBusinessProfile()),
    getMe: (loginType) => dispatch(getMe(loginType)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Showcase));
