import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectData } from '../App/selectors';
// import { fetchData } from '../App/actions';

class Teachers extends Component {
  render() {
    return (
      <Section>
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
          data={this.props.dataClass.classes}
          options={{
            sorting: true,
          }}
        />
      </Section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataClass: selectData,
});

// const mapDispatchToProps = dispatch => ({
//   onfetchUser: () => {
//     dispatch(fetchData());
//   },
// });
Teachers.propTypes = {
  dataClass: PropsTypes.any,
};
export default connect(mapStateToProps)(Teachers);
