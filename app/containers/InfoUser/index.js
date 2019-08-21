// import React, { useEffect, memo } from 'react';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import PropsTypes from 'prop-types';
// import { ToastContainer } from 'react-toastify';

// import { compose } from 'redux';
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import Section from '../../components/Section';
// import { getData } from './actions';
// import reducer from './reducers';
// import { makeSelectData } from './selectors';
// import { makeSelectLocation } from '../App/selectors';
// import saga from './sagas';
// import ItemInfo from '../ItemInfo';

// const key = 'info';
// const token = JSON.parse(localStorage.getItem('token'));
// const admin = 0;
// const teacher = 1;
// const student = 2;

// function Info(props) {
//   useInjectReducer({ key, reducer });
//   useInjectSaga({ key, saga });

//   const id = props.path ? props.path.pathname.slice(12) : null;

//   function checkRole(role, allClass, teachers, students) {
//     const dataClass = [];
//     const dataStudent = [];
//     const dataTeacher = [];
//     switch (role) {
//       case admin:
//         // const dataClass = allClass.filter(cla => cla.id === id);
//         // allClass.forEach(cla => (cla.id === id ? dataClass.push(cla) : null));
//         console.log(dataClass[0]);
//         console.log(role, allClass, teachers, students, 'bcabcb');
//         dataClass[0].teacherId.forEach(tId => {
//           console.log("cmm");
//           teachers.filter(item =>
//             item.id === tId ? dataTeacher.push(item) : null,
//           );
//         });
//         console.log(dataTeacher);
//         // students.forEach(item => {
//         //   item.classId.filter(classId =>
//         //     classId === dataClass.id ? dataStudent.push(item) : null,
//         //   );
//         // });
//         // console.log(dataClass, dataStudent, dataTeacher);
//         break;
//       case teacher:
//         break;
//       case student:
//         break;

//       default:
//         break;
//     }
//   }

//   // const { dataClass, dataStudent, dataTeacher } = props;
//   // const zxc = props.dataClass
//   //   ? checkRole(
//   //       token.level,
//   //       props.dataClass,
//   //       props.dataStudent,
//   //       props.dataTeacher,
//   //     )
//   //   : null;

//   useEffect(() => {
//     props.onGetData();
//   }, []);

//   useEffect(() => {
//     if (props.data && props.data.dataClass) {
//       console.log(props.data.dataClass);
//       checkRole(
//         token.level,
//         props.data.dataClass,
//         props.data.dataStudent,
//         props.data.dataTeacher,
//       );
//     }
//   }, [props.data]);

//   // console.log(dataClass, dataStudent, dataTeacher);

//   return (
//     <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//       {/* {props.teachers && props.teachers.length > 0 ? (
//         <Section style={{ width: '50%', padding: '50px 5px' }}>
//           <h2 style={{ textAlign: 'center' }}>Giáo Viên Đứng Lớp</h2>
//           {props.teachers.map(teacher => (
//             <ExpansionPanel key={teacher.id}>
//               <ExpansionPanelSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel4bh-content"
//                 id="panel4bh-header"
//               >
//                 <Typography>{teacher.id}</Typography>
//                 <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
//                   {`${teacher.firstName}${teacher.lastName}`}
//                 </Typography>
//               </ExpansionPanelSummary>
//               <ExpansionPanelDetails>
//                 <ItemInfo teacher={teacher} />
//               </ExpansionPanelDetails>
//             </ExpansionPanel>
//           ))}
//         </Section>
//       ) : null}
//       {props.students && props.students.length > 0 ? (
//         <Section style={{ width: '50%', padding: '50px 5px' }}>
//           <h2 style={{ textAlign: 'center' }}>Danh Sách Học Viên</h2>
//           {props.students.map(student => (
//             <ExpansionPanel key={student.id}>
//               <ExpansionPanelSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel4bh-content"
//                 id="panel4bh-header"
//               >
//                 <Typography>{student.id}</Typography>
//                 <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
//                   {`${student.firstName}${student.lastName}`}
//                 </Typography>
//               </ExpansionPanelSummary>
//               <ExpansionPanelDetails>
//                 <ItemInfo student={student} />
//               </ExpansionPanelDetails>
//             </ExpansionPanel>
//           ))}
//         </Section>
//       ) : null} */}
//       <ToastContainer autoClose={2000} />
//     </div>
//   );
// }

// const mapStateToProps = createStructuredSelector({
//   data: makeSelectData(),
//   path: makeSelectLocation(),
// });
// const mapDispatchToProps = dispatch => ({
//   onGetData: () => {
//     dispatch(getData());
//   },
// });
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
// Info.propTypes = {
//   onGetData: PropsTypes.func,
//   data: PropsTypes.object,
//   path: PropsTypes.object,
// };

// export default compose(
//   withConnect,
//   memo,
// )(Info);
