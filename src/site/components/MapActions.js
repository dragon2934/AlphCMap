import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col} from 'reactstrap';
import Spinner from 'reactstrap/es/Spinner';
import MapContext from '../../common/contexts/MapContext/MapContext';
import {getUserLocation} from '../../redux/actionCreators/appActionCreators';

const styles = [
    {
        url: 'mapbox://styles/mapbox/streets-v11',
        name: 'Streets',
    },
    {
        url: 'mapbox://styles/mapbox/light-v10',
        name: 'Light',
    },
    {
        url: 'mapbox://styles/mapbox/dark-v10',
        name: 'Dark',
    },
    {
        url: 'mapbox://styles/mapbox/outdoors-v11',
        name: 'Outdoors',
    },
    {
        url: 'mapbox://styles/mapbox/satellite-streets-v9',
        name: 'Satellite',
    },
];

const MapActions = () => {
    const dispatch = useDispatch();
    const location = useSelector((state) =>
        state.app.location ? state.app.location : {},
    );
    const {map} = useContext(MapContext);
    const [selectedStyle, setSelectedStyle] = useState(styles[0].url);

    return (
        map && (
            <Col className="map-actions">
                <Button
                    size={'sm'}
                    onClick={() => {
                        dispatch(getUserLocation());
                    }}>
                    {location.pending ? (
                        <Spinner size={'sm'} />
                    ) : (
                        'Find My Location'
                    )}
                </Button>
                {styles.map((style) => {
                    return (
                        <Button
                            size={'sm'}
                            active={selectedStyle === style.url}
                            onClick={() => {
                                map.setStyle(style.url);
                                setSelectedStyle(style.url);
                            }}>
                            {style.name}
                        </Button>
                    );
                })}
            </Col>
        )
    );
};

export default MapActions;
