import mapboxgl from 'mapbox-gl';
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import MapContext from '../contexts/MapContext/MapContext';
import MapLegend from './MapLegend';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

const Map = ({className}) => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const context = useContext(MapContext);

    useLayoutEffect(() => {
        document.onresize = () => {
            context.map.resize();
        };
    });

    useEffect(() => {
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-79.4164156, 43.63982499999999],
                zoom: 5,
                attributionControl: false,
            });

            map.on('load', () => {
                setMap(map);
                context.setMap(map);
                map.resize();
            });
            console.log('Map Init......');
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

export default Map;
