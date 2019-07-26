/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectUser } from '../App/selectors';
import { fetchData } from '../App/actions'

class Teachers extends Component {
  render() {
    console.log(this.props.dataClass);

    return (
      <Section>
        <MaterialTable
          title="Thông Tin Lớp Học"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Tên Lớp', field: 'class_weekday.room_number' },
            { title: 'Tên Khóa Học', field: 'name' },
            { title: 'Ngày bắt đầu', field: 'start_day' },
            { title: 'Ngày kết thúc', field: 'end_day' },
            { 
              title: 'Lịch dạy', 
              // field: 'class_weekday.weekday_hours[0].weekday',
              render: rowData => {
                const weekday_hours = rowData.class_weekday.weekday_hours.map(item => `${item.weekday}, `)
                return weekday_hours;
              }
            },
            { 
              title: 'Giờ dạy', 
              render: rowData => {
                const hours = rowData.class_weekday.weekday_hours.map(item => `${item.hours}, `)
                return hours;
                
              }
            },
            {
              title: 'View Info',
              // eslint-disable-next-line no-unused-vars
              render: rowData => (
                <StyleLink to={`/class/info-students/${rowData.id}`}>
                  View
                </StyleLink>
              ),
            },
          ]}
          // eslint-disable-next-line react/prop-types
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
  dataClass: selectUser
})
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData())
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Teachers)
