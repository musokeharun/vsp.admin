import React from 'react';
import {Route, Switch} from "react-router-dom";
import PackageAdd from "./packageAdd";
import Package from "./Package";

const PackageRouter = () => {
    return (
        <Switch>
            <Route exact path={"/app/package/add"} render={props => <PackageAdd {...props} />}/>
            <Route path={"/app/package"} render={props => <Package {...props}  />}/>
        </Switch>
    );
};

export default PackageRouter;