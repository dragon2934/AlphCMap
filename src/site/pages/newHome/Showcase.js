import React, {useCallback,useContext, useEffect, useRef, useState,} from "react";
import {useDispatch, useSelector} from 'react-redux';
// import {useDispatch, useSelector} from 'react-redux';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import UserPin from './showcase/UserPin';
import ShowcaseActions from './showcase/ShowcaseActions.js';
import {
    fetchProperties,
    searchProperties,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    Button,
    Input,
    ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown
} from 'reactstrap';
import {toastr} from 'react-redux-toastr';
import {
    fetchCities,
} from '../../../redux/actionCreators/adminActionCreators';

const Showcase = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const registerFormUser = useSelector((state) => state.registerForm.user);
    const [loading, setLoading] = useState(true);
    const context = useContext(MapContext);
    const [properties,setProperties ] = useState([]);
    const [searchType,setSearchType] = useState(1);
    let searchText = localStorage.getItem('searchText');
    if(searchText === null || searchText === undefined) searchText='';
    let cityFullName = localStorage.getItem('city_full_name');
    if(cityFullName === null || cityFullName === undefined) cityFullName= 'Scarborough';
    const [keywordText,setKeywordText] = useState('');
    const [cities,setCities] = useState([]);
    const [selectedCity,setSelectedCity] = useState(cityFullName);
    const [dropDownOpen,setDropDownOpen] = useState(false);

    // const [isSeach, setIsSearch] = useState(0);

    // useEffect(() => {
    //     dispatch(fetchCities({page:1, pageSize: 100000})).then( ({value:resp_cities}) =>{
    //         console.log('cities..' + JSON.stringify(resp_cities));
    //         setCities(resp_cities);
    //     }).finally(() =>{}
    //     );
    //     return () => {};
    // }, [dispatch]);

    const toggle=useCallback(() => {
        setDropDownOpen(!dropDownOpen)
    });
    // useEffect(() => {
    //     setLoading(true);

    //     const isSeach = localStorage.getItem('isSearch');
    //     let cityShorName = localStorage.getItem('city_short_name');
    //     if(cityShorName === null || cityShorName === undefined || cityShorName.length ===0){
    //         cityShorName = 'SC';
    //     }

    //     if( isSeach !==null && isSeach !==undefined && parseInt(isSeach) === 1){
    //         dispatch(searchProperties(localStorage.getItem('searchText'), localStorage.getItem('searchType'),cityShorName))
    //         .then( (properties)=>{
    //             localStorage.setItem('searchText','');
    //             localStorage.setItem('searchType',1);
    //             localStorage.setItem('isSearch',0);
    //             console.log('...search result....properties..' + JSON.stringify(properties.value));
    //             setProperties(properties.value);
    //         })
    //         .finally(() =>
    //             setLoading(false),
    //         ); 
    //     }else{

    //         dispatch(searchProperties(null,null,cityShorName))
    //         .then( (properties)=>{
    //             // console.log('...properties..' + JSON.stringify(properties.value));
    //             setProperties(properties.value);
    //         })
    //         .finally(() =>
    //             setLoading(false),
    //         );
    //     }

    //     return () => {};
    // }, [dispatch]);


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
            {properties &&  properties.map( property =>{
              return  <UserPin key={property.id} propertyMarker={property} />
            } )  }
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
