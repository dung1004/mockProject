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

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';
import reducer from './reducers';
import { fetchData } from './actions';
import { selectEmail } from './selectors';

const key = 'appp';

export function App(props) {
  useInjectReducer({ key, reducer });
  const [values, setValues] = useState({
    path: location.pathname,
  });
  useEffect(() => {
    props.onfetchUser();
    setValues({ path: location.pathname });
    // eslint-disable-next-line no-var
  }, []);
  
  return (
    <Wrapper>
      {location.pathname !== '/login' ? <Header /> : null}
      <Article>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/nhanvien" component={Nhanvien} />
          <Route path="/giaovien" component={Teachers} />
          <Route exact path="/class" component={Class} />
          <Route path="/students" component={Students} />
          <Route path="/login" component={Login} />
          <Route path="/info/:id" component={DetailsPage} />
          <Route path="/class/infoUser/:id" component={InfoUser} />
          <Route component={NotFoundPage} />
        </Switch>
      </Article>
      {location.pathname !== '/login' ? <Footer /> : null}
      <GlobalStyle />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  users: selectEmail,
});
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
