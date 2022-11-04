import {store} from '../redux/store';

const adminRoles = [process.env.REACT_APP_ROLE_ADMIN_NAME,process.env.REACT_APP_ROLE_PM_NAME];

export const hasLoggedIn = () => {
    const state = store.getState();

    return state && state.auth && state.auth.jwt;
};

export const isAdmin = () => {
    const state = store.getState();
    try {
        return adminRoles.includes(state.auth.user.role.name);
    } catch (e) {
        return false;
    }
};
