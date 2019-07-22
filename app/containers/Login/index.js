/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import apiCaller from '../../utils/apiCaller';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      
    };
  }

  componentDidMount() {
    apiCaller('users', 'get', null).then(res =>
      this.setState({
        data: res.data,
      }),
    );
  }

  onChangeForm = (ev) => {

    const { name } = ev.target;
    const { value } = ev.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const arrEmail = this.state.data.map((value) => value.email);
    const result = arrEmail.filter(item => 
      this.state.email === item &&  this.state.pass === '12345' ? item : ''
    );
    this.setState({
      emailToken: result
    })
  };

  render() {
    if(this.state.emailToken) {
      localStorage.setItem("keyUser", this.state.emailToken);
      return <Redirect to='/home' />
    }
    return (
      <React.Fragment>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={6} md={4}>
            <Paper elevation={4}>
              <Typography gutterBottom>Signup</Typography>
              <Form>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="nhap email"
                    onChange={(ev) => this.onChangeForm(ev)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="pass"
                    placeholder="nhap pass"
                    onChange={(ev) => this.onChangeForm(ev)}
                  />
                </Grid>
                <FormControl fullWidth margin="normal">
                  <Button onClick={(e) => this.onSubmit(e)} color="primary">
                    Signup
                  </Button>
                </FormControl>
              </Form>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}