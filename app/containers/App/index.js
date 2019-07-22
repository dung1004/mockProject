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
import Peoples from 'containers/Peoples';
import Teachers from 'containers/Teacher';
import Students from 'containers/Student';
import Login from 'containers/Login';
import NotFoundPage from 'containers/NotFoundPage';
import DetailsPage from 'containers/DetailsPage';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';

export default function App() {
  return (
    <Wrapper>
      <Header />
      <Article>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/people" component={Peoples} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/students" component={Students} />
          <Route path="/login" component={Login} />
          <Route path="/info/:id" component={DetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Article>
      <Footer />
      <GlobalStyle />
    </Wrapper>
  );
}
