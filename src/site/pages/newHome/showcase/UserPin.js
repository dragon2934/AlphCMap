import React, {useContext, useEffect, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {Button, Col, Row, Form, Input} from 'reactstrap';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../../utils/propertyUtils';
import {getNavigatorLocation} from '../../../../utils/mapUtils';
import { saveBatchProperties } from '../../../../redux/actionCreators/appActionCreators';

const createMarker = () => {
    return new window.google.maps.Marker({
        draggable: true,
    });
};

const createInfoWindow = () => {
    return new window.google.maps.InfoWindow({
        content: 'Getting address info...',
    });
};
const UserPin = ({propertyMarker}) => {
    const history = useHistory();
    const {map} = useContext(MapContext);
    const user = useSelector((state) => state.auth.user);
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const dispatch = useDispatch();
    const [mapMarker] = useState(createMarker());
    const [infoWindow] = useState(createInfoWindow());
    const [address, setAddress] = useState(null);
    const [email,setEmail] = useState('');

    const {
        property: {
            location: {latitude, longitude},
        },
    } = user;

    const setMarkerPosition = useCallback(
        (longitude, latitude) => {
            mapMarker.setPosition({
                lng: longitude,
                lat: latitude,
            });
            mapMarker.setMap(map);

            reverseGeocodePoint({longitude, latitude})
                .then((data) => {
                    console.log('...data...' + JSON.stringify(data));
                    setAddress(data);                    
                    // dispatch(
                    //     setPropertyRegistrationForm({
                    //         address: data,
                    //         rural: Object.values(data).some((value) => !value),
                    //     }),
                    // );
                })
                .catch(() => {});
        },
        [dispatch, map, mapMarker],
    );

    const activateAddress = useCallback((address,email) => {
        console.log('..email..' + email + '..address..' + JSON.stringify(address));
        const data = {
            item:{ 
                email:email,
                ...address
            }
        }
        dispatch(
            saveBatchProperties(data)).then(resp=>{
                //link together
                console.log('..saveBatchProperties..' + JSON.stringify(resp));
            }).catch(error=>{
                console.log('..saveBatchProperties error..' + JSON.stringify(error));
            })
        ;
    }, [dispatch]);
    useEffect(() => {
       
        if (!address) {
            console.log('***** no address, return');
            mapMarker.setMap(null);
            return;
        }
        // if( isAppEmbedWebview() && address.steps != null && address.steps!==undefined && address.steps === 2){
        //     //hide this at this step
        //     marker.setMap(null);
        //     return;
        // }
        // console.log('steps: ****** ' + address.steps );
        const domain = localStorage.getItem("current_domain");
        const email = generateEmail(address) + '@' + domain;
        setEmail(email);
       
        console.log('******* email=' + email);

        infoWindow.setContent('Getting address info...');
        infoWindow.open(map, mapMarker);

        const element = document.createElement('div');

        ReactDOM.render(
            <div className={'info-window'}>
                <h4>{email}</h4>
                <Row className="justify-content-end ">
                    <Col className="list-unstyled text-right">
                        <li>
                            <Button
                                size={'sm'}
                                onClick={() => activateAddress(address,email)}>
                                Add
                            </Button>
                        </li>
                    </Col>
                </Row>
            </div>,
            element,
        );

        infoWindow.setContent(element);

        map.panTo({
            lng: address.longitude,
            lat: address.latitude,
        });
        return () => {};
    }, [activateAddress, map, mapMarker, address, infoWindow]);

    const onSubmitForm = useCallback(
        (e) => {
            setSearching(true);
            e.preventDefault();

            if (!searchText.trim()) return;

            geocodeAddress({address: searchText})
                .then((data) => {
                    if (data) {
                        setMarkerPosition(data.longitude, data.latitude);
                    }
                })
                .finally(() => {
                    setSearching(false);
                });
        },
        [searchText, setMarkerPosition],
    );

    const onFindLocation = useCallback(
        (e) => {
            e.preventDefault();

            getNavigatorLocation().then(({latitude, longitude}) => {
                setMarkerPosition(longitude, latitude);
            });
        },
        [setMarkerPosition],
    );

    // Add map onclick listener
    useEffect(() => {
        if (!map) return;
        const onClick = (e) => {
            infoWindow.setContent('Getting info...');
            setMarkerPosition(e.latLng.lng(), e.latLng.lat());
        };

        map.addListener('click', onClick);
        
        return () => {
            window.google.maps.event.clearListeners(map, 'click');
        };
    }, [ infoWindow, map, mapMarker, setMarkerPosition]);

    useEffect(() => {
        if (!map) return;

        const marker = new window.google.maps.Marker({
            draggable: false,
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: 'Getting address info...',
        });

        const element = document.createElement('div');

        ReactDOM.render(
            <div className={'info-window'}>
                <h4>{user.property.email}@alphc.com</h4>
                <Row className="justify-content-end ">
                    <Col className="list-unstyled text-right">
                        <li>
                            <Button
                                size={'sm'}
                                onClick={() => {
                                    history.push('/profile/property');
                                }}>
                                Change Property Location
                            </Button>
                        </li>
                    </Col>
                </Row>
            </div>,
            element,
        );

        infoWindow.setContent(element);
        // infoWindow.open(map, marker);

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        marker.setPosition({
            lng: longitude,
            lat: latitude,
        });

        marker.setMap(map);

        map.panTo({
            lng: longitude,
            lat: latitude,
        });
    }, [history, latitude, longitude, map, user]);

    return <>
    <div className="showcase-map-top-actions">
                <div  className={'search-actions'}>
                    <Form onSubmit={onSubmitForm}>
                        <Input
                            bsSize={'lg'}
                            className=""
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(e.currentTarget.value)
                            }
                            placeholder={'Search...'}
                        />
                    </Form>
                </div>
                <div className="basemap-actions p-sm-1">
                    <div className={"locate-button"}>
                        <button
                            className="map-button"
                            onClick={onFindLocation}
                            title={'Find My Location'}>
                            <svg width="48" height="48" viewBox="0 0 32 32">
                                <g transform="translate(6 6)">
                                    <path fill="none" d="M0,0H20V20H0Z" />
                                    <path
                                        fill="currentColor"
                                        d="M17.315,9.182a7.359,7.359,0,0,0-6.5-6.5V1H9.182V2.685a7.359,7.359,0,0,0-6.5,6.5H1v1.636H2.685a7.359,7.359,0,0,0,6.5,6.5V19h1.636V17.315a7.359,7.359,0,0,0,6.5-6.5H19V9.182ZM10,15.727A5.727,5.727,0,1,1,15.727,10,5.723,5.723,0,0,1,10,15.727Z"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="showcase-map-top-actions-mobile">
                <Row>
                    <Col>
                        <div className={'search-actions'}>
                            <Form onSubmit={onSubmitForm}>
                                <Input
                                    bsSize={'lg'}
                                    className=""
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
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-row-reverse">
                        <div className="basemap-actions pt-1 pr-2">
                            <div className="locate-button">
                                <button
                                    className="map-button"
                                    onClick={onFindLocation}
                                    title={'Find My Location'}>
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 32 32">
                                        <g transform="translate(6 6)">
                                            <path
                                                fill="none"
                                                d="M0,0H20V20H0Z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M17.315,9.182a7.359,7.359,0,0,0-6.5-6.5V1H9.182V2.685a7.359,7.359,0,0,0-6.5,6.5H1v1.636H2.685a7.359,7.359,0,0,0,6.5,6.5V19h1.636V17.315a7.359,7.359,0,0,0,6.5-6.5H19V9.182ZM10,15.727A5.727,5.727,0,1,1,15.727,10,5.723,5.723,0,0,1,10,15.727Z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
    </>;
};

export default UserPin;
