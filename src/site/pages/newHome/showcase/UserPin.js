import React, {useContext, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Button, Col, Row} from 'reactstrap';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import createHTMLMapMarker from "../../../components/html-marker";
const UserPin = ({propertyMarker}) => {
    const history = useHistory();
    const {map} = useContext(MapContext);
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
    const {
        location: {latitude, longitude},
    } = propertyMarker;

    useEffect(() => {
        if (!map) return;

        const latLng = new google.maps.LatLng(latitude, longitude);
        // let lotSize = propertyMarker.acreage;
        const zoomLevel = map.getZoom();
        // console.log('zoomLevel=' + zoomLevel);
       
        // const data = lotSize.split('x');
        // if(data.length == 2){
        //     lotSize = parseFloat(data[0]) * parseFloat(data[1]);
        //     lotSize = lotSize.toFixed(2);
        // }
        let markerHTML = `<div class="google_map_marker_rectangle">` + propertyMarker.acreage + '</div>';// `<div class="google_map_marker">` + lotSize + '</div>';
        // let markerHTML = `<div class="google_map_marker">` + lotSize + '</div>';
        // if(zoomLevel > 13 && zoomLevel < 16){
        //     markerHTML = `<div class="google_map_marker">` + lotSize + '</div>';
        // }else 
        // if(zoomLevel >=14 ){
        //     markerHTML = `<div class="google_map_marker_rectangle">` + propertyMarker.acreage + '</div>';
        // }
        //create new
        marker = createHTMLMapMarker({
            latlng: latLng,
            map: map,
            html: markerHTML
        });
        
        const infoWindow = new window.google.maps.InfoWindow({
            content: 'Getting address info...',
        });
        let acreage = propertyMarker.acreage;
        if(acreage === undefined || acreage === null) {
            acreage = 'N/A';
        }
        // console.log('xxxx =' + JSON.stringify( acreage));
        const restfulUrl = process.env.REACT_APP_SERVICE_URL;
        const element = document.createElement('div');
        ReactDOM.render(
            <div className="info-window">
                <div className='item_wrap'>Num : {propertyMarker.serial_no }</div>
                <div  className='item_wrap'>Address : { propertyMarker.address } </div>
                <div  className='item_wrap'>Lot Size : { acreage } </div>
                <div  className='item_wrap'><a target='_blank' href={restfulUrl + propertyMarker.application_form_url} >Application Form</a></div>
                <div className='item_wrap'><a target='_blank' href={restfulUrl + propertyMarker.plans_url}>Plans</a></div>    
            </div>,
            element,
        );
        infoWindow.setContent(element);
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }, [history, latitude, longitude, map,zoomLevel]);

    return null;
};

export default UserPin;
