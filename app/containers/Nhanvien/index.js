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
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }
  

  componentDidMount() {
    apiCaller('users', 'get', null).then(res =>
      this.setState({
        data: res.data,
      }),
    );
  }
  // eslint-disable-next-line lines-between-class-members
  render() {
    const dulieu = this.state.data;
    
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
                <StyleLink component={RouterLink} to={`info/${rowData.id}`}>
                  View
                </StyleLink>
              )
            },
          ]}
          data={dulieu.map((value) => value)}
          options={{
            sorting: true
          }}
        />
      </Section>
    )
  }
}
