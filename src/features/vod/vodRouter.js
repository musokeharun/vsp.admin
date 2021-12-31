import React from 'react';
import {Route, Switch} from "react-router-dom";
import VodAdd from "./vodAdd";
import Vod from "./Vod";

const VodRouter = () => {
    return (
        <Switch>
            <Route exact path={"/content/vod/add"} render={props => <VodAdd {...props} />}/>
            <Route path={"/content/vod"} render={props => <Vod {...props}  />}/>
        </Switch>
    );
};

export default VodRouter;