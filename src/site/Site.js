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

import MobileAccountVerification from './pages/mobile/MobileAccountVerification';
// import MapProvider from  '../common/contexts/MapContext/MapProvider';
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
