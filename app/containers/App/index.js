import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage';
import Class from 'containers/Class';
import Login from 'containers/Login';
import NotPage from 'containers/NotFoundPage';
import InfoUser from 'containers/InfoUser';
import DetailsPage from 'containers/DetailsPage';
import PropsTypes from 'prop-types';
import People from '../People';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';
import { makeSelectLocation } from './selectors';
import GlobalLoading from '../GlobalLoading';

function App(props) {
  let roles = 3;
  const tokenAccout = JSON.parse(localStorage.getItem('token'));
  if (tokenAccout) {
    roles = tokenAccout.level;
  }
  const roleLink = () => {
    switch (roles) {
      case 0:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/people" component={People} />
            <Route exact path="/class" component={Class} />
            <Route path="/user/info/:id" component={DetailsPage} />
            <Route exact path="/class/info/:id" component={InfoUser} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="" component={NotPage} />
          </Switch>
        );
      case 1:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/user/info/:id" component={DetailsPage} />
            <Route exact path="/class/info/:id" component={InfoUser} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="" component={NotPage} />
          </Switch>
        );
      case 2:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/user/info/:id" component={DetailsPage} />
            <Route exact path="/class/info/:id" component={InfoUser} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="" component={NotPage} />
          </Switch>
        );
      default:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
    }
  };
  return (
    <Wrapper>
      <GlobalLoading />
      {props.path.pathname !== '/login' ? (
        <Header level={roles} user={tokenAccout} />
      ) : null}
      <Article>{roleLink()}</Article>
      {props.path.pathname !== '/login' ? <Footer /> : null}
      <GlobalStyle />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  path: makeSelectLocation(),
});
const withConnect = connect(mapStateToProps);

App.propTypes = {
  path: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(App);
