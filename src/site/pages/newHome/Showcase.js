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
import {Button, Col, Form, Input, Row} from 'reactstrap';
import ReactDOM from 'react-dom';
import {setPropertyRegistrationForm} from '../../../redux/actionCreators/registrationActionCreators';

import { saveBatchProperties, deleteUserAdditionalAddressById } from '../../../redux/actionCreators/appActionCreators';

import {
    MapMarkerUrls,
} from '../../../constants';
import ChangeColorForm from './ChangeColorForm';
import BindingForm from './BindingForm';
// import {useHistory} from 'react-router';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

class Showcase extends Component {
    static contextType = MapContext;

    state = {
        pins: [],
        mapInitialized: false,
        searchText: '',
        // active: false,
        selectedAddress: null,
        email:'',
        properties:[],
        changeColor: false,
        layerAdded:[]
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

    renderPropertiesTooltip = ({id, email,property}) => {
        const { utilsData } = this.props;
        return <PropertiesTooltip email={email} id={id} 
        property ={property} cb={this.removeProperty} 
        changeColor={this.changeColor} editMode={utilsData.editMode} 
        cbBinding = {this.bindingProperty}
        />;
    };
    changeColor = async (email) =>{
        const { utilsData } = this.props;
        // const { properties } = this.state;
        utilsData.changeColor = true;
        utilsData.emailForChangeColor =  email;
        console.log('....setting utilsData.changeColor.....' + email);
        this.setState({
            changeColor: true
        });
    }
    bindingProperty = async(email,property) =>{
        const { utilsData } = this.props;
        // const { properties } = this.state;
        utilsData.bindingProperty = true;
        utilsData.emailForChangeColor =  email;
        utilsData.selectedProperty = property;
        console.log('....setting utilsData.bindingProperty.....' + email);
        this.setState({
            bindingProperty: true
        });
    }
    redrawMap = async() => {
        const {map} = this.context;
        if (map) {
            clearPropertiesFromMap(map);
            clearResidentsFromMap(map);
            clearDistancesFromMap(map);
        }

        const {fetchProperties, } = this.props;
        const {value: properties} = await fetchProperties();
    

        try{
            //remove all the markers
            const { pins } = this.state;
            pins.map(pin =>{
                const markerTobeRemove = pin.marker;
                markerTobeRemove.remove();
            })
            
            const popups = document.getElementsByClassName("mapboxgl-popup");
            console.log('...remove popup box...popups.length ..' + popups.length);
            if (popups.length) {
                let popupTotal = popups.length;
                for(let i=0; i < popupTotal;i++){
                    console.log('...remove popup box i= ..' + i);
                    try{
                        if(popups[i]){
                            popups[i].remove();
                        }
                    }catch(e1){
                        console.log('..remove popup error..');
                    }
                };
            }
            console.log('...redraw....properties..' + JSON.stringify(properties));
            // console.log('..properties..' + JSON.stringify(properties));
            showPropertiesOnMap(map, properties, this.renderPropertiesTooltip,false);
            // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            showPrimaryDistancesOnMap(map, properties);
        }catch(e){

        }
    }

    changeColorCallack = async( callbackResult, color, email) => {
        if(callbackResult){
           this.redrawMap();
        }else{
            // change color failed
            // find the pin
            // console.log('..this property not added yet, but we still need to update the color');
             const { pins } = this.state;
             const currentPin = pins.filter(item => item.email.split('@')[0] === email.split('@')[0]);
             const othersPin = pins.filter(item => item.email.split('@')[0] !== email.split('@')[0]);
             console.log('..others pin..' + othersPin.length + '..current pin..' + currentPin.length + ' email=' + email + ' color=' + color);
             if(currentPin && currentPin.length >0 ){
                //change the marker
                const {map} = this.context;
                const markerTobeRemove = currentPin[0].marker;
                markerTobeRemove.remove();

                const el = document.createElement('div');
                const width = 48;
                const height = 48;
                el.className = 'marker';
                let imgSrc = 'map-markers/blue_home_pin.png';
                if(color  === 'default') imgSrc = '/map-markers/blue_home_pin.png';
                if(color  === 'hasInjured') imgSrc = '/map-markers/red_home_pin.png';
                if(color  === 'pending') imgSrc = '/map-markers/grey_home_pin.png';
                if(color  === 'safe') imgSrc = '/map-markers/green_home_pin.png';
                if(color  === 'secondary') imgSrc = '/map-markers/second_home_pin.png';
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
                                    <Button
                    size={'sm'}
                    onClick={() => this.changeColor(email)}>
                    Color
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                 <Button
                    size={'sm'}
                    onClick={() => this.addAddress()}>
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
    removeProperty = async (email,primaryAddress) =>  {
        console.log('..remove this property..' + email);
        const prePart = email.split('@')[0];
        const { properties } = this.state;
         let tobeRemain = properties.filter( property => property.email.split('@')[0] !== prePart);
         let tobeDelete = properties.filter( property => property.email.split('@')[0] === prePart);
         if(primaryAddress){
            const { history } = this.props;
            history.push("/edit-property");
            return;
         }
         console.log('..to be remove..' + JSON.stringify(tobeDelete));
        //clear everything, then reload
        const { deleteUserAdditionalAddressById } = this.props;

        if(tobeDelete &&  tobeDelete.length >0){
            const resp = await deleteUserAdditionalAddressById(tobeDelete[0].id);
        }
        const {map} = this.context;


        // const {value: properties} = await fetchProperties();
       

        try{
            
            const popups = document.getElementsByClassName("mapboxgl-popup");

            console.log('...remove popup box...popups.length ..' + popups.length);
            if (popups.length) {
                let popupTotal = popups.length;
                for(let i= popupTotal -1; i >=0 ;i--){
                    console.log('...remove popup box i= ..' + i);
                    try{
                        if(popups[i]){
                            popups[i].remove();
                        }
                    }catch(e1){
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
            
            
            console.log('...remove map...');
            if (map) {
                clearPropertiesFromMap(map);
                clearResidentsFromMap(map);
                clearDistancesFromMap(map);
                // removeAllImages(map);
            }
            this.setState({
                properties: tobeRemain
            });
            console.log('...redraw the map after remove property...');
            // console.log('..properties..' + JSON.stringify(properties));
            showPropertiesOnMap(map, tobeRemain, this.renderPropertiesTooltip,false);
            // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            showPrimaryDistancesOnMap(map, tobeRemain);
        }catch(e){

            console.log('...remove property error...' + JSON.stringify(e));
        }
    }

    async initializeLayers() {
        const {map} = this.context;
        const {fetchProperties, } = this.props;

        const {value: properties} = await fetchProperties();
       

        try{
            this.setState({
                properties: properties
            });
            // console.log('..properties..' + JSON.stringify(properties));
            showPropertiesOnMap(map, properties, this.renderPropertiesTooltip,true);
            // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
            showPrimaryDistancesOnMap(map, properties);
        }catch(e){

        }
        // map.on('click', this.onClickMap);
    }

    onClickMap = (e) => {
        const {lng: longitude, lat: latitude} = e.lngLat;
        // console.log('..map..on click..' + longitude);
        const { utilsData, auth } = this.props;
        const user = auth.user;
        if(utilsData.editMode){
            console.log('..in edit mode..');
            this.createMarker({latitude, longitude});
        }else{
            if(user === null || user == undefined){
                //user logout Or not register
                this.createMarker({latitude, longitude});
            }else{
                console.log('.. editMode turn off..');
            }
        }
    };


    createMarker = async ({latitude, longitude}) => {
        // const {domain} = this.state;
        const {map} = this.context;

        const el = document.createElement('div');
        const width = 48;
        const height = 48;
        el.className = 'marker';
        el.style.backgroundImage = `url(https://alphcmap.com/map-markers/blue_home_pin.png)`;
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

        const geocodeData = await reverseGeocodePoint({longitude, latitude});

        let domain = localStorage.getItem('current_domain');
        if(domain === undefined || domain === null){
            domain = 'alphc.com'
        }
        const email = generateEmail(geocodeData) +  '@' + domain;
        this.setState({
            selectedAddress: geocodeData,
            email: email
        });
        const { auth } = this.props;

        
        const element = document.createElement('div');

        if(auth.user !== null && auth.user !== undefined){
            //这里需要区分
            ReactDOM.render(
                <div className={'info-window'}>
                    <h4>{email}</h4>
                    <Row className="justify-content-end ">
                        <Col className="list-unstyled text-right">
                            
                            <li>
                            <Button
            size={'sm'}
            onClick={() => this.changeColor(email)}>
            Color
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
         <Button
            size={'sm'}
            onClick={() => this.addAddress()}>
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
        }else{
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

        
        const {pins} = this.state;
        // console.log('..pins..' + JSON.stringify(pins));


        if(auth.user !== null && auth.user !== undefined){
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
        }else{
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

    removeAddress = (emailIn) =>{
        const {pins } = this.state;
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
        const {  layerAdded } = this.state;
        // console.log('..layerAdded..' + JSON.stringify(layerAdded) + " ..emailIn.." + emailIn);
        let tobeDelete = layerAdded.filter( layer => layer.email === emailIn);
        const {map} = this.context;
        if(tobeDelete && tobeDelete.length > 0){
            // console.log('..tobeDelete..' + JSON.stringify(tobeDelete));
            clearLayer( map, tobeDelete[0].layerId);
        }

    }
    addAddress = () => {
        const { selectedAddress, email, properties, pins, layerAdded } = this.state;
        const {map} = this.context;
        const currentPin = pins.filter(item => item.email === email);
        const data = {
            item:{ 
                email:email,
                ...selectedAddress,
                color: currentPin[0].color
            }
        }
        const { saveBatchProperties } = this.props;
        properties.push(data.item);
        saveBatchProperties(data).then( async(resp) => {
             console.log('..saveBatchProperties..' + JSON.stringify(resp));
             //remove the popup and show line
             
             // console.log('..pins..' + JSON.stringify(pins));
     
            //  pins.forEach((p) => {
            //      // console.log('..pins..' + JSON.stringify(p));
            //      if (p.marker.getPopup().isOpen()) {
            //          p.marker.togglePopup();
            //      }
            //  });
             
            //  console.log('... current pin ..'  +  currentPin.length );
             if(currentPin){
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
                                    <Button
                    size={'sm'}
                    onClick={() => this.changeColor(email)}>
                    Color
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                                        
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
             const primaryAddress = properties.filter( property => property.primaryAddress === true);
             

             const residentsWithLocation =[];
             residentsWithLocation.push(selectedAddress);
             const randomString = generateString(10);
             
             const newItem = { 
                email:email,
                layerId: randomString
            };
            layerAdded.push(newItem);
            this.setState({
                layerAdded: layerAdded,
                properties: properties
            });
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
           
        });

    }
    activateAddress = () => {
        const { setPropertyRegistrationForm,registerForm } = this.props;
        const { selectedAddress } = this.state;
        //  = address;
        // console.log('..selectedAddress..' + JSON.stringify(selectedAddress));
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
        const {pins } = this.state;

        pins.forEach((p) => {
            if (p.marker.getPopup().isOpen()) {
                p.marker.togglePopup();
            }
        });

        const {lng: longitude, lat: latitude} = event.target.getLngLat();

        const geocodeData = await reverseGeocodePoint({longitude, latitude});
        let domain = localStorage.getItem('current_domain');
        if(domain === undefined || domain === null){
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

        if(auth.user !== null && auth.user !== undefined){
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
        // const { utilsData } = this.props;
        // if(!utilsData.editMode) return;

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
        const {pins,  searchText } = this.state;
        const { utilsData,active,editMode, auth } = this.props;

        const user = auth.user;
        return <>
        <div className={'showcase-map-top-actions'}>
                        <div className={'search-actions'}>
                            <Form onSubmit={this.onSubmitSearch}>
                                <Input
                                    bsSize={'lg'}
                                    disabled={ !utilsData.editMode && user !== null && user !== undefined }
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
                    {utilsData.changeColor && <ChangeColorForm  callback = {this.changeColorCallack} />}
                    {utilsData.bindingProperty && <BindingForm />}
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
    fetchProperties: () =>
        dispatch(fetchProperties({page: 1, pageSize: 100000})),
    fetchUsers: () => dispatch(fetchUsers({page: 1, pageSize: 100000})),
    setPropertyRegistrationForm: (data) => dispatch(setPropertyRegistrationForm(data)),
    saveBatchProperties: (data)  => dispatch(saveBatchProperties(data)),
    deleteUserAdditionalAddressById: (propertyId) => dispatch(deleteUserAdditionalAddressById(propertyId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Showcase));
