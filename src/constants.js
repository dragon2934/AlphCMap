const utilsTools = require('./utils/utils');

export const SERVICE_URL = process.env.REACT_APP_SERVICE_URL
    ? process.env.REACT_APP_SERVICE_URL
    : 'http://localhost:1337';
export const PARTNER_TOKEN = process.env.REACT_APP_PARTNER_TOKEN;


export const MapMarkerUrls = {
    property: {
        default: '/map-markers/blue_home_pin.png',
        hasInjured: '/map-markers/red_home_pin.png',
        pending: '/map-markers/grey_home_pin.png',
        safe: '/map-markers/green_home_pin.png',
        secondary: '/map-markers/second_home_pin.png',
    },
    user: {
        default: '/map-markers/blue_user_pin.png',
        injured: '/map-markers/red_user_pin.png',
        pending: '/map-markers/grey_user_pin.png',
        safe: '/map-markers/green_user_pin.png',
        away: '/map-markers/yellow_user_pin.png',
    },
};

export const PropertyStatus = {
    DEFAULT: 'default',
    PENDING: 'pending',
    SAFE: 'safe',
    HAS_INJURED: 'hasInjured',
    SECONDARY: 'secondary'
};

export const AlertStatus = {
    PENDING: 'pending',
    SENT: 'sent',
    RECEIVED: 'received',
    SAFE: 'safe',
    AWAY: 'away',
    INJURED: 'injured',
};

export const PendingStatuses = [
    AlertStatus.PENDING,
    AlertStatus.SENT,
    AlertStatus.RECEIVED,
];

export const SafeStatuses = [AlertStatus.SAFE, AlertStatus.AWAY];
export const NotSafeStatuses = [AlertStatus.INJURED];

export const RespondedStatuses = [
    AlertStatus.INJURED,
    AlertStatus.SAFE,
    AlertStatus.AWAY,
];

// Not received state
// This is needed for messaging action creators
// Dont change this array or face the consequences.
export const NotRespondedStatuses = [AlertStatus.PENDING, AlertStatus.SENT];
