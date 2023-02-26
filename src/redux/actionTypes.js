// Auth
export const SET_AUTH = 'SET_AUTH';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_CHANGE_PASSWORD = 'AUTH_CHANGE_PASSWORD';
export const AUTH_CHANGE_PASSWORD_ALT = 'AUTH_CHANGE_PASSWORD_ALT';
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD';
export const AUTH_RESET_PASSWORD_VERIFY = 'AUTH_RESET_PASSWORD_VERIFY';
export const AUTH_FETCH_CURRENT_USER = 'AUTH_FETCH_CURRENT_USER';

// Site
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const TOGGLE_VERIFICATION_MODAL = 'TOGGLE_VERIFICATION_MODAL';

// Register Form
export const REGISTRATION_VERIFY_ACCOUNT = 'REGISTRATION_VERIFY_ACCOUNT';
export const REGISTRATION_RESET_FORM = 'REGISTRATION_RESET_FORM';
export const REGISTRATION_ADD_RESIDENT = 'REGISTRATION_ADD_RESIDENT';
export const SET_POINT = 'SET_POINT';

// Register Property
export const GET_INSTITUTE = 'GET_INSTITUTE';
export const RESET_PROPERTY = 'RESET_PROPERTY';
export const REGISTER_PROPERTY = 'REGISTER_PROPERTY';

// Register Property New
export const SET_PROPERTY_REGISTRATION_FORM = 'SET_PROPERTY_REGISTRATION_FORM';

// Registration Verification
export const RESEND_MOBILE_VERIFICATION_CODE =
    'RESEND_MOBILE_VERIFICATION_CODE';
export const RESEND_EMAIL_VERIFICATION_CODE = 'RESEND_EMAIL_VERIFICATION_CODE';

// Admin
export const ADMIN_SHOW_SIDEBAR = 'ADMIN_SHOW_SIDEBAR';

export const ADMIN_FETCH_USERS = 'ADMIN_FETCH_USERS';
export const ADMIN_SEARCH_USERS = 'ADMIN_SEARCH_USERS';
export const ADMIN_FETCH_USER = 'ADMIN_FETCH_USER';
export const ADMIN_ADD_USER = 'ADMIN_ADD_USER';
export const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER';
export const ADMIN_FETCH_USER_COUNT = 'ADMIN_FETCH_USER_COUNT';

export const ADMIN_FETCH_PROPERTIES = 'ADMIN_FETCH_PROPERTIES';
export const ADMIN_FETCH_PROPERTY = 'ADMIN_FETCH_PROPERTY';
export const ADMIN_FETCH_PROPERTY_RESIDENTS = 'ADMIN_FETCH_PROPERTY_RESIDENTS';
export const ADMIN_ADD_PROPERTY = 'ADMIN_ADD_PROPERTY';
export const ADMIN_DELETE_PROPERTY = 'ADMIN_DELETE_PROPERTY';
export const ADMIN_FETCH_PROPERTY_COUNT = 'ADMIN_FETCH_PROPERTY_COUNT';

export const ADMIN_FETCH_ROLES = 'ADMIN_FETCH_ROLES';

export const ADMIN_FETCH_CONTACTS = 'ADMIN_FETCH_CONTACTS';
export const ADMIN_FETCH_CONTACT = 'ADMIN_FETCH_CONTACT';
export const ADMIN_DELETE_CONTACTS = 'ADMIN_DELETE_CONTACTS';
export const ADMIN_FETCH_CONTACT_COUNT = 'ADMIN_FETCH_CONTACT_COUNT';

export const ADMIN_CREATE_ALERT = 'ADMIN_CREATE_ALERT';
export const ADMIN_FETCH_ALERTS = 'ADMIN_FETCH_ALERTS';
export const ADMIN_FETCH_ALERT = 'ADMIN_FETCH_ALERT';
export const ADMIN_FETCH_ALERT_COUNT = 'ADMIN_FETCH_ALERT_COUNT';
export const ADMIN_DELETE_ALERT = 'ADMIN_DELETE_ALERT';
export const CREATE_HELP_ALERT = 'CREATE_HELP_ALERT';

export const ADMIN_FETCH_ALERT_MESSAGES = 'ADMIN_FETCH_ALERT_MESSAGES';

export const ADMIN_FETCH_PROPERTY_ALERT = 'ADMIN_FETCH_PROPERTY_ALERT';
export const ADMIN_FETCH_USER_ALERT = 'ADMIN_FETCH_USER_ALERT';

// Profile
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const FETCH_INMATES = 'FETCH_INMATES';
export const SAVE_INMATE = 'SAVE_INMATE';
export const DELETE_INMATE = 'DELETE_INMATE';
export const GET_USER_PROPERTY = 'GET_USER_PROPERTY';
export const SAVE_USER_PROPERTY = 'SAVE_USER_PROPERTY';

// User-Properties
export const FETCH_USER_PROPERTIES = 'FETCH_USER_PROPERTIES';
export const SAVE_ADDITIONAL_ADDRESS = 'SAVE_ADDITIONAL_ADDRESS';
export const SAVE_USER_PROPERTIES_DATA = 'SAVE_USER_PROPERTIES_DATA';
export const DELETE_ADDITIONAL_ADDRESS = 'DELETE_ADDITIONAL_ADDRESS';
// Messaging
export const START_MESSAGING = 'START_MESSAGING';
export const FETCH_USER_ALERT_MESSAGES = 'FETCH_USER_ALERT_MESSAGES';
export const SET_USER_ALERT_MESSAGES_READ = 'SET_USER_ALERT_MESSAGES_READ';
export const TOGGLE_MINIMIZE_MESSAGING_STACK =
    'TOGGLE_MINIMIZE_MESSAGING_STACK';
export const TOGGLE_MAXIMIZE_MESSAGING_STACK =
    'TOGGLE_MAXIMIZE_MESSAGING_STACK';
export const CLOSE_MESSAGING_STACK = 'CLOSE_MESSAGING_STACK';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_TEMP_MESSAGE = 'SEND_TEMP_MESSAGE';

export const ADMIN_LIST_FILES = 'ADMIN_LIST_FILES';
export const ADMIN_UPLOAD_FILE = 'ADMIN_UPLOAD_FILE';
export const ADMIN_UPDATE_LAT_LNG = 'ADMIN_UPDATE_LAT_LNG';

export const ADMIN_SEARCH_PROPERTIES = 'ADMIN_SEARCH_PROPERTIES';


export const ADMIN_FETCH_CITIES = 'ADMIN_FETCH_CITIES';
export const ADMIN_FETCH_CITY = 'ADMIN_FETCH_CITY';
export const ADMIN_FETCH_CITY_COUNT = 'ADMIN_FETCH_CITY_COUNT';
export const ADMIN_DELETE_CITY = 'ADMIN_DELETE_CITY';
export const ADMIN_ADD_CITY = 'ADMIN_ADD_CITY';

export const SAVE_SECONDORY_PROPERTY = 'SAVE_SECONDORY_PROPERTY';

export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const CHANGE_PROPERTY_COLOR = 'CHANGE_PROPERTY_COLOR';
export const CANCEL_CHANGE_PROPERTY_COLOR = 'CANCEL_CHANGE_PROPERTY_COLOR';

export const ADMIN_PROPERTY_BINDING = 'ADMIN_PROPERTY_BINDING';
export const ADMIN_SEND_PROMOTE_EMAIL = 'ADMIN_SEND_PROMOTE_EMAIL';
export const AUTH_GET_ME = 'AUTH_GET_ME';
export const ADMIN_FETCH_PRODDUCT_DETAIL = 'ADMIN_FETCH_PRODDUCT_DETAIL';
export const STRIPE_CHECKOUT_SESSION = 'STRIPE_CHECKOUT_SESSION';
export const ADMIN_SAVE_BUSINESS_PROFILE = 'ADMIN_SAVE_BUSINESS_PROFILE';
export const ADMIN_GET_BUSINESS_PROFILE = 'ADMIN_GET_BUSINESS_PROFILE';
export const ADMIN_GET_BUSINESS_ADDRESS = 'ADMIN_GET_BUSINESS_ADDRESS';

export const CANCEL_DISPLAY_BUSINESS = 'CANCEL_DISPLAY_BUSINESS';

export const ADMIN_SAVE_MERCHANT_CONNECTION = 'ADMIN_SAVE_MERCHANT_CONNECTION';
export const ADMIN_SAVE_SHOPPING_CART = 'ADMIN_SAVE_SHOPPING_CART';
export const ADMIN_LOAD_SHOPPING_CART = 'ADMIN_LOAD_SHOPPING_CART';
export const ADMIN_UNSUBSCRIBE = 'ADMIN_UNSUBSCRIBE';
export const ADMIN_TOTAL_CONNECTED = 'ADMIN_TOTAL_CONNECTED';

export const ADMIN_CONFIRM_CONNECTION = 'ADMIN_CONFIRM_CONNECTION';