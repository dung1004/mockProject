import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import Section from '../../components/Section';
import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import BoxCard from './BoxCard';
import StyleTheP from './StyleTheP';
import StyleForm from './StyleForm';
import StyleH3 from '../HomePage/StyleH3';
import { selectData } from '../App/selectors';
import { fetchData } from '../App/actions';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthai: true,
      roles: 0,
      data: [],
      dataUser: this.getDataAllUser(),
    };
  }

  // lay du lieu tat ca
  getDataAllUser = () => {
    // lay id tren url
    const idUrlString = this.props.location.pathname;
    const idString = idUrlString.slice(13);

    // so sanh duong dan voi url
    if (idString !== null) {
      const { students } = this.props.users;
      const { teacher } = this.props.users;
      const { staffs } = this.props.users;
      let listData;
      if (students) {
        listData = students.concat(teacher, staffs);
      }
      let oneUser;
      if (students) {
        oneUser = listData.filter(value => value.id === idString);
      }
      return oneUser;
    }
    return true;
  };

  // kiem tra roles
  showNut = () => {
    if (this.state.roles === 0) {
      return (
        <Button onClick={this.editClick} variant="contained" color="secondary">
          Edit
        </Button>
      );
    }
    return (
      <Button
        onClick={() => this.vetrangchu()}
        variant="contained"
        color="secondary"
      >
        Tro Lai
      </Button>
    );
  };

  // quay ve trang chu
  vetrangchu = () => {
    if (this.state.roles === 1) {
      return <Redirect to="/home" />;
    }
    return true;
  };

  // tro lai
  editClick = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      trangthai: !this.state.trangthai,
    });
  };

  // hieen thi form thong tin user
  showInfoStaffs = () => {
    const { dataUser } = this.state;
    if (dataUser) {
      return (
        <Grid container item spacing={2} xs={12} justify="center">
          <Grid item>
            <ButtonAvt>
              <StyleAvt alt="complex" src={dataUser[0].avatar} />
            </ButtonAvt>
          </Grid>
          <Grid item xs={6} container justify="center">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h2 variant="subtitle1">
                  {`${dataUser[0].firstName} ${dataUser[0].lastName}`}
                </h2>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>ID:</b> {`${dataUser[0].id}`}
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Email:</b> {`${dataUser[0].email}`}
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Phone:</b> {`${dataUser[0].phoneNumber}`}
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Gender:</b> {`${dataUser[0].gender}`}
                </StyleTheP>

                {/* kiem tra dieu kien de hien thi du lieu */}
                {dataUser[0].position ? (
                  <StyleTheP variant="body1" color="textSecondary">
                    <b> Chức vụ: </b> {`${dataUser[0].position}`}
                  </StyleTheP>
                ) : null}
                {dataUser[0].description ? (
                  <StyleTheP variant="body1" color="textSecondary">
                    <b> description: </b> {`${dataUser[0].description}`}
                  </StyleTheP>
                ) : null}
                {dataUser[0].dateBirth ? (
                  <React.Fragment>
                    <StyleTheP variant="body1" color="textSecondary">
                      <b> DateBirth: </b> {`${dataUser[0].dateBirth}`}
                    </StyleTheP>
                    <StyleTheP variant="body1" color="textSecondary">
                      <b> Address: </b> {`${dataUser[0].address}`}
                    </StyleTheP>
                  </React.Fragment>
                ) : null}
              </Grid>
              <Grid item>{this.showNut()}</Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return true;
  };

  // kiem tra state true ? show : hide
  hideFormUser = () => {
    if (this.state.trangthai === true) {
      return <BoxCard>{this.showInfoStaffs()}</BoxCard>;
    }
    return true;
  };

  // theo doi khi chinh sua input
  isChange = event => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // luu lai du lieu sau khi thay doi
  getInfoDataUser = (name, phone, gender, permission) => {
    // dong goi thanh item
    const item = {};
    item.id = this.state.dataUser[0].id;
    item.firstName = name;
    item.gender = gender;
    item.phoneNumber = phone;
    item.position = permission;

    // eslint-disable-next-line react/no-access-state-in-setstate
    const items = this.state.data;
    items.push(item);

    this.setState({
      dataUser: items,
    });
    this.editClick();
  };

  // hien thi form edit khi click
  showFormEdit = () => {
    const { dataUser } = this.state;

    if (this.state.trangthai === false) {
      return (
        <BoxCard>
          <StyleH3>Edit Info User</StyleH3>
          <StyleForm noValidate autoComplete="off">
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              defaultValue={dataUser[0].email}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-disabled"
              label="Edit Name"
              name="name"
              defaultValue={`${dataUser[0].firstName} ${dataUser[0].lastName}`}
              onChange={event => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Phone"
              name="phone"
              defaultValue={dataUser[0].phoneNumber}
              onChange={event => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Gender"
              name="gender"
              defaultValue={`${dataUser[0].gender}`}
              onChange={event => this.isChange(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-dense"
              label="Edit Chức Vụ"
              margin="normal"
              name="permission"
              defaultValue={`${dataUser[0].position}`}
              onChange={event => this.isChange(event)}
              variant="outlined"
            />
            <Grid container item md={12} align="center" spacing={3}>
              <Grid item md={6} align="right">
                <Button
                  onClick={() => this.editClick()}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item md={6} align="left">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    this.getInfoDataUser(
                      this.state.name,
                      this.state.phone,
                      this.state.gender,
                      this.state.permission,
                    )
                  }
                >
                  Lưu Lại
                </Button>
              </Grid>
            </Grid>
          </StyleForm>
        </BoxCard>
      );
    }
    return true;
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
  users: selectData,
});
index.propTypes = {
  location: PropsTypes.string,
  users: PropsTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
