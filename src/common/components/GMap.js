import mapboxgl from 'mapbox-gl';
import React, {useContext, useEffect, useRef, useState} from "react";
import MapContext from '../contexts/MapContext/MapContext';
import MapLegend from './MapLegend';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

const GMap = ({className}) => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

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

        if (!map) initializeMap({setMap, mapContainer});
    }, [context, map]);

    return (
        <div className={`d-flex flex-fill ${className ? className : ''}`}>
            <MapLegend />
            <div
                className="flex-fill"
                ref={(el) => (mapContainer.current = el)}
            />
        </div>
    );
};

export default GMap;
