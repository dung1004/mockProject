/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
// import Link from '@material-ui/core/Link';
import MaterialTable from 'material-table';
import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import apiCaller from '../../utils/apiCaller';


export default class About extends Component {
  // eslint-disable-next-line lines-between-class-members
  render() {
    return (
      <Section>
        <MaterialTable
          title="List Nhân Viên"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'NAME', field: 'name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'PHONE', field: 'phone' },
            { title: 'View Info',
              render: rowData => (
                <StyleLink to={`/staffs/info/${rowData.id}`}>
                  View
                </StyleLink>
              )
            },
          ]}
          data={[
            {
              id: 1,
              name: 'Mehmet',
              email: 'drauotlart@gmail.com',
              phone: '0898162560',
            },
            {
              id: 2,
              name: 'Duy Thuan',
              email: 'tunglv96@gmail.com',
              phone: '06782671987',
            },
            {
              id: 3,
              name: 'Van Tung',
              email: 'nguyenduythuan@gmail.com',
              phone: '0809762560',
            },
            {
              id: 4,
              name: 'Nguyen Dung',
              email: '1004nguyendung@gmail.com',
              phone: '0898168975',
            },
            {
              id: 5,
              name: 'Ngoc Vinh',
              email: 'ngocvinhptm@gmail.com',
              phone: '0898367820',
            },
          ]}
          options={{
            sorting: true
          }}
        />
      </Section>
    )
  }
}
