import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Button, Col, Row} from 'reactstrap';
import MapContext from '../../../../common/contexts/MapContext/MapContext';

const UserPin = () => {
    const history = useHistory();
    const {map} = useContext(MapContext);
    const user = useSelector((state) => state.auth.user);

    const {
        property: {
            location: {latitude, longitude},
        },
    } = user;

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
        infoWindow.open(map, marker);

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

    return null;
};

export default UserPin;
