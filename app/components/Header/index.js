/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable no-else-return */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NavBar from "./NavBar";
import LinkHeader from './LinkHeader';
import MenuLink from './MenuLink';
import Accout from './Accout';


export default function Header(props) {
  const [values, setValues] = useState({
    level: props.level,
  });
  useEffect(() => {
    setValues({level: props.level});
  });
  const quyenAdmin = () => {
    switch(values.level) {
      case 0:
        return <React.Fragment>
          <MenuLink>
            <NavBar>
              <LinkHeader exact to='/'>Trang Chủ</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader  to='/staff'>Nhân Viên</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader to='/teacher' >Giáo Viên</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader to='/student'>Học Viên</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader exact  to='/class'>Lớp Học</LinkHeader>
            </NavBar>
          </MenuLink>
          <Accout />
        </React.Fragment>
        break;
      case 1:
        return <React.Fragment>
          <MenuLink>
            <NavBar>
              <LinkHeader exact to='/'>Trang Chủ</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader exact  to='/class'>Lớp Học</LinkHeader>
            </NavBar>
          </MenuLink>
          <Accout />
        </React.Fragment>
        break;
      case 2:
        return <React.Fragment>
          <MenuLink>
            <NavBar>
              <LinkHeader exact to='/'>Trang Chủ</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader exact  to='/class'>Lớp Học</LinkHeader>
            </NavBar>
          </MenuLink>
          <Accout />
        </React.Fragment>
        break;
      default:
        return <React.Fragment>
          <MenuLink>
            <Button variant="contained" color="primary">
              <LinkHeader to='/login'>Đăng Nhập</LinkHeader>
            </Button>
          </MenuLink>
        </React.Fragment>
    }
  }

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" >
          Trung Tâm Anh Ngữ
        </Typography>

        {quyenAdmin()}

      </Toolbar>
    </AppBar>
  )
}
