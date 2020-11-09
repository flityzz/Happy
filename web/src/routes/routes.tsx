import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

import Landing from "../pages/Landing";
import OrphanagesMap from "../pages/OrphanagesMap";
import Orphanage from "../pages/Orphanage";
import CreateOrphanage from "../pages/CreateOrphanage";
import Login from '../pages/Login';
import CreateUser from "../pages/CreateUser";
import Dashboard from "../pages/Dashboard";
import DeleteOrphanage from "../components/DeleteOrphanage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/login" component={Login} />
        <Route path="/user/create" component={CreateUser} />
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/dashboard/delete" component={DeleteOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
