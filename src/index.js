import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";
import { PersistGate } from "redux-persist/integration/react";
import { SET_AUTH } from "./redux/actionTypes";
import { persistor, store } from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import AdminRoute from "./site/components/AdminRoute";

import "./styles/common/styles.scss";

const Admin = lazy(() => import("./admin/Admin"));
const Site = lazy(() => import("./site/Site"));
// import {isAdmin} from './utils/authUtils';

const loading = (
  <div className={"oader"}>
    <Spinner
      type={"grow"}
      color={"primary"}
      style={{ width: "5rem", height: "5rem" }}>

      {""}
    </Spinner>
  </div>
);

const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ReduxToastr
        timeOut={120000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      <PersistGate loading={loading} persistor={persistor}>
        <Suspense fallback={loading}>
          <BrowserRouter>
            <Switch>
              {/* <AdminRoute component={Admin} path="/admin" /> */}
              <Route component={Site} path={`/`} />
              {/* <Route render={()=>{
                isAdmin() ? <Component component={Site} path="/" />: <Redirect to="/login" />
              }} /> */}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

window.addEventListener(
    'message',
    (messageEvent) => {
        try {
            const message = JSON.parse(messageEvent.data);

            if (message.type === 'profile') {
                store.dispatch({
                    type: SET_AUTH,
                    payload: message.auth,
                });
            }
        } catch (e) {}
    },
    true,
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
