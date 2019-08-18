import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ToastContainer } from 'react-toastify';

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
import { getData } from './actions';
import { makeSelectData, makeUsers } from './selectors';
import useStyles from './styles';

const key = 'form';

function People(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [state, setState] = React.useState({});
  const [isChangeSelect, setSelect] = React.useState(true);
  const onClickInput = event => {
    if (event && event.target.value !== '') {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };

  function filterData(arr, keyword) {
    return arr.filter(
      item =>
        `${item.firstName} ${item.lastName}`
          .trim()
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()) ||
        item.email
          .trim()
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()) ||
        item.phoneNumber.trim().includes(keyword.trim()),
    );
  }

  const handleChange = event => {
    const { value } = event.target;
    const data = filterData(props.data, value);
    setState({
      data,
    });
  };

  const handleChangeSelect = event => {
    const { value } = event.target;
    setState({
      data: props.users[`${value}`],
    });
  };

  useEffect(() => {
    props.onGetData();
  }, []);

  useEffect(() => {
    setState({
      data: props.data,
      users: props.users,
    });
  }, [props.data]);

  return (
    <div>
      <SectionForm>
        <h2 style={{ textAlign: 'center' }}>Danh sách người dùng</h2>
        <Paper className={classes.root}>
          <TextField
            id="standard-search"
            type="search"
            className={classes.textField}
            margin="normal"
            name="search"
            placeholder="Search user"
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
            onChange={handleChangeSelect}
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
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="staffs">Staffs</option>
          </TextField>
          {!isChangeSelect ? (
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
              {/* {props.fil ? (
                props.fil.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option value="" />
              )} */}
            </TextField>
          ) : null}
        </Paper>
      </SectionForm>
      <Section className={classes.table}>
        <MaterialTable
          title={state.select ? `List ${state.select}` : 'List user'}
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
          data={state.data || props.data}
          options={{
            sorting: true,
            search: false,
          }}
        />
      </Section>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  users: makeUsers(),
});

const mapDispatchToProps = dispatch => ({
  onGetData: () => dispatch(getData()),
  // onSearch: value => dispatch(onSearch(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

People.propTypes = {
  onGetData: PropsTypes.func,
  data: PropsTypes.array,
  // onSearch: PropsTypes.func,
  users: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(People);
