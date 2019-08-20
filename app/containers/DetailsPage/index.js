import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialTable from 'material-table';
// import Skeleton from '@material-ui/lab/Skeleton';

import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import reducer from './reducers';
import { makeSelectUser, selectSave } from './selectors';
import saga from './sagas';
import { fetchUser, editUser, calcelEdit } from './actions';
import Section from '../../components/Section';
import { useStyles } from './style';

const key = 'detpage';

function DetailsPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const userLevel = JSON.parse(localStorage.getItem('token'));
  const [disabled, setDisabled] = React.useState({
    is: true,
  });
  useEffect(() => {
    props.onFetchUser();
  }, []);
  const classes = useStyles();
  const [state, setState] = React.useState();
  function editClick() {
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      position,
      description,
      dateBirth,
      address,
      avatar,
    } = props.dataUser;
    setDisabled({
      is: false,
    });
    setState({
      id,
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || '',
      gender: gender || '',
      position: position || '',
      description: description || '',
      dateBirth: dateBirth || '',
      address: address || '',
      avatar: avatar || '',
    });
  }
  function onCancel() {
    setDisabled({
      is: true,
    });
    props.onCancelEdit();
  }
  function onSave() {
    props.onEditUser(state);
    setDisabled({
      is: true,
    });
  }
  function onBack() {
    window.history.back();
  }
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { dataUser } = props;

  return (
    <Section>
      {props.dataUser && Object.keys(props.dataUser).length > 0 ? (
        <Grid
          container
          item
          xs={12}
          justify="center"
          className={classes.boxInfo}
        >
          {
            <Paper>
              <div>
                <h2 className={classes.titleH2}>Thông tin cá nhân</h2>
              </div>
              <Grid container item spacing={2} xs={12} justify="center">
                <Grid item>
                  <ButtonAvt>
                    <StyleAvt alt="complex" src={props.dataUser.avatar} />
                  </ButtonAvt>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      {disabled.is ? (
                        <h2 variant="subtitle1">
                          {`${props.dataUser.firstName} ${
                            props.dataUser.lastName
                          }`}
                        </h2>
                      ) : null}
                      {!disabled.is ? (
                        <div>
                          <TextField
                            id="standard-name"
                            label="First Name"
                            onChange={handleChange}
                            defaultValue={props.dataUser.firstName}
                            className={classes.textField}
                            margin="normal"
                            name="firstName"
                          />
                          <TextField
                            id="standard-name"
                            label="Last Name"
                            onChange={handleChange}
                            defaultValue={props.dataUser.lastName}
                            className={classes.textField}
                            margin="normal"
                            name="lastName"
                          />
                        </div>
                      ) : null}
                      <TextField
                        disabled={disabled.is || true}
                        id="standard-email"
                        label="Email"
                        onChange={handleChange}
                        value={props.dataUser.email}
                        className={classes.textField}
                        margin="normal"
                        name="email"
                      />
                      <TextField
                        disabled={disabled.is}
                        id="standard-phone"
                        label="Phone Number"
                        onChange={handleChange}
                        value={props.dataUser.phoneNumber}
                        className={classes.textField}
                        margin="normal"
                        name="phoneNumber"
                      />
                      <TextField
                        disabled={disabled.is}
                        id="standard-select-currency-native"
                        select
                        label="Gender select"
                        className={classes.textFieldSelect}
                        value={props.dataUser.gender}
                        onChange={handleChange}
                        name="gender"
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </TextField>
                      {props.dataUser.position ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-select-standard-position"
                          select
                          label="Position select"
                          className={classes.textFieldSelect}
                          value={props.dataUser.position}
                          name="position"
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                        >
                          <option value="Giám đốc">Giám đốc</option>
                          <option value="Nhân viên">Nhân viên</option>
                          <option value="Phó Giám Đốc">Phó Giám Đốc</option>
                        </TextField>
                      ) : null}
                      {props.dataUser.description ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-description"
                          label="Description"
                          name="description"
                          multiline
                          rowsMax="5"
                          onChange={handleChange}
                          value={props.dataUser.description}
                          className={classes.textField}
                          margin="normal"
                        />
                      ) : null}
                      {props.dataUser.dateBirth ? (
                        <React.Fragment>
                          <TextField
                            disabled={disabled.is}
                            id="date"
                            label="Birthday"
                            type="date"
                            name="dateBirth"
                            onChange={handleChange}
                            value={props.dataUser.dateBirth}
                            className={classes.textFieldSelect}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            disabled={disabled.is}
                            id="standard-address"
                            label="Address"
                            name="address"
                            onChange={handleChange}
                            value={props.dataUser.address}
                            className={classes.textFieldSe}
                            margin="normal"
                          />
                        </React.Fragment>
                      ) : null}
                      {disabled.is === false ? (
                        <React.Fragment>
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                          />
                          <label
                            htmlFor="raised-button-file"
                            className={classes.labelUp}
                          >
                            <Button
                              component="span"
                              className={classes.buttonUp}
                            >
                              Upload Avatar
                            </Button>
                          </label>
                        </React.Fragment>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.divBtn}>
                <Button
                  className={classes.button}
                  onClick={
                    disabled.is === false && userLevel.level === 0
                      ? onCancel
                      : onBack
                  }
                  variant="contained"
                  color="secondary"
                  type="reset"
                >
                  {disabled.is === false && userLevel.level === 0
                    ? 'Cancel'
                    : 'Back'}
                </Button>
                {userLevel.level === 0 ? (
                  <Button
                    className={classes.button}
                    onClick={disabled.is === true ? editClick : onSave}
                    variant="contained"
                    color="secondary"
                  >
                    {disabled.is === true ? 'Edit' : 'Save'}
                  </Button>
                ) : null}
              </div>
            </Paper>
          }
        </Grid>
      ) : null}
      {dataUser && dataUser.classes && dataUser.classes.length > 0 ? (
        <MaterialTable
          title="Thông tin giảng dạy"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Phòng học', field: 'classWeekday.roomNumber' }, // classWeekday.roomNumber
            { title: 'Tên Khóa Học', field: 'name' },
            { title: 'Ngày bắt đầu', field: 'startDay' },
            { title: 'Ngày kết thúc', field: 'endDay' },
            {
              title: 'Lịch dạy',
              field: 'lichday',
              render: rowData => {
                const weekdayHours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.weekday}`,
                );
                return weekdayHours;
              },
            },
            {
              title: 'Giờ dạy',
              field: 'gioday',
              render: rowData => {
                const hours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.hours}, `,
                );
                return hours;
              },
            },
          ]}
          data={props.dataUser.classes}
          options={{
            sorting: false,
            search: false,
            showFirstLastPageButtons: false,
            paging: false,
          }}
        />
      ) : null}
      {dataUser && dataUser.idClass && dataUser.idClass.length > 0 ? (
        <MaterialTable
          title="Lịch học của học viên"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Phòng học', field: 'classWeekday.roomNumber' }, // classWeekday.roomNumber
            { title: 'Tên Khóa Học', field: 'name' },
            { title: 'Ngày bắt đầu', field: 'startDay' },
            { title: 'Ngày kết thúc', field: 'endDay' },
            {
              title: 'Lịch học',
              field: 'lichday',
              render: rowData => {
                const weekdayHours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.weekday}`,
                );
                return weekdayHours;
              },
            },
            {
              title: 'Giờ học',
              field: 'gioday',
              render: rowData => {
                const hours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.hours}, `,
                );
                return hours;
              },
            },
          ]}
          data={props.dataUser.idClass}
          options={{
            sorting: false,
            search: false,
            showFirstLastPageButtons: false,
            paging: false,
          }}
        />
      ) : null}
      <ToastContainer autoClose={2000} />
    </Section>
  );
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectUser(),
  isSave: selectSave(),
});
const mapDispatchToProps = dispatch => ({
  onFetchUser: () => {
    dispatch(fetchUser());
  },
  onEditUser: values => {
    dispatch(editUser(values));
  },
  onCancelEdit: () => {
    dispatch(calcelEdit());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
DetailsPage.propTypes = {
  onFetchUser: PropsTypes.func,
  dataUser: PropsTypes.object,
  onEditUser: PropsTypes.func,
  onCancelEdit: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(DetailsPage);
