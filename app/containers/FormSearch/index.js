import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import MaterialTable from 'material-table';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import reducer from './reducers';
import saga from './saga';
import StyleLink from '../../components/StyleLink';
import { getData, getKey } from './actions';
import { makeSelectData } from './selectors';

const key = 'form';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing(1),
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

export function FormSearch(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [state, setState] = React.useState({
    search: '',
  });

  // const onClickInput = () => {

  // };

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    props.onGetData();
    props.ongetKey(state);
  }, [state]);

  return (
    <div>
      <Section className={classes.root}>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          name="search"
          value={state.search}
          onChange={handleChange}
          // onClick={onClickInput}
        />
        <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          name="select"
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
          <option value="anh1">Anh1</option>
          <option value="anh2">Anh2</option>
          <option value="anh3">Anh3</option>
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
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
          <option value="Em1">Em1</option>
          <option value="Em2">Em2</option>
          <option value="Em3">Em3</option>
        </TextField>
      </Section>
      <Section>
        <MaterialTable
          title="List"
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
                <StyleLink to={`/people/info/${rowData.id}`}>View</StyleLink>
              ),
            },
          ]}
          data={props.data}
          options={{
            sorting: true,
          }}
        />
      </Section>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});

const mapDispatchToProps = dispatch => ({
  onGetData: () => dispatch(getData()),
  ongetKey: value => dispatch(getKey(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

FormSearch.propTypes = {
  onGetData: PropsTypes.func,
  data: PropsTypes.array,
  ongetKey: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(FormSearch);
