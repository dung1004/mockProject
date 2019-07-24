/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

// eslint-disable-next-line no-unused-vars
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage';
import Class from 'containers/Class';
import Student from 'containers/Student';
import NhanVien from 'containers/Nhanvien';
import GiaoVien from 'containers/Giaovien';
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
import { fetchUser } from './actions';
import { makeSelectLevel } from './selectors';

const key = 'app';

export function App(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onfetchUser();
  });
  const roleLink = () => {
    switch (props.level) {
      case 0:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route exact path="/student" component={Student} />
            <Route exact path="/teacher" component={GiaoVien} />
            <Route exact path="/staff" component={NhanVien} />
            <Route path="/teachers/info/:id" component={DetailsPage} />
            <Route path="/students/info/:id" component={DetailsPage} />
            <Route path="/staffs/info/:id" component={DetailsPage} />
            <Route path="/info-user/:id" component={ItemInfo} />
            <Route path="/class/info/:id" component={InfoUser} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
        break;
      case 1:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/teacher/info/:id" component={DetailsPage} />
            <Route path="/class/info-students/:id" component={ItemInfo} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
        break;
      case 2:
        return (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/class" component={Class} />
            <Route path="/student/info/:id" component={DetailsPage} />
            <Route path="/class/info-teachers/:id" component={ItemInfo} />
            <Route path="/login" component={Login} />
            <Route path="" component={NotPage} />
          </Switch>
        );
        break;
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
      <Header level={props.level} />
      <Article>{roleLink()}</Article>
      <Footer />
      <GlobalStyle />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  level: makeSelectLevel(),
});
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchUser());
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

// const [values, setValues] = useState({
//   user: JSON.parse(localStorage.getItem('token')),
// });
// useEffect(() => {
//   setValues({user: JSON.parse(localStorage.getItem('token'))});
// }, []);
