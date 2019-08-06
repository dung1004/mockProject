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
}));

export function DetailsPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onFetchUser();
  }, []);
  const classes = useStyles();
  return (
    <Section>
      {props.dataUser ? (
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
                  disabled
                  id="standard-phone"
                  label="Phone Number"
                  defaultValue={props.dataUser[0].phoneNumber}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="standard-gender"
                  label="Gender"
                  defaultValue={props.dataUser[0].gender}
                  className={classes.textField}
                  margin="normal"
                />
                {props.dataUser[0].position ? (
                  <TextField
                    disabled
                    id="standard-position"
                    label="Position"
                    defaultValue={props.dataUser[0].position}
                    className={classes.textField}
                    margin="normal"
                  />
                ) : null}
                {props.dataUser[0].description ? (
                  <TextField
                    disabled
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
                      disabled
                      id="standard-dateBirth"
                      label="Date Birth"
                      defaultValue={props.dataUser[0].dateBirth}
                      className={classes.textField}
                      margin="normal"
                    />
                    <TextField
                      disabled
                      id="standard-address"
                      label="Address"
                      defaultValue={props.dataUser[0].address}
                      className={classes.textField}
                      margin="normal"
                    />
                  </React.Fragment>
                ) : null}
                {/* <StyleTheP variant="body1" color="textSecondary">
                <b>ID:</b> {props.dataUser[0].id}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Email:</b> {}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Phone:</b> {props.dataUser[0].phoneNumber}
              </StyleTheP>
              <StyleTheP variant="body1" color="textSecondary">
                <b>Gender:</b> {props.dataUser[0].gender}
              </StyleTheP>
              {props.dataUser[0].position ? (
                <StyleTheP variant="body1" color="textSecondary">
                  <b> Chức vụ: </b> {`${props.dataUser[0].position}`}
                </StyleTheP>
              ) : null}
              {props.dataUser[0].description ? (
                <StyleTheP variant="body1" color="textSecondary">
                  <b> description: </b> {`${props.dataUser[0].description}`}
                </StyleTheP>
              ) : null}
              {props.dataUser[0].dateBirth ? (
                <React.Fragment>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b> DateBirth: </b> {`${props.dataUser[0].dateBirth}`}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b> Address: </b> {`${props.dataUser[0].address}`}
                  </StyleTheP>
                </React.Fragment>
              ) : null} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
