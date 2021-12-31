import React from 'react';
import {Route, Switch} from "react-router-dom";
import CategoryAdd from "./categoryAdd";
import Category from "./Category";

const CategoryRouter = () => {
    return (
        <Switch>
            <Route exact path={"/content/category/add"} render={props => <CategoryAdd {...props} />}/>
            <Route path={"/content/category"} render={props => <Category {...props}  />}/>
        </Switch>
    );
};

export default CategoryRouter;