/* eslint-disable no-else-return */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./NavBar";
import LinkHeader from './LinkHeader';
import MenuLink from './MenuLink';
import Accout from './Accout';

export default function Footer() {


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  const [value, setValue] = React.useState({
    phanquyen: 0
  });


  console.log(value.phanquyen);

  const quyenAdmin = () => {
    if (value.phanquyen === 0) {
      return (
        <React.Fragment>
          <NavBar>
            <LinkHeader to="/giaovien">Giáo Viên</LinkHeader>
          </NavBar>
          <NavBar>
            <LinkHeader to="/students">Học Viên</LinkHeader>
          </NavBar>
          <NavBar>
            <LinkHeader to="/nhanvien">Nhân Viên</LinkHeader>
          </NavBar>
          <Accout />
        </React.Fragment>

      )
    } else if (value.phanquyen === 1) {
      return (
        <React.Fragment>
          <NavBar>
            <LinkHeader to="/class">Class</LinkHeader>
          </NavBar>
          <Accout />
        </React.Fragment>
      )
    } else if (value.phanquyen === 2) {
      return (
        <React.Fragment>
          <NavBar>
            <LinkHeader to="/class">Class</LinkHeader>
          </NavBar>
          <Accout />
        </React.Fragment>
      )
    }
    else {
      return (
        <Button variant="contained" color="primary">
          <LinkHeader to="/login">Login</LinkHeader>
        </Button>
      )
    }
  }

  return (
    <AppBar position="static">
      <Toolbar style={{justifyContent: 'space-around'}}>
        <Typography variant="h6" >
          Trung Tâm Anh Ngữ
        </Typography>
        <MenuLink>
          <NavBar>
            <LinkHeader exact to="/">Home</LinkHeader>
          </NavBar>
          {quyenAdmin()}
        </MenuLink>
      </Toolbar>
    </AppBar>
  )
}
