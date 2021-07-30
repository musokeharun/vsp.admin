import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Default from './Default';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {HashRouter, Route, Switch} from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path={"/help"} component={Default}/>
                    <Route path={"/"} component={App}/>
                </Switch>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('top')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
