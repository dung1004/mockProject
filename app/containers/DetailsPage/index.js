/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
// import apiCaller from '../../utils/apiCaller';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Section from '../../components/Section';
import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import BoxCard from './BoxCard';
import StyleTheP from './StyleTheP';
import StyleForm from './StyleForm';
import StyleH3 from '../HomePage/StyleH3';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthai: true,
      roles: 0,
      data: []
    };
  }

  // componentDidMount() {
  //   apiCaller('users', 'get', null).then(res =>
  //     this.setState({
  //       data: res.data,
  //     }),
  //   );
  // }

  // eslint-disable-next-line lines-between-class-members
  showNut = () => {
    if (this.state.roles === 0) {
      return (
        <Button onClick={() => this.editClick()} variant="contained" color="secondary">
          Edit
        </Button>
      )
    } else {
      return (
        <Button onClick={() => this.vetrangchu()} variant="contained" color="secondary">
          Tro Lai
        </Button>
      )
    }
  }

  vetrangchu = () => {
    if(this.state.roles === 1) {
      return <Redirect to='/' />
    }
    // console.log(this.state.roles);
    
  }

  editClick = () => {
    this.setState({
      trangthai: !this.state.trangthai
    })
  }

  hideFormUser = () => {
    if (this.state.trangthai === true) {
      return (
        <BoxCard>
          <Grid container spacing={2} xs={12} justify="center">
            <Grid item>
              <ButtonAvt>
                <StyleAvt
                  alt="complex"
                  src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/66511901_352607552306976_236412562093113344_n.jpg?_nc_cat=102&_nc_oc=AQn5U983Zeo7Fu4uLzQVya4NOXzWdL5NVglwKl4FH8pKZa8sAvrO7R_-1ypKBXpi3cI&_nc_ht=scontent.fdad3-1.fna&oh=82bddc50eea6c8c2b4f771d406b17cc9&oe=5DAEB553"
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 gutterBottom variant="subtitle1">
                    Nguyen Thanh Dung
                  </h2>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>ID:</b> 1030114
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Email:</b> 1004nguyendung@gmail.com
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Phone:</b>0898162560
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Ngày Sinh:</b> 2019-07-18
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b> Chức vụ: </b> Học viên
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Address:</b> hau Hoa Tuyen Hoa Quang Binh
                  </StyleTheP>
                </Grid>
                <Grid item>
                  {this.showNut()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BoxCard>
      )
    }
  }
  // eslint-disable-next-line lines-between-class-members
  showFormEdit = () => {
    if (this.state.trangthai === false) {
      return (
        <BoxCard>
          <StyleH3>Edit Info User</StyleH3>
          <StyleForm noValidate autoComplete="off">
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              defaultValue="1004nguyendung@gmail.com"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Phone"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Ngày Sinh"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Chức Vụ"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Address"
              margin="normal"
              variant="outlined"
            />
            <Grid container md={12} align="center" spacing={3}>
              <Grid item md={6} align="right">
                <Button onClick={() => this.editClick()} variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
              <Grid item md={6} align="left">
                <Button variant="contained" color="primary">
                  Lưu Lại
                </Button>
              </Grid>
            </Grid>
          </StyleForm>
        </BoxCard>
      );
    }
  };

  render() {
    // const dulieu = this.state.data;
    // const idString = this.props.location.pathname;
    // const kq = idString.match(/\d/g);

    // const  idUrl = parseInt(kq);
    // // console.log(idUrl);
    
    // // // console.log(this.state.trangthai);
    // // // console.log(this.state.roles);
    // // // console.log(this.state.data);
    // // console.log(dulieu.map((value) => {
    // //   if(parseInt(value.id) === idUrl) {
    // //     return value.roles;
    // //   }
    // // }));
    return (
      <Section>
        {this.hideFormUser()}
        {this.showFormEdit()}
      </Section>
    );
  }
}
