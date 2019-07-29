/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
// import { makeSelectLevel } from '../App/selectors';
import { fetchData } from '../App/actions';
import { selectData } from '../App/selectors';

class Students extends Component {
  render() {
    
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
                <StyleLink to={`/student/info/${rowData.id}`}>View</StyleLink>
              ),
            },
          ]}
          data = {this.props.userStudent.students}
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
  userStudent: selectData,
})
export default connect(mapStateToProps, mapDispatchToProps)(Students)