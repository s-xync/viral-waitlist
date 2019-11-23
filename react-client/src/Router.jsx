import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductCreate from "./components/ProductCreate";
import Products from "./components/Products";
import ProductView from "./components/ProductView";

const Router = ({ handleAddErrorMessages, handleAddSuccessMessage }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/product/create">
        <ProductCreate
          handleAddErrorMessages={handleAddErrorMessages}
          handleAddSuccessMessage={handleAddSuccessMessage}
        />
      </Route>
      <Route exact path="/product/:id">
        <ProductView
          handleAddErrorMessages={handleAddErrorMessages}
          handleAddSuccessMessage={handleAddSuccessMessage}
        />
      </Route>
      <Route path="*">
        <Products
          handleAddErrorMessages={handleAddErrorMessages}
          handleAddSuccessMessage={handleAddSuccessMessage}
        />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
