/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../../components/Section';
import ItemInfo from '../ItemInfo';
import { selectUser } from '../App/selectors';
import { fetchData } from '../App/actions'


// eslint-disable-next-line react/prefer-stateless-function
class ControlledExpansionPanels extends Component {
  getDataClass = () => {
    // lay id tren url
    const idUrlString = this.props.location.pathname;
    // const idString = idUrlString.slice(0, -1);
    const kq = idUrlString.match(/\d/g);
    const idUrl = parseInt(kq);
    console.log(this.props.dataClass.students);

    if(this.props.dataClass.students) {
      // const classId = this.props.dataClass.students.map(value => value.class_id);
      const classId = this.props.dataClass.students.filter(value => value.class_id.filter(item => item === [2]));
      console.log(classId);
      
    }
    
    // this.props.dataClass.students.map(value => value.class_id) 
  }

  render() {
    // console.log(this.props.dataClass.students);
    console.log(this.getDataClass());
    return (
      <Section >
        <h2 style={{ textAlign: "center" }}>Danh Sách Học Viên</h2>
        <div>
          <ExpansionPanel
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography >
                1
              </Typography>
              <Typography >
                NGUYỄN THANH DŨNG
              </Typography>
              <Typography>
                Quảng Bình
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ItemInfo />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography >
                2
              </Typography>
              <Typography >
                LÊ VĂN TÙNG
              </Typography>
              <Typography>
                Đà Nẵng
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ItemInfo />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography >
                3
              </Typography>
              <Typography >
                NGUYỄN DUY THUẦN
              </Typography>
              <Typography>
                Quảng Nam
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ItemInfo />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography >
                4
              </Typography>
              <Typography >
                NGUYỄN NGỌC VINH
              </Typography>
              <Typography>
                Quảng Trạch
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ItemInfo />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Section>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  dataClass: selectUser
})
const mapDispatchToProps = dispatch => ({
  onfetchUser: () => {
    dispatch(fetchData())
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlledExpansionPanels)