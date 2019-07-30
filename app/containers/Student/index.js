import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PropsTypes from 'prop-types';
import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
// import { makeSelectLevel } from '../App/selectors';
import { fetchData } from '../App/actions';
import { selectData } from '../App/selectors';

export function Students(props) {
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
        data={props.userStudent.students}
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
  userStudent: selectData,
});

Students.propTypes = {
  userStudent: PropsTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Students);
