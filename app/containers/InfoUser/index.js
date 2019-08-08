import React, { useEffect, memo } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Section from '../../components/Section';
import { getData } from './actions';
import reducer from './reducers';
import { makeSelectStudent, makeSelectTeacher } from './selectors';
import saga from './sagas';
import ItemInfo from '../ItemInfo';

const key = 'info';

export function Info(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.onGetData();
  }, []);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {props.teachers && props.teachers.length > 0 ? (
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Giáo Viên Đứng Lớp</h2>
          {props.teachers.map(teacher => (
            <ExpansionPanel key={teacher.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>{teacher.id}</Typography>
                <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
                  {`${teacher.firstName}${teacher.lastName}`}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ItemInfo teacher={teacher} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
      ) : null}
      {props.students && props.students.length > 0 ? (
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Danh Sách Học Viên</h2>
          {props.students.map(student => (
            <ExpansionPanel key={student.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>{student.id}</Typography>
                <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
                  {`${student.firstName}${student.lastName}`}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ItemInfo student={student} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  students: makeSelectStudent(),
  teachers: makeSelectTeacher(),
});
const mapDispatchToProps = dispatch => ({
  onGetData: () => {
    dispatch(getData());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Info.propTypes = {
  onGetData: PropsTypes.func,
  students: PropsTypes.array,
  teachers: PropsTypes.array,
};

export default compose(
  withConnect,
  memo,
)(Info);
