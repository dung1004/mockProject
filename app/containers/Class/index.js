/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialTable from 'material-table';
import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';

export default class Teachers extends Component {
  render() {
    // eslint-disable-next-line prettier/prettier
    return (
      <Section>
        <MaterialTable
          title="Thông Tin Lớp Học"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Name Class', field: 'name' },
            { title: 'Lịch dạy', field: 'thoigian' },
            { title: 'Thời gian dạy', field: 'thoigianday' },
            { title: 'Mô tả môn học', field: 'mota' },
            {
              title: 'View Info',
              // eslint-disable-next-line no-unused-vars
              render: rowData => (
                <StyleLink component={RouterLink} to={`/class/infoUser/${rowData.name}`}>
                  View
                </StyleLink>
              ),
            },
          ]}
          data={[
            {
              id: 1,
              name: '17I1',
              thoigian: 'thứ 2, thứ 5, thứ 7',
              thoigianday: '19h-21h',
              mota: 'Khóa học về giao tiếp cơ bản cho người mới bắt đầu',
            },
            {
              id: 2,
              name: '17A6',
              thoigian: 'thứ 2, thứ 4, thứ 7',
              thoigianday: '18h-20h',
              mota: 'Khóa học về Nghe nói và viết với người bản địa',
            },
          ]}
          options={{
            sorting: true,
          }}
        />
      </Section>
    );
  }
}
