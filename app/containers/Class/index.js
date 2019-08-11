import React, { useEffect, memo } from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { fetchClass, getSearch, getWeekClass } from './actions';
import reducer from './reducers';
import { makeSelectClass, makeDay } from './selectors';
import saga from './saga';
import SectionForm from './SectionForm';

const key = 'class';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px  0 30px 0',
    marginBottom: '10px',
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

function Teachers(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [isCheck, setCheck] = React.useState(false);
  useEffect(() => {
    props.onFetchClass();
  }, []);
  const handleChange = ev => {
    const { value } = ev.target;
    props.onSearchClass(value);
  };
  const handleChangeSelect = ev => {
    const { value } = ev.target;
    props.getWeekClass(value);
  };
  const onClickInput = ev => {
    if (ev && ev.target.value !== '') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const { day, dataClass } = props;
  return (
    <div>
      <SectionForm>
        <h2 style={{ textAlign: 'center' }}>Danh sách sách lớp học</h2>
        <Paper className={classes.root}>
          <TextField
            id="standard-search"
            type="search"
            className={classes.textField}
            margin="normal"
            name="search"
            disabled={isCheck}
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
            label="Weekday select"
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
            {day ? (
              day.map(item => (
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
          title="Thông Tin Lớp Học"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Phòng học', field: 'classWeekday.roomNumber' },
            { title: 'Tên Khóa Học', field: 'name' },
            { title: 'Ngày bắt đầu', field: 'startDay' },
            { title: 'Ngày kết thúc', field: 'endDay' },
            {
              title: 'Lịch dạy',
              render: rowData => {
                const weekdayHours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.weekday}, `,
                );
                return weekdayHours;
              },
            },
            {
              title: 'Giờ dạy',
              render: rowData => {
                const hours = rowData.classWeekday.weekdayHours.map(
                  item => `${item.hours}, `,
                );
                return hours;
              },
            },
            {
              title: 'View Info',
              render: rowData => (
                <StyleLink to={`/class/info/${rowData.id}`}>View</StyleLink>
              ),
            },
          ]}
          data={dataClass}
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
  dataClass: makeSelectClass(),
  day: makeDay(),
});
const mapDispatchToProps = dispatch => ({
  onFetchClass: () => {
    dispatch(fetchClass());
  },
  onSearchClass: keyWord => {
    dispatch(getSearch(keyWord));
  },
  getWeekClass: keyWord => {
    dispatch(getWeekClass(keyWord));
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Teachers.propTypes = {
  onFetchClass: PropsTypes.func,
  dataClass: PropsTypes.array,
  onSearchClass: PropsTypes.func,
  day: PropsTypes.array,
  getWeekClass: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(Teachers);
