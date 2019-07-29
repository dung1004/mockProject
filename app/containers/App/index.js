import React, { useEffect, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import HomePage from 'containers/HomePage';
import People from 'containers/People';
import Class from 'containers/Class';
import Login from 'containers/Login';
import NotPage from 'containers/NotFoundPage';
import InfoUser from 'containers/InfoUser';
import ItemInfo from 'containers/ItemInfo';
import DetailsPage from 'containers/DetailsPage';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';
import reducer from './reducers';
import saga from './saga';
import { fetchUser, fetchData } from './actions';
import { makeSelectLevel, selectUser } from './selectors';

const key = 'app';

export function App(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onfetchUser();
    props.onfetchData();
  }, []);
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
            <Route path="/people/info/:id" component={DetailsPage} />
            <Route path="/info-user/:id" component={ItemInfo} />
            <Route exact path="/class/info-students/:id" component={InfoUser} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
      case 1:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/teacher/info/:id" component={DetailsPage} />
            <Route path="/class/info-students/:id" component={InfoUser} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
      case 2:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/student/info/:id" component={DetailsPage} />
            <Route path="/class/info-teachers/:id" component={InfoUser} />
            <Route path="/login" component={Login} />
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
      <Header level={roles} />
      <Article>{roleLink()}</Article>
      <Footer />
      <GlobalStyle />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  level: makeSelectLevel(),
  users: selectUser,
});
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchUser());
  },
  onfetchData: () => {
    dispatch(fetchData());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
App.propTypes = {
  onfetchUser: PropsTypes.func,
  onfetchData: PropsTypes.func,
};
export default compose(
  withConnect,
  memo,
)(App);
