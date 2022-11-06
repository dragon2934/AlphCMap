import React, {useContext, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Button, Col, Row} from 'reactstrap';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import createHTMLMapMarker from "../../../components/html-marker";
import {    
    clearDistancesFromMap,
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showPrimaryDistancesOnMap,
    showPropertiesOnMap,
 } from '../../../../utils/mapUtils';

import PropertiesTooltip from '../../../../admin/components/PropertiesTooltip';
const PropertiesLayer = ({properties,map}) => {
    const history = useHistory();
    // const {map} = useContext(MapContext);
    const [ zoomLevel,setZoomLevel ] = useState(11);
    // const user = useSelector((state) => state.auth.user);
    let marker = null;
    if(map){
        // map.addListener('zoom_changed', () => {
        //     const zoomLevel = map.getZoom();
        //     // console.log(' zoom changed...' + zoomLevel);
        //     setZoomLevel(zoomLevel);
        //     if(marker){
        //         // console.log('try to remove the marker');
        //         marker.remove();
        //     }
        // });
    }
    // const {
    //     location: {latitude, longitude},
    // } = propertyMarker;
    const renderPropertiesTooltip = ({id, email}) => {
        const {history} = this.props;

        return <PropertiesTooltip email={email} id={id} history={history} />;
    };
    useEffect(() => {
        if (!map) return;
        showPropertiesOnMap(map, properties, renderPropertiesTooltip);
        // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
        showPrimaryDistancesOnMap(map, properties);
        
        return {
            if (map) {
                clearPropertiesFromMap(map);
                clearResidentsFromMap(map);
                clearDistancesFromMap(map);
            }
        }
    }, [history, map,zoomLevel]);

    return null;
};

export default PropertiesLayer;
