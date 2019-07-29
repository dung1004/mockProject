/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import Section from '../../components/Section';
import Article from '../../components/Article';
import ItemInfo from '../ItemInfo';
import { selectUser } from '../App/selectors';
import { fetchData } from '../App/actions';

class index extends Component {
  getDataClass = () => {
    // lay id tren url
    const idUrlString = this.props.location.pathname;
    const idString = idUrlString.slice(21);

    // khoi tao bien
    const dataClasses = this.props.dataClass.classes;
    const dataTeachers = this.props.dataClass.teacher;
    if (dataClasses) {
      // lay tat ca lop co id bang id url
      const dataClass = dataClasses.filter(item => item.id === idString);
      if (dataTeachers) {
        let itemClass;
        let itemTeacher;
        // xu ly lay thong tin teacher
        for (itemClass of dataClass[0].teacherId) {
          const dataTeacher = dataTeachers.filter(
            item => item.id === itemClass,
          );
          for (itemTeacher of dataTeacher) {
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>{itemTeacher.id}</Typography>
                  <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
                    {itemTeacher.firstName + itemTeacher.lastName}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ItemInfo dataTeacher={itemTeacher} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          }
        }
      }
    }
    return true;
  };

  // lay du lieu hoc vien
  getDataStudent = () => {
    // lay id tren url
    const idUrlString = this.props.location.pathname;
    const idString = idUrlString.slice(21);
    const dataStudents = this.props.dataClass.students;

    if (dataStudents) {
      const arr = [];
      // so sanh id voi id url va lay du lieu cua hoc vien
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < dataStudents.length; i++) {
        dataStudents[i].classId.filter(item =>
          item === idString ? arr.push(dataStudents[i]) : null,
        );
      }
      // return
      if (arr) {
        return arr.map(value => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>{value.id}</Typography>
              <Typography style={{ paddingLeft: '10px' }}>
                {`${value.firstName} ${value.lastName}`}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ItemInfo value={value} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ));
      }
    }
    return true;
  };

  render() {
    return (
      <Article style={{ width: '100%', display: 'flex' }}>
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Giáo Viên Đứng Lớp</h2>
          {this.getDataClass()}
        </Section>
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Danh Sách Học Viên</h2>
          {this.getDataStudent()}
        </Section>
      </Article>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  dataClass: selectUser,
});

const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData());
  },
});

index.propTypes = {
  location: PropsTypes.string,
  dataClass: PropsTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
