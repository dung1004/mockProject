/* eslint-disable vars-on-top */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
// import Peoples from 'containers/Peoples';
import Nhanvien from 'containers/Nhanvien';
import Teachers from 'containers/Giaovien';
import Class from 'containers/Class';
import Students from 'containers/Student';
import Login from 'containers/Login';
import NotFoundPage from 'containers/NotFoundPage';
import DetailsPage from 'containers/DetailsPage';
import InfoUser from 'containers/Class/InfoUser';
import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';
import reducer from './reducers';
import { fetchData } from './actions';
import { selectEmail , selectHome } from './selectors';
import saga from './saga';

const key = 'app';

export function App(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onfetchUser();
  }, []);

  // console.log(props.users);
  


  return (
    <Wrapper>
      <Header />
      <Article>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/nhanvien" component={Nhanvien} />
          <Route exact path="/giaovien" component={Teachers}  dataTeacher = {props.users} />
          <Route exact path="/class" component={Class} />
          <Route exact path="/students" component={Students} />
          <Route path="/login" component={Login} />
          <Route path="/giaovien/info/:id" component={DetailsPage} />
          <Route path="/class/infoUser/:id" component={InfoUser} />
          <Route path="/students/info/:id" component={DetailsPage} />
          <Route path="/nhanvien/info/:id" component={DetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Article>
      <Footer />
      <GlobalStyle />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  users: selectHome,
});
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(App);
