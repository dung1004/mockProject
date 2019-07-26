/* eslint-disable import/named */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, {useEffect, Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import Link from '@material-ui/core/Link';
import MaterialTable from 'material-table';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectUser } from '../App/selectors';
import { fetchData } from '../App/actions';



class About extends Component {
  
  render(){
    // console.log(this.props.dataUserStaffs.staffs);
    

    return (
      <Section>
        <MaterialTable
          title="List Nhân Viên"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'NAME', field: 'first_name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'PHONE', field: 'phone_number' },
            { title: 'View Info',
              render: rowData => (
                <StyleLink to={`/staffs/info/${rowData.id}`}>
                  View
                </StyleLink>
              )
            },
          ]}
     
          data={this.props.dataUserStaffs.staffs}

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
    dispatch(fetchData());
  },
});
const mapStateToProps = createStructuredSelector({
  dataUserStaffs: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(About)