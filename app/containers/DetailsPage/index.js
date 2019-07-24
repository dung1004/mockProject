/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import BoxCard from './BoxCard';
import StyleTheP from './StyleTheP';
import StyleForm from './StyleForm';
import StyleH3 from '../HomePage/StyleH3';
import { selectHome } from '../App/selectors';
import { fetchData } from '../App/actions';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthai: true,
      roles: 0,
      data: [],
      staff: this.getDataStaff(),
      // name: "",
      // phone: "",
      // permission: "",
    };
  }

  getDataStaff = (oneUser) => {
    // lay id tren url
    const idUrlString = this.props.location.pathname;
    const idString = idUrlString.slice(0, -1);
    const kq = idUrlString.match(/\d/g);
    const idUrl = parseInt(kq);
    console.log(idString);
   
    if(idString === '/giaovien/info/') {
      console.log('chi tiet giao vien');
      if (this.props.users.teacher) {
        const oneUser = this.props.users.teacher.filter( value => value.id === idUrl);
        console.log(oneUser);
        console.log('day la oneUser giao vien');
        return oneUser;
      }
    }else if(idString === '/students/info/') {
      console.log('chi tiet hoc vien');
      if (this.props.users.students) {
        const oneUser = this.props.users.students.filter( value => value.id === idUrl);
        console.log(oneUser);
        console.log('day la oneUser hoc vien');
        return oneUser;
      }
    }else if(idString === '/nhanvien/info/') {
      console.log('chi tiet nhan vien');
      if (this.props.users.staffs) {
        const oneUser = this.props.users.staffs.filter( value => value.id === idUrl);
        console.log(oneUser);
        console.log('day la oneUser nhan vien');
        return oneUser;
      }
    }
    
    // if (this.props.users.staffs) {
    //   const staff = this.props.users.staffs.filter( value => value.id === idUrl);
    //   return staff;
    // }
  }

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
    if (this.state.roles === 1) {
      return <Redirect to='/home' />
    }
  }

  editClick = () => {
    this.setState({
      trangthai: !this.state.trangthai
    })
  }
  // hieen thi form thong tin nhan vien

  showInfoStaffs = () => {
    const { staff } = this.state;
    if(staff){
      return <Grid container item spacing={2} xs={12} justify="center">
        <Grid item>
          <ButtonAvt>
            <StyleAvt
              alt="complex"
              src= {  staff[0].avatar }
              // src= "http://photo.techrum.vn/images/2018/05/22/Lnefu.jpg"
            />
          </ButtonAvt>
        </Grid>
        <Grid item xs={6} container justify="center">
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <h2 variant="subtitle1">
                {`${staff[0].first_name  } ${  staff[0].last_name}`}
              </h2>
              <StyleTheP variant="body1" color="textSecondary">
                <b>ID:</b> {`${staff[0].id  }`}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Email:</b> {`${staff[0].email  }`}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Phone:</b> {`${staff[0].phone_number  }`}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Gender:</b> {`${staff[0].gender  }`}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b> Chức vụ: </b> {`${staff[0].position  }`}
              </StyleTheP>
            </Grid>
            <Grid item>
              {this.showNut()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    }
  }

  hideFormUser = () => {
    if (this.state.trangthai === true) {
      return (
        <BoxCard>
          {this.showInfoStaffs()}
        </BoxCard>
      )
    }
  }

  // eslint-disable-next-line lines-between-class-members
  // theo doi khi chinh sua input 
  isChange = (event) => {
    const {name} = event.target;
    const {value} = event.target;
    this.setState({
      [name]: value,
    })
  }

  // luu lai du lieu sau khi thay doi
  getInfoDataUser = (name, phone, gender, permission) => {
    // dong goi thanh item
    const item = {};
    item.id = this.state.staff[0].id;
    item.first_name = name;
    item.gender = gender;
    item.phone_number = phone;
    item.position = permission;

    const items = this.state.staff;
    items.push(item);

    this.setState({
      staff: items
    })
    this.editClick()

    // console.log(this.state.data);
    // console.log(this.state.staff);
    
  }


  // hien thi form edit khi click
  showFormEdit = () => {
    const { staff } = this.state;
    
    if (this.state.trangthai === false) {
      return (
        <BoxCard>
          <StyleH3>Edit Info User</StyleH3>
          <StyleForm noValidate autoComplete="off">
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              value={staff[0].email}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-disabled"
              label="Edit Name"
              name="name"
              defaultValue={`${staff[0].first_name  } ${  staff[0].last_name}`}
              onChange={(event) => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Phone"
              name="phone"
              defaultValue={staff[0].phone_number}
              onChange={(event) => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Gender"
              name="gender"
              defaultValue={`${staff[0].gender  }`}
              onChange={(event) => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Chức Vụ"
              margin="normal"
              name="permission"
              defaultValue={`${staff[0].position  }`}
              onChange={(event) => this.isChange(event)}
              variant="outlined"
            />
            <Grid container item md={12} align="center" spacing={3}>
              <Grid item md={6} align="right">
                <Button onClick={() => this.editClick()} variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
              <Grid item md={6} align="left">
                <Button variant="contained" color="primary" onClick = {(name, phone, gender, permission) => this.getInfoDataUser(this.state.name, this.state.phone, this.state.gender, this.state.permission)}> 
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
    return (
      <Section>
        {this.showFormEdit()}
        {this.hideFormUser()}
      </Section>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
});
const mapStateToProps = createStructuredSelector({
  users: selectHome,
});
export default connect(mapStateToProps, mapDispatchToProps)(index)