import React, {useCallback, useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Input, Row} from 'reactstrap';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import PropertyForm from '../../property/PropertyForm';
import {setPropertyRegistrationForm} from '../../../../redux/actionCreators/registrationActionCreators';
import {getNavigatorLocation} from '../../../../utils/mapUtils';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../../utils/propertyUtils';
import { isAppEmbedWebview } from '../../../../utils/utils';
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

const ShowcaseActions = () => {
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

    const [marker] = useState(createMarker());
    const [infoWindow] = useState(createInfoWindow());

    const {map, setDisabled} = useContext(MapContext);

    const dispatch = useDispatch();
    const {address, active} = useSelector((state) => state.registerForm);
    // console.log('steps:' + steps );

    useEffect(() => {
        if (active) {
            setDisabled(true);
            marker.setDraggable(false);
        } else {
            setDisabled(false);
            marker.setDraggable(true);
        }
    }, [active, map, marker, setDisabled]);

    useEffect(() => {
        if (map) {
            return () => {
                marker.setMap(null);
            };
        }
    }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

    const activateAddress = useCallback(() => {
        dispatch(
            setPropertyRegistrationForm({
                // address: data,
                active: true,
                // rural: Object.values(data).some((value) => !value),
            }),
        );
    }, [dispatch]);

    useEffect(() => {
       
        if (!address) {
            console.log('***** no address, return');
            marker.setMap(null);
            return;
        }
        if( isAppEmbedWebview() && address.steps != null && address.steps!==undefined && address.steps === 2){
            //hide this at this step
            marker.setMap(null);
            return;
        }
        // console.log('steps: ****** ' + address.steps );
        const email = generateEmail(address);
        console.log('******* email=' + email);

        infoWindow.setContent('Getting address info...');
        infoWindow.open(map, marker);

        const element = document.createElement('div');

        ReactDOM.render(
            <div className={'info-window'}>
                <h4>{email}@alphc.com</h4>
                <Row className="justify-content-end ">
                    <Col className="list-unstyled text-right">
                        <li>
                            <Button
                                size={'sm'}
                                onClick={() => activateAddress()}>
                                Activate this address
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
    }, [activateAddress, map, marker, address, infoWindow]);

    const setMarkerPosition = useCallback(
        (longitude, latitude) => {
            marker.setPosition({
                lng: longitude,
                lat: latitude,
            });
            marker.setMap(map);

            reverseGeocodePoint({longitude, latitude})
                .then((data) => {
                    dispatch(
                        setPropertyRegistrationForm({
                            address: data,
                            rural: Object.values(data).some((value) => !value),
                        }),
                    );
                })
                .catch(() => {});
        },
        [dispatch, map, marker],
    );

    // Locate callback
    const onFindLocation = useCallback(
        (e) => {
            e.preventDefault();

            getNavigatorLocation().then(({latitude, longitude}) => {
                setMarkerPosition(longitude, latitude);
            });
        },
        [setMarkerPosition],
    );

    // Add marker on search
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

    // // Add marker ondragend listener
    useEffect(() => {
        const onDragEnd = (e) => {
            console.log(':onDragEnd');
            setMarkerPosition(e.latLng.lng(), e.latLng.lat());
        };

        const handle = window.google.maps.event.addListener(
            marker,
            'dragend',
            onDragEnd,
        );

        return () => {
            if (handle) window.google.maps.event.removeListener(handle);
        };
    }, [map, marker, setMarkerPosition]);

    // Add marker ondragstart listener
    useEffect(() => {
        const onDragStart = () => {
            infoWindow.close();
        };

        const handle = window.google.maps.event.addListener(
            marker,
            'dragstart',
            onDragStart,
        );

        return () => {
            if (handle) window.google.maps.event.removeListener(handle);
        };
    }, [infoWindow, map, marker, setMarkerPosition]);

    // Add map onclick listener
    useEffect(() => {
        if (!map) return;
        const onClick = (e) => {
            infoWindow.setContent('Getting info...');
            setMarkerPosition(e.latLng.lng(), e.latLng.lat());
        };
        if (active) {
            window.google.maps.event.clearListeners(map, 'click');
        } else {
            map.addListener('click', onClick);
        }
        return () => {
            window.google.maps.event.clearListeners(map, 'click');
        };
    }, [active, infoWindow, map, marker, setMarkerPosition]);

    return (
        <>
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
            {active && <PropertyForm />}
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
        </>
    );
};

export default ShowcaseActions;
