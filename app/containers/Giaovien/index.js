import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from 'material-table';

import PropsTypes from 'prop-types';
import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { selectData } from '../App/selectors';

export function Giaovien(props) {
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
              <StyleLink to={`/teachers/info/${rowData.id}`}>View</StyleLink>
            ),
          },
        ]}
        data={props.userTeacher.teacher}
        options={{
          sorting: true,
        }}
      />
    </Section>
  );
}

const mapStateToProps = createStructuredSelector({
  userTeacher: selectData,
});

Giaovien.propTypes = {
  userTeacher: PropsTypes.object,
};

export default connect(mapStateToProps)(Giaovien);
