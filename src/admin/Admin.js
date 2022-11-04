import React, { Component } from "react";
import { Route } from "react-router-dom";
import '../styles/admin/style.scss';

import { icons } from "./assets/icons";

React.icons = icons;

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

class Admin extends Component {
  render() {
    const { match } = this.props;

    return (
        <Route
          path={`${match.url}/`}
          name="Home"
          render={(props) => <TheLayout {...props} />}
        />
    );
  }
}

export default Admin;
