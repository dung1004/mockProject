import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { fetchData } from '../App/actions';
import { selectData } from '../App/selectors';

export function Index(props) {
  const { students } = props.allData;
  const { teacher } = props.allData;
  const { staffs } = props.allData;
  let listData;
  if (students) {
    listData = students.concat(teacher, staffs);
  }
  // console.log(listData);
  return (
    <Section>
      <MaterialTable
        title="List PeoPle"
        columns={[
          { title: 'ID', field: 'id' },
          {
            title: 'FULL NAME',
            render: rowData => `${rowData.firstName} ${rowData.lastName}`,
          },
          { title: 'EMAIL', field: 'email' },
          { title: 'PHONE', field: 'phoneNumber' },
          {
            title: 'View Info',
            render: rowData => (
              <StyleLink to={`/people/info/${rowData.id}`}>View</StyleLink>
            ),
          },
        ]}
        data={listData}
        options={{
          sorting: true,
        }}
      />
    </Section>
  );
}

const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
});

const mapStateToProps = createStructuredSelector({
  allData: selectData,
});

Index.propTypes = {
  allData: PropsTypes.any,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
