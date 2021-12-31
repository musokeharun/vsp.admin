import React from 'react';
import {Route, Switch} from "react-router-dom";
import GenreAdd from "./genreAdd";
import Genre from "./genre";

const GenreRouter = () => {
    return (
        <Switch>
            <Route exact path={"/content/genre/add"} render={props => <GenreAdd {...props} />}/>
            <Route path={"/content/genre"} render={props => <Genre {...props}  />}/>
        </Switch>
    );
};

export default GenreRouter;