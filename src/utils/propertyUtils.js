import { SERVICE_URL, PARTNER_TOKEN } from '../constants';

export const reverseGeocodePoint = ({ latitude, longitude }) => {
    return fetch(`${SERVICE_URL}/public/geocode-point?tenant=${PARTNER_TOKEN}`, {
        body: JSON.stringify({ latitude, longitude }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((r) => r.json());
};

export const geocodeAddress = ({ address }) => {
    return fetch(`${SERVICE_URL}/public/geocode-address?tenant=${PARTNER_TOKEN}`, {
        body: JSON.stringify({ address }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((r) => r.json());
};

export const generateEmail = ({
    streetNumber,
    route,
    locality,
    city,
    country,
    postalCode,
    longitude,
    latitude,
    unitNo,

    lotNo,
    plotNo,
    region,
    province,
}) => {
    let components = [streetNumber, route, locality, city, postalCode];

    if (lotNo && plotNo) {
        components = [
            streetNumber,
            route,
            locality,
            `lot${lotNo}`,
            `plot${plotNo}`,
            region,
            province,
            city,
            country,
            postalCode,
        ].filter((i) => i);
    }

    if (unitNo) {
        components = [unitNo, ...components];
    }

    // console.log('..components..' + JSON.stringify(components));

    if (components.some((value) => !value)) {
        return `Lati${latitude}_Long${longitude}`;
    }

    return components
        .map((c) => (c ? c.trim().replace(/[ ]/g, '-') : c))
        .join('-')
        .toLowerCase();
};
