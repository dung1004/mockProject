import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import StyleTheP from './StyleTheP';
import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import reducer from './reducers';
import { makeSelectUser } from './selectors';
import saga from './sagas';
import { fetchUser } from './actions';
import Section from '../../components/Section';

const key = 'detpage';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: 'black!important',
  },
  textFieldSelect: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 200,
  },
}));

export function DetailsPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [onload, setStateOnload] = React.useState({
    id: 0,
  });
  const userLevel = JSON.parse(localStorage.getItem('token'));
  const [disabled, setDisabled] = React.useState({
    is: true,
  });
  useEffect(() => {
    props.onFetchUser();
    setStateOnload({ id: 1 });
  }, [onload.id]);
  const classes = useStyles();
  function editClick() {
    setDisabled({
      is: false,
    });
  }
  function onCancel() {
    setDisabled({
      is: true,
    });
  }
  function onBack() {
    window.history.back();
  }
  return (
    <Section>
      {props.dataUser && props.dataUser.length > 0 ? (
        <div>
          <Grid container item spacing={2} xs={12} justify="center">
            <Grid item>
              <ButtonAvt>
                <StyleAvt alt="complex" src={props.dataUser[0].avatar} />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 variant="subtitle1">
                    {`${props.dataUser[0].firstName} ${
                      props.dataUser[0].lastName
                    }`}
                  </h2>
                  <TextField
                    disabled
                    id="standard-email"
                    label="Email"
                    defaultValue={props.dataUser[0].email}
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    disabled={disabled.is}
                    id="standard-phone"
                    label="Phone Number"
                    defaultValue={props.dataUser[0].phoneNumber}
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    disabled={disabled.is}
                    id="standard-select-currency-native"
                    select
                    label="Gender select"
                    className={classes.textFieldSelect}
                    value={props.dataUser[0].gender}
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
                  {props.dataUser[0].position ? (
                    <TextField
                      disabled={disabled.is}
                      id="standard-select-standard-position"
                      select
                      label="Position select"
                      className={classes.textFieldSelect}
                      value={props.dataUser[0].position}
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
                  {props.dataUser[0].description ? (
                    <TextField
                      disabled={disabled.is}
                      id="standard-description"
                      label="Description"
                      defaultValue={props.dataUser[0].description}
                      className={classes.textField}
                      margin="normal"
                    />
                  ) : null}
                  {props.dataUser[0].dateBirth ? (
                    <React.Fragment>
                      <TextField
                        disabled={disabled.is}
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue={props.dataUser[0].dateBirth}
                        className={classes.textFieldSelect}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        disabled={disabled.is}
                        id="standard-address"
                        label="Address"
                        defaultValue={props.dataUser[0].address}
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
                      <label htmlFor="raised-button-file">
                        <Button
                          // variant="raised"
                          component="span"
                          className={classes.button}
                        >
                          Upload
                        </Button>
                      </label>
                    </React.Fragment>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            onClick={
              disabled.is === false && userLevel.level === 0 ? onCancel : onBack
            }
            variant="contained"
            color="secondary"
            type="reset"
          >
            {disabled.is === false && userLevel.level === 0 ? 'Cancel' : 'Back'}
          </Button>
          {userLevel.level === 0 ? (
            <Button
              onClick={disabled.is === true ? editClick : null}
              variant="contained"
              color="secondary"
            >
              {disabled.is === true ? 'Edit' : 'Save'}
            </Button>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectUser(),
});
const mapDispatchToProps = dispatch => ({
  onFetchUser: () => {
    dispatch(fetchUser());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
DetailsPage.propTypes = {
  onFetchUser: PropsTypes.func,
  dataUser: PropsTypes.array,
};

export default compose(
  withConnect,
  memo,
)(DetailsPage);
