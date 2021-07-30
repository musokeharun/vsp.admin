import React, {useEffect} from 'react';
import "@popperjs/core/lib/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import {onInitLoad} from "./utils/utils";
import NavBar from "./layout/NavBar";
import "./css/theme.css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";
import TopBar from "./layout/TopBar";

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
                <div className="card mb-3">
                    <div className="bg-holder d-none d-lg-block bg-card"/>
                    <div className="card-body position-relative">
                        <div className="row">
                            <div className="col-lg-8">
                                <h3 className="mb-0">DashBoard</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
