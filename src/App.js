import React, {useEffect} from 'react';
import "@popperjs/core/lib/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import {onInitLoad} from "./utils/utils";
import NavBar from "./layout/NavBar";
import "./css/theme.css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";
import TopBar from "./layout/TopBar";
import {Route, Switch} from "react-router-dom";
import StorageUpload from "./features/storage/Upload";
import StorageList from "./features/storage/List";

const App = () => {

    useEffect(
        () => {
            onInitLoad();
        }, []
    );

    return (
        <div className="container" data-layout="container">
            <NavBar/>
            <div className="content">
                <TopBar/>
                <Switch>
                    <Route path={"/storage/upload"} exact component={StorageUpload}/>
                    <Route path={"/storage/all"} exact component={StorageList}/>
                </Switch>

            </div>
        </div>
    );
};

export default App;
