import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import SectionForm from './SectionForm';
import reducer from './reducers';
import saga from './saga';
import StyleLink from '../../components/StyleLink';
import { getData, getKey } from './actions';
import { makeSelectData, makeSelec } from './selectors';

const key = 'form';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    paddingTop: 2,
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export function People(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [state, setState] = React.useState({
    search: '',
  });
  const [isChangeSelect, setSelect] = React.useState(true);
  const onClickInput = event => {
    if (event && event.target.value !== '') {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    props.onGetData();
    props.onGetKey(state);
  }, [state]);

  return (
    <div>
      <SectionForm>
        <Paper className={classes.root}>
          <TextField
            id="standard-search"
            type="search"
            className={classes.textField}
            margin="normal"
            name="search"
            placeholder="Search user"
            value={state.search}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="standard-select-currency-native"
            select
            label="User select"
            className={classes.textField}
            name="select"
            onChange={handleChange}
            onClick={onClickInput}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your item"
            margin="normal"
          >
            <option value="" />
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="staff">Staffs</option>
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            disabled={isChangeSelect}
            label={state.select || 'Null'}
            className={classes.textField}
            name={state.select}
            onChange={handleChange}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your item"
            margin="normal"
          >
            <option value="" />
            {props.fil ? (
              props.fil.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <option value="" />
            )}
          </TextField>
        </Paper>
      </SectionForm>
      <Section className={classes.table}>
        <MaterialTable
          title="List User"
          columns={[
            { title: 'ID', field: 'id' },
            {
              title: 'FULL NAME',
              render: rowData => `${rowData.firstName} ${rowData.lastName}`,
            },
            { title: 'EMAIL', field: 'email' },
            { title: 'PHONE', field: 'phoneNumber' },
            {
              title: 'View Info',
              render: rowData => (
                <StyleLink to={`/user/info/${rowData.id}`}>View</StyleLink>
              ),
            },
          ]}
          data={props.data}
          options={{
            sorting: true,
            search: false,
          }}
        />
      </Section>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  fil: makeSelec(),
});

const mapDispatchToProps = dispatch => ({
  onGetData: () => dispatch(getData()),
  onGetKey: value => dispatch(getKey(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

People.propTypes = {
  onGetData: PropsTypes.func,
  data: PropsTypes.array,
  onGetKey: PropsTypes.func,
  fil: PropsTypes.array,
};

export default compose(
  withConnect,
  memo,
)(People);
