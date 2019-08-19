import React, { useEffect, memo } from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
import { fetchClass } from './actions';
import reducer from './reducers';
import { makeSelectClass } from './selectors';
import saga from './saga';
import SectionForm from './SectionForm';
import useStyles from './styles';

const key = 'class';
const admin = 0;
const student = 1;
const teacher = 2;
let yes = true;

function Teachers(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [isCheck, setCheck] = React.useState(false);
  const [state, setState] = React.useState({
    data: [],
    day: [],
  });
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    props.onFetchClass();
  }, []);
  if (token && props.data && props.data.dataClass) {
    const weekday = [];
    switch (token.level) {
      case admin:
        props.data.dataClass.forEach(element =>
          element.classWeekday.weekdayHours.filter(item =>
            item.weekday !== '' ? weekday.push(item.weekday) : null,
          ),
        );
        if (yes) {
          setState({
            ...state,
            data: props.data.dataClass,
            day: [...new Set(weekday)],
          });
        }
        yes = false;
        break;
      case student:
        break;
      case teacher:
        break;
      default:
        break;
    }
    // }
  }

  const handleChange = ev => {
    const { value } = ev.target;
    // props.onSearchClass(value);
    console.log(value);
  };

  const handleChangeSelect = ev => {
    const { value } = ev.target;
    // props.getWeekClass(value);
    console.log(value);
  };

  const onClickInput = ev => {
    if (ev && ev.target.value !== '') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // const { day, dataClass } = props;
  console.log(props.data);
  console.log(state);
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
            {state.day ? (
              state.day.map(item => (
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
            // { title: 'STT', field: 'id' },
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
          data={state.data || props.data.dataClass}
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
  data: makeSelectClass(),
  // day: makeDay(),
});
const mapDispatchToProps = dispatch => ({
  onFetchClass: () => {
    dispatch(fetchClass());
  },
  // onSearchClass: keyWord => {
  //   dispatch(getSearch(keyWord));
  // },
  // getWeekClass: keyWord => {
  //   dispatch(getWeekClass(keyWord));
  // },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Teachers.propTypes = {
  onFetchClass: PropsTypes.func,
  data: PropsTypes.object,
  // onSearchClass: PropsTypes.func,
  // day: PropsTypes.array,
  // getWeekClass: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(Teachers);
