/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from 'material-table';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectData } from '../App/selectors';
import { fetchUser } from '../App/actions';


class Giaovien extends Component {

  render() {
    // console.log(this.props.users.teacher);
    
    return (
      <Section>
        <MaterialTable
          title="List Giáo Viên"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'NAME', field: 'first_name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'PHONE', field: 'phone_number' },
            {
              title: 'View Info',
              render: rowData => (
                <StyleLink to={`/teachers/info/${rowData.id}`}>
                  View
                </StyleLink>
              )
            },
          ]}
          data={this.props.userTeacher.teacher}
          options={{
            sorting: true
          }}
        />
      </Section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchUser());
  },
});
const mapStateToProps = createStructuredSelector({
  userTeacher: selectData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Giaovien)

