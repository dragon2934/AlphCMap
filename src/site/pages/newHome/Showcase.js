import mapboxgl from 'mapbox-gl';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchProperties,
    fetchUsers,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearDistancesFromMap,
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showPrimaryDistancesOnMap,
    showPropertiesOnMap,
    showLineLayer,
} from '../../../utils/mapUtils';
import { generateString } from '../../../utils/utils';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';
import PropertiesTooltip from '../../../admin/components/PropertiesTooltip';
import PropertyForm from '../property/PropertyForm';
import {Button, Col, Form, Input, Row} from 'reactstrap';
import ReactDOM from 'react-dom';
import {setPropertyRegistrationForm} from '../../../redux/actionCreators/registrationActionCreators';

import { saveBatchProperties } from '../../../redux/actionCreators/appActionCreators';

import {
    MapMarkerUrls,
} from '../../../constants';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

class Showcase extends Component {
    static contextType = MapContext;

    state = {
        pins: [],
        mapInitialized: false,
        searchText: '',
        active: false,
        selectedAddress: null,
        email:'',
        properties:[]
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {map} = this.context;
        const {mapInitialized} = this.state;
        if (!mapInitialized && map) {
            this.initializeLayers();

            this.setState({
                mapInitialized: true,
            });
        }
    }

    componentWillUnmount() {
        const {map} = this.context;
        if (map) {
            clearPropertiesFromMap(map);
            clearResidentsFromMap(map);
            clearDistancesFromMap(map);
        }
    }

    // renderResidentsTooltip = ({id, email}) => {
    //     const {history} = this.props;

    //     return <ResidentTooltip email={email} id={id} history={history} />;
    // };

    renderPropertiesTooltip = ({id, email}) => {
        const {history} = this.props;

        return <PropertiesTooltip email={email} id={id} history={history} />;
    };

    async initializeLayers() {
        const {map} = this.context;
        const {fetchProperties, } = this.props;

        const {value: properties} = await fetchProperties();
       

        try{
            this.setState({
                properties: properties
            });
            // console.log('..properties..' + JSON.stringify(properties));
            showPropertiesOnMap(map, properties, this.renderPropertiesTooltip);
            // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            showPrimaryDistancesOnMap(map, properties);
        }catch(e){

        }
        map.on('click', this.onClickMap);
    }

    onClickMap = (e) => {
        const {lng: longitude, lat: latitude} = e.lngLat;
        // console.log('..map..on click..' + longitude);

        this.createMarker({latitude, longitude});
    };

    createMarker = async ({latitude, longitude}) => {
        // const {domain} = this.state;
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

        let domain = localStorage.getItem('current_domain');
        if(domain === undefined || domain === null){
            domain = 'alphc.com'
        }
        const email = generateEmail(geocodeData);
        this.setState({
            selectedAddress: geocodeData,
            email: email
        });
        const { auth } = this.props;

        
        const element = document.createElement('div');

        if(auth.user !== null && auth.user !== undefined){
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}@alphc.com</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => this.addAddress()}>
                                    Add
                                </Button>
                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        }else{
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

        marker.getPopup().setDOMContent(element);// setHTML(html);
        marker.togglePopup();

        const {pins} = this.state;
        // console.log('..pins..' + JSON.stringify(pins));

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
                        marker
                    },
                ],
            };
        });
    };

    addAddress = () => {
        const { selectedAddress, email, properties } = this.state;
        const {map} = this.context;
        const data = {
            item:{ 
                email:email,
                ...selectedAddress
            }
        }
        const { saveBatchProperties } = this.props;
        saveBatchProperties(data).then( async(resp) => {
             console.log('..saveBatchProperties..' + JSON.stringify(resp));
             //remove the popup and show line
             const {pins} = this.state;
             // console.log('..pins..' + JSON.stringify(pins));
     
             pins.forEach((p) => {
                 // console.log('..pins..' + JSON.stringify(p));
                 if (p.marker.getPopup().isOpen()) {
                     p.marker.togglePopup();
                 }
             });
             //get primery address
             const primaryAddress = properties.filter( property => property.primaryAddress === true);

             const residentsWithLocation =[];
             residentsWithLocation.push(selectedAddress);
             const randomString = generateString(10);
             showLineLayer(
                map,
                MapMarkerUrls.user.injured,
                randomString,
                residentsWithLocation,
                (i) => [
                    [primaryAddress[0].location.longitude, primaryAddress[0].location.latitude],
                    [i.location.longitude, i.location.latitude],
                ],
            );
             //draw a line between primay and this address
            //  const {fetchProperties, } = this.props;

            //  const {value: properties} = await fetchProperties();
            
     
            //  try{
            //      showPropertiesOnMap(map, properties, this.renderPropertiesTooltip);
            //      // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            //      showPrimaryDistancesOnMap(map, properties);
            //  }catch(e){
     
            //  }
        });

    }
    activateAddress = () => {
        const { setPropertyRegistrationForm,registerForm } = this.props;
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
            active: true,
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
        const {pins } = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        const {lng: longitude, lat: latitude} = event.target.getLngLat();

        const geocodeData = await reverseGeocodePoint({longitude, latitude});

        const email = generateEmail(geocodeData);
        this.setState({
            selectedAddress: geocodeData,
            email: email
        });

        const index = pins.map((p) => p.marker === event.target).indexOf(true);

        const marker = pins[index].marker;
        const { auth } = this.props;
        
        const element = document.createElement('div');

        if(auth.user !== null && auth.user !== undefined){
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}@alphc.com</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => this.addAddress()}>
                                    Add
                                </Button>
                            </li>
                        </Col>
                    </Row>
                </div>,
                element,
            );
        }else{
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
    onChangeSearchText = (e) => {
        this.setState({
            searchText: e.currentTarget.value,
        });
    };
    render() {
        const {pins, active, searchText} = this.state;
        return <>
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
                    {active && <PropertyForm />}
        </>
                
        ;
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    registerForm: state.registerForm
});

const mapDispatchToProps = (dispatch) => ({
    fetchProperties: () =>
        dispatch(fetchProperties({page: 1, pageSize: 100000})),
    fetchUsers: () => dispatch(fetchUsers({page: 1, pageSize: 100000})),
    setPropertyRegistrationForm: (data) => dispatch(setPropertyRegistrationForm(data)),
    saveBatchProperties: (data)  => dispatch(saveBatchProperties(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Showcase));
