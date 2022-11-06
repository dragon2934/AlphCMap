import React, {useCallback,useContext, useEffect, useRef, useState,} from "react";
import {useDispatch, useSelector} from 'react-redux';
// import {useDispatch, useSelector} from 'react-redux';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import UserPin from './showcase/UserPin.js';
import ShowcaseActions from './showcase/ShowcaseActions.js';
import {
    fetchProperties,
} from '../../../redux/actionCreators/adminActionCreators';

import PropertiesLayer from "./showcase/PropertiesLayer";

const Showcase = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const registerFormUser = useSelector((state) => state.registerForm.user);
  
    const context = useContext(MapContext);
    const [properties,setProperties ] = useState([]);


    useEffect(() => {
        if(user!==null && user !== undefined){
            dispatch(fetchProperties({page: 1, pageSize: 100000,mobile:user.mobileNumber})).then(resp=>{
                // console.log('...properties..' + JSON.stringify(resp));
                setProperties(resp.value);
            }).catch(error=>{
                console.log('...properties error..' + JSON.stringify(error));
            })
        }
    });
    useEffect(() => {
        const initializeMap = ({setMap, mapContainer}) => {
            if(window.google && window.google.maps){
                const map = new window.google.maps.Map(mapContainer.current, {
                    center: {lat: 43.63982499999999, lng: -79.4164156},
                    zoom: 11,

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
            }
        };

        if (
            mapContainer.current &&
            !mapContainer.current.querySelector('canvas.mapboxgl-canvas') &&
            !map
        ) {
            initializeMap({setMap, mapContainer});
        }
    }, [context, map]);

    return  (
        <>
            {(!user || registerFormUser) && <ShowcaseActions />}
            {!registerFormUser && user && user.property && <UserPin />}
            {/* {properties &&  properties.map( property =>{
              return  <UserPin key={property.email} propertyMarker={property} />
            } )  } */}
            {properties && properties.length >0 && <PropertiesLayer  properties={properties} map={map} /> }
  
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
