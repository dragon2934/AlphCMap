import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import {
    AlertStatus,
    MapMarkerUrls,
    PendingStatuses,
    PropertyStatus,
} from '../constants';

export const getNavigatorLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }),
                (positionError) => reject(positionError),
            );
        } else {
            reject('No geolocation api');
        }
    });
};

const showPropertyTooltip = (map, renderTooltip, e) => {
    let features = map.queryRenderedFeatures(e.point, {
        layers: [
            'other-properties',
            'safe-properties',
            'pending-properties',
            'has_injured-properties',
        ],
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    const element = document.createElement('div');

    let domain = localStorage.getItem('current_domain');
    if (domain === undefined || domain === null) {
        domain = 'alphc.com'
    }
    if (feature.properties.companyName) {
        domain = feature.properties.companyName + ".com";
    }
    if (feature.properties.lastName) {
        domain = feature.properties.lastName + ".com";
    }
    if (feature.properties.email.includes("@")) {
        domain = '';
    }
    if (domain.length > 0) {
        domain = "@" + domain;
    }
    ReactDOM.render(
        renderTooltip({
            email: feature.properties.email + domain, // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
            id: feature.properties.id,
            property: feature.properties
        }),
        element,
    );

    new mapboxgl.Popup({
        closeButton: false,
        // closeOnClick: false,
        maxWidth: 'none',
        offset: [0, -55],
    })
        .setDOMContent(element)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
};
export const removeAllImages = (map) => {
    map.removeStyleImage(MapMarkerUrls.property.default);
    map.removeStyleImage(MapMarkerUrls.property.hasInjured);
    map.removeStyleImage(MapMarkerUrls.property.pending);
    map.removeStyleImage(MapMarkerUrls.property.safe);
    map.removeStyleImage(MapMarkerUrls.property.secondary);
}
export const showPropertiesOnMapEx = (map, data, renderTooltip, bAddImage) => {
    const propertiesWithAlert = data.filter((i) => i.property_alert);

    const other = data.filter((i) => !i.property_alert);

    const safe = propertiesWithAlert.filter(
        (i) => i.property_alert.status === PropertyStatus.SAFE,
    );
    const pending = propertiesWithAlert.filter(
        (i) => i.property_alert.status === PropertyStatus.PENDING,
    );
    const hasInjured = propertiesWithAlert.filter(
        (i) => i.property_alert.status === PropertyStatus.HAS_INJURED,
    );

    const secondaryAddress = data.filter((p) => !p.primaryHolder);
    const primaryAddress = other.filter((p) => p.primaryHolder);

    console.log('..primary ..' + primaryAddress.length + ' secondary ..' + secondaryAddress.length);
    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.default,
        'primary-properties',
        primaryAddress,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.secondary,
        'secondary-properties',
        secondaryAddress,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.safe,
        'safe-properties',
        safe,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.pending,
        'pending-properties',
        pending,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.hasInjured,
        'has_injured-properties',
        hasInjured,
        (i) => [i.location.longitude, i.location.latitude],
    );

    map.on('click', showPropertyTooltip.bind(undefined, map, renderTooltip));
};
export const showPropertiesOnMap = (map, data, renderTooltip, bAddImage, user) => {
    const propertiesWithAlert = data.filter((i) => i.primaryAddress);

    const other = data.filter((i) => !i.primaryAddress);


    // default: '/map-markers/blue_home_pin.png',
    let defaultItems = other.filter(
        (i) => i.color === PropertyStatus.DEFAULT,
    );
    if (user !== null && user !== undefined) {
        const noneOwnerData = propertiesWithAlert.filter(
            (i) => i.primaryAddress === 1 && i.ownerMobileNumber !== user.mobileNumber,
        );
        defaultItems = defaultItems.concat(noneOwnerData);
    }
    // safe: '/map-markers/green_home_pin.png',
    const safe = other.filter(
        (i) => i.color === PropertyStatus.SAFE,
    );

    // pending: '/map-markers/grey_home_pin.png',
    const pending = other.filter(
        (i) => i.color === PropertyStatus.PENDING,
    );

    // hasInjured: '/map-markers/red_home_pin.png',
    const hasInjured = other.filter(
        (i) => i.color === PropertyStatus.HAS_INJURED,
    );
    let primary = null;
    if (user !== null && user !== undefined) {
        primary = propertiesWithAlert.filter(
            (i) => i.primaryAddress === 1 && i.ownerMobileNumber === user.mobileNumber,
        );
    } else {
        primary = propertiesWithAlert.filter(
            (i) => i.primaryAddress,
        );
    }
    // secondary: '/map-markers/second_home_pin.png',
    const secondary = other.filter(
        (i) => i.color === PropertyStatus.SECONDARY,
    );
    primary.map(item => {
        hasInjured.push(item);
    })

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.default,
        'other-properties',
        defaultItems,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.secondary,
        'secondary-properties',
        secondary,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.safe,
        'safe-properties',
        safe,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.pending,
        'pending-properties',
        pending,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.property.hasInjured,
        'has_injured-properties',
        hasInjured,
        (i) => [i.location.longitude, i.location.latitude],
    );

    map.on('click', showPropertyTooltip.bind(undefined, map, renderTooltip));
};

export const clearPropertiesFromMap = (map) => {
    clearLayer(map, 'has_injured-properties');
    clearLayer(map, 'pending-properties');
    clearLayer(map, 'safe-properties');
    clearLayer(map, 'other-properties');
};

const showResidentTooltip = (map, renderTooltip, e) => {
    let features = map.queryRenderedFeatures(e.point, {
        layers: [
            'injured-residents',
            'pending-residents',
            'safe-residents',
            'away-residents',
            'other-residents',
        ],
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];
    console.log('feature =' + JSON.stringify(feature));

    const element = document.createElement('div');

    ReactDOM.render(
        renderTooltip({
            email: feature.properties.email,
            id: feature.properties.id,
            user: feature.properties,
            location: JSON.parse(feature.properties.location),
        }),
        element,
    );

    new mapboxgl.Popup({
        closeButton: false,
        maxWidth: 'none',
        offset: [0, -55],
    })
        .setDOMContent(element)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
};

export const showResidentsOnMap = (map, data, renderTooltip) => {
    const residentsWithLocation = data.filter(
        (i) => i.location && i.location.latitude,
    );

    const residentsWithAlert = residentsWithLocation.filter(
        (i) => i.user_alert,
    );
    const other = residentsWithLocation.filter((i) => !i.user_alert);

    const away = residentsWithAlert.filter(
        (i) => i.user_alert.status === AlertStatus.AWAY,
    );
    const safe = residentsWithAlert.filter(
        (i) => i.user_alert.status === AlertStatus.SAFE,
    );
    const pending = residentsWithAlert.filter((i) =>
        PendingStatuses.includes(i.user_alert.status),
    );
    const injured = residentsWithAlert.filter(
        (i) => i.user_alert.status === AlertStatus.INJURED,
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.user.default,
        'other-residents',
        other,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.user.away,
        'away-residents',
        away,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        map,
        MapMarkerUrls.user.safe,
        'safe-residents',
        safe,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.user.pending,
        'pending-residents',
        pending,
        (i) => [i.location.longitude, i.location.latitude],
    );

    showPointLayer(
        bAddImage,
        map,
        MapMarkerUrls.user.injured,
        'injured-residents',
        injured,
        (i) => [i.location.longitude, i.location.latitude],
    );

    map.on('click', showResidentTooltip.bind(undefined, map, renderTooltip));
};

export const clearResidentsFromMap = (map) => {
    clearLayer(map, 'injured-residents');
    clearLayer(map, 'pending-residents');
    clearLayer(map, 'safe-residents');
    clearLayer(map, 'away-residents');
    clearLayer(map, 'other-residents');
};

export const showDistancesOnMap = (map, residents) => {
    const residentsWithLocation = residents.filter(
        (i) =>
            i.location &&
            i.location.latitude &&
            i.property &&
            i.property.location &&
            i.property.location.latitude,
    );

    showLineLayer(
        map,
        MapMarkerUrls.user.injured,
        'resident-property-distances',
        residentsWithLocation,
        (i) => [
            [i.location.longitude, i.location.latitude],
            [i.property.location.longitude, i.property.location.latitude],
        ],
    );
};

export const clearDistancesFromMap = (map) => {
    clearLayer(map, 'resident-property-distances');
};

export const showLineLayer = (
    map,
    imageUrl,
    layerId,
    data,
    coordinateSelector,
    callback,
) => {
    map.addSource(layerId, {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: data.map((p) => ({
                type: 'Feature',
                properties: p,
                geometry: {
                    type: 'LineString',
                    coordinates: coordinateSelector(p).filter((i) => i),
                },
            })),
        },
    });

    map.addLayer({
        id: layerId,
        source: layerId,
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#888888',
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });

    if (callback) callback();
};

const showPointLayer = (
    bAddImage,
    map,
    imageUrl,
    layerId,
    data,
    coordinateSelector,
    callback,
) => {
    // if(bAddImage)
    {
        map.loadImage(imageUrl, function (error, image) {
            if (error) throw error;

            try {

                map.addImage(`${layerId}-marker`, image);

                map.addSource(layerId, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: data.map((p) => ({
                            type: 'Feature',
                            properties: p,
                            geometry: {
                                type: 'Point',
                                coordinates: coordinateSelector(p).filter((i) => i),
                            },
                        })),
                    },
                });

                map.addLayer({
                    id: layerId,
                    source: layerId,
                    type: 'symbol',
                    layout: {
                        'icon-image': `${layerId}-marker`,
                        'icon-allow-overlap': true,
                        'icon-anchor': 'bottom',
                        'icon-size': 0.6,
                    },
                });
            } catch (error) {
                console.log('add layer error:' + JSON.stringify(error));
            };

            if (callback) callback();
        });
    }
    // else{
    //     map.addSource(layerId, {
    //         type: 'geojson',
    //         data: {
    //             type: 'FeatureCollection',
    //             features: data.map((p) => ({
    //                 type: 'Feature',
    //                 properties: p,
    //                 geometry: {
    //                     type: 'Point',
    //                     coordinates: coordinateSelector(p).filter((i) => i),
    //                 },
    //             })),
    //         },
    //     });

    //     map.addLayer({
    //         id: layerId,
    //         source: layerId,
    //         type: 'symbol',
    //         layout: {
    //             'icon-image': `${layerId}-marker`,
    //             'icon-allow-overlap': true,
    //             'icon-anchor': 'bottom',
    //             'icon-size': 0.6,
    //         },
    //     });
    //     if (callback) callback();
    // }
};

export const clearLayer = (map, layerId) => {
    if (map.hasImage(`${layerId}-marker`)) map.removeImage(`${layerId}-marker`);

    if (map.getLayer(layerId)) map.removeLayer(layerId);
    if (map.getSource(layerId)) map.removeSource(layerId);
};

export const showPrimaryDistancesOnMap = (map, properties, user) => {
    const residentsWithLocation = properties.filter(
        (i) =>
            i.location &&
            i.location.latitude
    );
    const primaryAddress = properties.filter(
        (i) =>
            i.primaryAddress == 1 && i.ownerMobileNumber === user.mobileNumber
    );

    showLineLayer(
        map,
        MapMarkerUrls.user.injured,
        'resident-property-distances',
        residentsWithLocation,
        (i) => [
            [primaryAddress[0].location.longitude, primaryAddress[0].location.latitude],
            [i.location.longitude, i.location.latitude],
        ],
    );
};