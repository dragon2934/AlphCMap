import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {MapMarkerUrls} from '../../constants';



const MapLegend = () => {
    const el = document.querySelector('.mapboxgl-ctrl-top-right');
    // const [active, setActive] = useState(false);

    if (!el) {
        return null;
    } else {
        return ReactDOM.createPortal(
            <div className="map-legend mapboxgl-ctrl">
                  
            </div>,
            el,
        );
    }
};

export default MapLegend;
