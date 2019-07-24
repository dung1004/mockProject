/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import {selectHome } from '../App/selectors';
import { fetchData } from '../App/actions';

class Students extends Component {
  render() {
    // console.log(this.props.users.students);
    
    return (
      <Section>
        <MaterialTable
          title="List Students"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'NAME', field: 'first_name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'PHONE', field: 'phone_number' },
            {
              title: 'View Info',
              // eslint-disable-next-line no-unused-vars
              render: rowData => (
                <StyleLink component={RouterLink} to={`/students/info/${rowData.id}`}>
                  View
                </StyleLink>
              ),
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
          data = {this.props.users.students}
          options={{
            sorting: true,
          }}
        />
      </Section>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
})
const mapStateToProps = createStructuredSelector({
  users: selectHome,
})
export default connect(mapStateToProps, mapDispatchToProps)(Students)