import React, {lazy} from 'react';
import {Route, Switch} from 'react-router-dom';

import '../styles/site/app.scss';
import PrivateRoute from './components/PrivateRoute';
import MobileChangeAddress from './pages/mobile/MobileChangeAddress';
import MobileChangeMobile from './pages/mobile/MobileChangeMobile';
import MobileChangePassword from './pages/mobile/MobileChangePassword';
import MobileContactUs from './pages/mobile/MobileContactUs';
import MobilePrivacyPolicy from './pages/mobile/MobilePrivacyPolicy';
import MobileRegister from './pages/mobile/MobileRegister';
import MobileResetPassword from './pages/mobile/MobileResetPassword';
import MobileTermsOfUse from './pages/mobile/MobileTermsOfUse';
import MobileVerifyResetPassword from './pages/mobile/MobileVerifyResetPassword';
import MobileSuccessful from './pages/mobile/MobileSuccessful';
import ResetPassword3 from './pages/newHome/ResetPassword3';
import MobileAccountVerification from './pages/mobile/MobileAccountVerification';
import MobileResidents from './pages/mobile/MobileResidents';
import MobileResident from './pages/mobile/MobileResident';
import MobileViewResident from './pages/mobile/MobileViewResident';
import MobileUserProperties from './pages/mobile/MobileProperties';
import MobileEditUserProperty from './pages/mobile/MobileEditUserProperty';
import MapProvider from '../common/contexts/MapContext/MapProvider';
import MobileViewAlert from './pages/mobile/MobileViewAlert';
import MobileViewPropertiesAtMap from './pages/mobile/MobileViewPropertiesAtMap';
import MobileAccountVerifyByPhoneNumber from './pages/mobile/MobileAccountVerifyByPhoneNumber';
import MobileLoading from './pages/mobile/MobileLoading';
import MobileViewUser from './pages/mobile/MobileViewUser';
import MobileChangeEMail from './pages/mobile/MobileChangeEMail';
import MobileRefundPolicy from './pages/mobile/MobileRefundPolicy';
// import AppLanding from './pages/newHome/AppLanding';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Logout = lazy(() => import('./pages/Logout'));
const Profile = lazy(() => import('./pages/Profile'));

const Site = () => {
    return (
        <Switch>
            <Route component={Login} path={`/login`} exact />
            <Route component={Logout} path={`/logout`} exact />
            <Route component={MobileRegister} path={`/mobile-register`} exact />
            <Route
                component={MobilePrivacyPolicy}
                path={`/mobile-privacy-policy`}
                exact
            />
            <Route
                component={MobileContactUs}
                path={`/mobile-contact-us`}
                exact
            />
            {/* <Route
                component={AppLanding}
                path={`/app-introduction`}
                exact
            /> */}
            <Route
                component={MobileResetPassword}
                path={`/mobile-reset-password`}
                exact
            />
            <Route
                component={MobileLoading}
                path={`/mobile-loading`}
                exact
            />

            <Route
                component={MobileSuccessful}
                path={`/mobile-successful`}
                exact
            />
            <Route
                component={MobileAccountVerification}
                path={`/mobile-verify`}
                exact
            />  
            <Route
                component={MobileUserProperties}
                path={`/mobile-user-properties`}
                exact
            /> 
           <Route
                component={(props) => (
                    <MapProvider>
                        <MobileEditUserProperty {...props} />
                    </MapProvider>
                )}    
                path={`/mobile-user-property/new/`}
                exact
            />   
            <Route
                component={(props) => (
                    <MapProvider>
                        <MobileEditUserProperty {...props} />
                    </MapProvider>
                )}
                path={`/mobile-user-property/edit/:id`}
                exact
            />    
            <Route
                component={MobileResidents}
                path={`/mobile-residents/:id`}
                exact
            />    
            <Route
                component={MobileResident}
                path={`/mobile-resident/new/`}
                exact
            />       
            <Route
                component={MobileResident}
                path={`/mobile-resident/edit/:id`}
                exact
            />      
                     
            <Route
                component={MobileViewUser}
                path={`/mobile/users/:id`}
                exact
            />          
             <Route
                component={MobileViewResident}
                path={'/mobile-resident/view/:id'}
                exact
            />       
            <Route
                component={ResetPassword3}
                path={`/reset-password-3/:mobileNumber`}
                exact
            />
            <Route
                component={MobileAccountVerifyByPhoneNumber}
                path={`/mobile-activate/:mobileNumber`}
                exact
            />
 

            <Route
                component={(props) => (
                    <MapProvider>
                        <MobileViewPropertiesAtMap {...props} />
                    </MapProvider>
                )}
                path={`/mobile-view-all-properties-at-map`}
                exact
            />
            
            <Route
                component={MobileVerifyResetPassword}
                path={`/mobile-verify-reset-password/:mobileNumber`}
                exact
            />
            <Route
                component={MobileTermsOfUse}
                path={`/mobile-terms-of-use`}
                exact
            />
            <PrivateRoute
                component={MobileChangeMobile}
                path={`/mobile-change-mobile`}
                exact
            />
             <PrivateRoute
                component={MobileChangeEMail}
                path={`/mobile-change-email`}
                exact
            />
             <PrivateRoute
                component={MobileRefundPolicy}
                path={`/mobile-refund-policy`}
                exact
            />

            <PrivateRoute
                component={MobileChangeAddress}
                path={`/mobile-change-address`}
                exact
            />
            <PrivateRoute
                component={MobileChangePassword}
                path={`/mobile-change-password`}
                exact
            />
            <PrivateRoute
                component={(props) => (
                    <MapProvider>
                        <MobileViewAlert {...props} />
                    </MapProvider>
                )}
                path={`/mobile-view-alert/:id`}
                exact
            />

            <PrivateRoute component={Profile} path={`/profile`} />

            <Route component={Home} path={`/`} />
        </Switch>
    );
};

export default Site;
