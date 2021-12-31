import React, {Fragment, useEffect} from 'react';
import "@popperjs/core/lib/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import {onInitLoad} from "./utils/utils";
import NavBar from "./layout/NavBar";
import "./css/theme.css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";
import "./css/user.css";
import TopBar from "./layout/TopBar";
import {Route, Switch} from "react-router-dom";
import StorageUpload from "./features/storage/Upload";
import StorageList from "./features/storage/List";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {VSP_TOKEN} from "./features/auth/authAPI";
import Login from "./features/auth/Login";
import AppStorage from "./services/storage";
import CategoryRouter from "./features/category/categoryRouter";
import Loader, {stopLoad} from "./common/loader";
import GenreRouter from "./features/genres/genreRouter";
import PackageRouter from "./features/Package/packageRouter";
import VodRouter from "./features/vod/vodRouter";

const App = () => {

    const token = AppStorage.sessionGet(VSP_TOKEN)

    useEffect(
        () => {
            onInitLoad();
            stopLoad();
            console.log("Stopped");
        }, []
    );


    return (
        <Fragment>
            <Loader/>
            <div className="container" data-layout="container">
                <ToastContainer/>
                {
                    (!token || !token.length) ? <Login/> : (
                        <Fragment>
                            <NavBar/>
                            <div className="content">
                                <TopBar/>
                                <Switch>
                                    <Route path={"/storage/upload"} exact component={StorageUpload}/>
                                    <Route path={"/storage/all"} exact component={StorageList}/>
                                    <Route path={"/content/category"} component={CategoryRouter}/>
                                    <Route path={"/content/genre"} component={GenreRouter}/>
                                    <Route path={"/content/vod"} component={VodRouter}/>
                                    <Route path={"/app/package"} component={PackageRouter}/>
                                </Switch>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    );
};

export default App;
