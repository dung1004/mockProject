import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import Link from '@material-ui/core/Link';
import MaterialTable from 'material-table';
import PropsTypes from 'prop-types';
import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectData } from '../App/selectors';
import { fetchData } from '../App/actions';

export function About(props) {
  return (
    <Section>
      <MaterialTable
        title="List Nhân Viên"
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'NAME', field: 'first_name' },
          { title: 'EMAIL', field: 'email' },
          { title: 'PHONE', field: 'phone_number' },
          {
            title: 'View Info',
            render: rowData => (
              <StyleLink to={`/staffs/info/${rowData.id}`}>View</StyleLink>
            ),
          },
        ]}
        data={props.dataUserStaffs.staffs}
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
  dataUserStaffs: selectData,
});

About.propTypes = {
  dataUserStaffs: PropsTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
