import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {MapMarkerUrls} from '../../constants';

const PropertyMarkerDescriptions = [
    {
        marker: MapMarkerUrls.property.default,
        description: 'Default property marker, property has no alert on it',
    },
    {
        marker: MapMarkerUrls.property.hasInjured,
        description:
            'Property marker indicating that property has injured residents',
    },
    {
        marker: MapMarkerUrls.property.pending,
        description:
            'Property marker indicating that property has pending resident responses but has not injured residents',
    },
    {
        marker: MapMarkerUrls.property.safe,
        description:
            'Property marker indicating that all residents of property are safe',
    },
];

const ResidentMarkerDescriptions = [
    {
        marker: MapMarkerUrls.user.default,
        description: 'Default resident marker, has no alert on it',
    },
    {
        marker: MapMarkerUrls.user.injured,
        description: 'Resident marker indicating that resident is injured',
    },
    {
        marker: MapMarkerUrls.user.away,
        description:
            'Resident marker indicating that resident is away from alert area',
    },
    {
        marker: MapMarkerUrls.user.safe,
        description: 'Resident marker indicating that resident is safe',
    },
    {
        marker: MapMarkerUrls.user.pending,
        description:
            "Resident marker indicating that resident hasn't responded to alert yet",
    },
];

const MapLegend = () => {
    const el = document.querySelector('.mapboxgl-ctrl-top-right');
    const [active, setActive] = useState(false);

    if (!el) {
        return null;
    } else {
        return ReactDOM.createPortal(
            <div className="map-legend mapboxgl-ctrl">
                

                {!active && (
                    <>
                    
                    <i
                        className="close-button fa-3x fa fa-question"
                        onClick={() => setActive(!active)}
                    />
 
                    </>
                )}
                {active && (
                    <div className="map-legend_content">
                        <i
                            className="close-button fa fa-3x fa-close"
                            onClick={() => setActive(!active)}
                        />

                        <b>Property Markers</b>

                        <table>
                            {PropertyMarkerDescriptions.map(
                                ({marker, description}) => (
                                    <tr>
                                        <td>
                                            <img
                                                alt={description}
                                                src={marker}
                                                height={40}
                                            />
                                        </td>
                                        <td>{description}</td>
                                    </tr>
                                ),
                            )}
                        </table>

                        <b className="mt-3">Resident Markers</b>

                        <table>
                            {ResidentMarkerDescriptions.map(
                                ({marker, description}) => (
                                    <tr>
                                        <td>
                                            <img
                                                alt={description}
                                                src={marker}
                                                height={40}
                                            />
                                        </td>
                                        <td>{description}</td>
                                    </tr>
                                ),
                            )}
                        </table>
                    </div>
                )}
            
                {/* <i style={{marginTop:"40px"}} class="close-button fa-3x fa-solid fa-draw-polygon"></i> */}
      
                  
            </div>,
            el,
        );
    }
};

export default MapLegend;
