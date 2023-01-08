import mapboxgl from 'mapbox-gl';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {connect} from 'react-redux';
// import {withRouter} from 'react-router';
import Map from '../../../common/components/Map';
import { useHistory } from 'react-router';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchUserProperties,
} from '../../../redux/actionCreators/appActionCreators';
import {
    showPropertiesOnMapEx,
} from '../../../utils/mapUtils';
import PropertiesTooltip from '../../../admin/components/PropertiesTooltip';
import {
    CCol,
    CRow,
} from '@coreui/react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

const MobileViewPropertiesAtMap = () => {
    //  static contextType = MapContext;
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.me);
    const [mapInitialized, setMapInitialized] = useState(false);
    const { map } = useContext(MapContext);
    const history = useHistory();
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) { }
    });

    useEffect(() => {

        // const {mapInitialized} = this.state;
        if (!mapInitialized && map) {
            dispatch(fetchUserProperties()).then((properties) => {
                // console.log(' properties =' + JSON.stringify(properties));
                // properties.push(currentUser.property);
                showPropertiesOnMapEx(map, properties.value, renderPropertiesTooltip, true);
                setMapInitialized(true);
            });

        }
        // return function cleanup(){
        //       if(map){
        //         clearPropertiesFromMap(map);
        //         clearResidentsFromMap(map);
        //         clearDistancesFromMap(map);
        //       }
        // };
    }, [dispatch, map]);


    // const renderResidentsTooltip = ({id, email}) => {


    //     return <ResidentTooltip email={email} id={id} history={history} />;
    // };

    const renderPropertiesTooltip = ({ id, email }) => {

        return <PropertiesTooltip email={email} id={id} history={history} />;
    };


    return (
        <CRow className="h-100">

            <CCol className="pb-4 d-flex flex-column">

                <div className="d-flex flex-fill">
                    <Map />
                </div>
            </CCol>
        </CRow>
    );

}


export default MobileViewPropertiesAtMap;
