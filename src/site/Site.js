import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import '../styles/site/app.scss';
// import {isAdmin} from './/utils/authUtils';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));

// const User = React.lazy(() => import('../admin/views/users/User'));
// const UserEdit = React.lazy(() => import('../admin/views/users/UserEdit'));
// const Users = React.lazy(() => import('../admin/views/users/Users'));

// const City = React.lazy(() => import('../admin/views/cities/City'));
// const CityEdit = React.lazy(() => import('../admin/views/cities/CityEdit'));
// const Cities = React.lazy(() => import('../admin/views/cities/Cities'));


// const Properties = React.lazy(() => import('../admin/views/properties/Properties'));
// const Property = React.lazy(() => import('../admin/views/properties/Property'));
// const PropertyEdit = React.lazy(() =>
//     import('../admin/views/properties/PropertyEdit'),
// );

// const PropertyFileUpload = React.lazy(()=>import('../admin/views/properties/file-upload'));

import AboutUs from './pages/newHome/AboutUs';
import ContactUs from './pages/newHome/ContactUs';
import HowItWorks from './pages/newHome/HowItWorks';
import NewsRelease from './pages/newHome/NewsRelease';
import OurPromise from './pages/newHome/OurPromise';
import OurStory from './pages/newHome/OurStory';
import OurVideo from './pages/newHome/OurVideo';
import Patents from './pages/newHome/Patents';
import PrivacyPolicy from './pages/newHome/PrivacyPolicy';
import TermsOfUse from './pages/newHome/TermsOfUse';

import EditProperty from './pages/profile/EditProperty';
import MobileAccountVerification from './pages/mobile/MobileAccountVerification';
import ChangeEMail from './pages/newHome/ChangeEMail';
import ChangeMobile from './pages/newHome/ChangeMobile';
import ChangePassword from "./pages/newHome/ChangePassword";
import MemberShip from "./pages/newHome/MemberShip";
import MapProvider from '../common/contexts/MapContext/MapProvider';
import Checkout from "./pages/newHome/Checkout";
import CheckoutSuccess from './pages/newHome/CheckoutSuccess';
import CheckoutFailed from './pages/newHome/CheckoutFailed';
import BusinessProfile from "./pages/newHome/BusinessProfile";
import Cart from "./pages/cart";
import BusinessPortal from "./pages/newHome/BusinessPortal";
import UnSubscribe from "./pages/newHome/UnSubscribe";
import Connect from "./pages/newHome/Connect";
import ResetPassword from "./pages/newHome/ResetPassword";
import VerifyResetPassword from './pages/newHome/VerifyResetPassword';
import ResetPassword3 from './pages/newHome/ResetPassword3';
// import Admin from "../admin/Admin";

const Users = React.lazy(() => import('../admin/views/users/Users'));
const User = React.lazy(() => import('../admin/views/users/User'));
const UserEdit = React.lazy(() => import('../admin/views/users/UserEdit'));

const Properties = React.lazy(() => import('../admin/views/properties/Properties'));
const Property = React.lazy(() => import('../admin/views/properties/Property'));
const PropertyEdit = React.lazy(() =>
  import('../admin/views/properties/PropertyEdit'),
);

const Templates = React.lazy(() => import('../admin/views/templates/Templates'));
const Template = React.lazy(() => import('../admin/views/templates/Template'));
const TemplateEdit = React.lazy(() => import('../admin/views/templates/TemplateEdit'));


const Site = () => {
  return (
    <Switch>
      <Route component={Login} path={`/login`} exact />
      <Route component={Logout} path={`/logout`} exact />

      <Route
        component={MobileAccountVerification}
        path={`/mobile-verify`}
        exact
      />
      <Route
        component={(props) => (
          <MapProvider>
            <EditProperty {...props} />
          </MapProvider>
        )}
        path={`/edit-property`}
        exact
      />

      <Route exact path="/admin/users" component={Users} />
      <Route exact path="/admin/users/new" component={UserEdit} />
      <Route exact path="/admin/users/:id" component={User} />
      <Route exact path="/admin/edit/user/:id" component={UserEdit} />

      <Route exact path="/admin/properties" component={Properties} />
      <Route exact path="/admin/properties/new" component={PropertyEdit} />
      <Route exact path="/admin/properties/:id" component={Property} />
      <Route exact path="/admin/edit/properties/:id" component={PropertyEdit} />

      <Route exact path="/admin/templates" component={Templates} />
      <Route exact path="/admin/templates/new" component={TemplateEdit} />
      <Route exact path="/admin/templates/:id" component={Template} />
      <Route exact path="/admin/edit/templates/:id" component={TemplateEdit} />


      {/* <Route exact path="/admin" component={Admin} /> */}
      <Route exact path="/connect" component={Connect} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/change-email" component={ChangeEMail} />
      <Route exact path="/pricing" component={MemberShip} />
      <Route exact path="/checkout/:id" component={Checkout} />
      <Route exact path="/change-mobile" component={ChangeMobile} />
      <Route exact path="/change-password" component={ChangePassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/verify-reset-password/:mobileNumber" component={VerifyResetPassword} />
      <Route exact path="/reset-password-change-password/:mobileNumber" component={ResetPassword3} />

      <Route exact path="/checkout_success" component={CheckoutSuccess} />
      <Route exact path="/checkout_failed" component={CheckoutFailed} />
      <Route exact path="/business-profile" component={BusinessProfile} />
      <Route exact path="/business-portal/:id" component={BusinessPortal} />
      <Route exact path="/un-subscribe/:id" component={UnSubscribe} />


      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/patents" component={Patents} />
      <Route exact path="/contact-us" component={ContactUs} />
      {/* <Route exact path="/app-introduction" component={AppLanding} /> */}
      <Route exact path="/our-story" component={OurStory} />
      <Route exact path="/our-promise" component={OurPromise} />
      <Route exact path="/news-release" component={NewsRelease} />
      <Route exact path="/our-video" component={OurVideo} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/terms-of-use" component={TermsOfUse} />

      {/* <Route render={()=>{
                isAdmin() ? <Component component={Site} path="/" />: <Redirect to="/login" />
              }} /> */}

      <Route component={Home} path={`/`} />


    </Switch>
  );
};

export default Site;
