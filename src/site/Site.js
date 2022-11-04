import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import '../styles/site/app.scss';
// import {isAdmin} from './/utils/authUtils';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));

const User = React.lazy(() => import('../admin/views/users/User'));
const UserEdit = React.lazy(() => import('../admin/views/users/UserEdit'));
const Users = React.lazy(() => import('../admin/views/users/Users'));

const City = React.lazy(() => import('../admin/views/cities/City'));
const CityEdit = React.lazy(() => import('../admin/views/cities/CityEdit'));
const Cities = React.lazy(() => import('../admin/views/cities/Cities'));


const Properties = React.lazy(() => import('../admin/views/properties/Properties'));
const Property = React.lazy(() => import('../admin/views/properties/Property'));
const PropertyEdit = React.lazy(() =>
    import('../admin/views/properties/PropertyEdit'),
);

const PropertyFileUpload = React.lazy(()=>import('../admin/views/properties/file-upload'));

const Site = () => {
  return (
    <Switch>
      <Route component={Login} path={`/login`} exact />
      <Route component={Logout} path={`/logout`} exact />

      <Route exact path="/admin/users" component={Users} />
      <Route exact path="/admin/users/new" component={UserEdit} />
      <Route exact path="/admin/users/:id" component={User} />
      <Route exact path="/admin/edit/user/:id" component={UserEdit} />


      <Route exact path="/admin/cities" component={Cities} />
      <Route exact path="/admin/cities/new" component={CityEdit} />
      <Route exact path="/admin/cities/:id" component={City} />
      <Route exact path="/admin/edit/city/:id" component={CityEdit} />


      <Route exact path="/admin/file-upload" component={PropertyFileUpload} />
      <Route exact path="/admin/properties" component={Properties} />
      <Route exact path="/admin/properties/new" component={PropertyEdit} />
      <Route exact path="/admin/properties/:id" component={Property} />
      <Route exact path="/admin/edit/property/:id" component={PropertyEdit} />

      {/* <Route render={()=>{
                isAdmin() ? <Component component={Site} path="/" />: <Redirect to="/login" />
              }} /> */}
      <Route component={Home} path={`/`} />
    </Switch>
  );
};

export default Site;
