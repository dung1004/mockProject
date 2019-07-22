/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavBar from "./NavBar";
import LinkHeader from './LinkHeader';
import MenuLink from './MenuLink';


export default class Footer extends Component {

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Trung Tâm Anh Ngữ
          </Typography>
          <MenuLink>
            <NavBar>
              <LinkHeader exact to="/">Home</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader to="/people">People</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader to="/teachers">Teachers</LinkHeader>
            </NavBar>
            <NavBar>
              <LinkHeader to="/students">Students</LinkHeader>
            </NavBar>
          </MenuLink>
          <Button variant="contained" color="primary">
            <LinkHeader to="/login">Login</LinkHeader>
          </Button>
          <Icon>account_circle</Icon>
        </Toolbar>
      </AppBar>
    )
  }
}
