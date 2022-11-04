import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import UserPin from './showcase/UserPin';
import ShowcaseActions from './showcase/ShowcaseActions';

const Showcase = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const user = useSelector((state) => state.auth.user);
    const registerFormUser = useSelector((state) => state.registerForm.user);

    const context = useContext(MapContext);

    useEffect(() => {
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new window.google.maps.Map(mapContainer.current, {
                center: {lat: 43.63982499999999, lng: -79.4164156},
                zoom: 5,

                mapTypeControl: true,
                mapTypeControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_BOTTOM,
                    mapTypeIds: [
                        window.google.maps.MapTypeId.SATELLITE,
                        window.google.maps.MapTypeId.ROADMAP,
                    ],
                },
                fullscreenControl: false,
            });

            setMap(map);
            context.setMap(map);
        };

        if (
            mapContainer.current &&
            !mapContainer.current.querySelector('canvas.mapboxgl-canvas') &&
            !map
        ) {
            initializeMap({setMap, mapContainer});
        }
    }, [context, map]);

    return (
        <>
            {(!user || registerFormUser) && <ShowcaseActions />}
            {!registerFormUser && user && user.property && <UserPin />}
            {context.disabled && <div className="map-disabled" />}
            <div
                style={{height: '100%'}}
                className={
                    context.disabled
                        ? 'map disabled mapboxgl-map'
                        : 'map mapboxgl-map'
                }
                ref={(el) => (mapContainer.current = el)}
            />
        </>
    );
};

export default Showcase;
