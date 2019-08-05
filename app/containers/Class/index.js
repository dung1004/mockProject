import React, { useEffect, memo } from 'react';
import MaterialTable from 'material-table';
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

const key = 'class';

export function Teachers(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onFetchClass();
  }, []);
  return (
    <Section>
      {console.log(props.dataClass)}
      <MaterialTable
        title="Thông Tin Lớp Học"
        columns={[
          { title: 'STT', field: 'id' },
          { title: 'Tên Lớp', field: 'classWeekday.roomNumber' },
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
              <StyleLink to={`/class/info-students/${rowData.id}`}>
                View
              </StyleLink>
            ),
          },
        ]}
        data={props.dataClass}
        options={{
          sorting: true,
        }}
      />
    </Section>
  );
}

const mapStateToProps = createStructuredSelector({
  dataClass: makeSelectClass(),
});
const mapDispatchToProps = dispatch => ({
  onFetchClass: () => {
    dispatch(fetchClass());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Teachers.propTypes = {
  onFetchClass: PropsTypes.func,
  dataClass: PropsTypes.array,
};

export default compose(
  withConnect,
  memo,
)(Teachers);
