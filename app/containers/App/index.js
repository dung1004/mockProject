/* eslint-disable import/no-unresolved */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Peoples from 'components/Peoples';
import Teachers from 'components/Teacher';
import Students from 'components/Student';
import Login from 'components/Login';
import NotFoundPage from 'containers/NotFoundPage';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';

export default function App() {
  return (
    <div>
      <Header />
      <Article>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/peoples" component={Peoples} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/students" component={Students} />
          <Route path="/login" component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </Article>
      <Footer />
      <GlobalStyle />
    </div>
  );
}
