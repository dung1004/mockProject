import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropsTypes from 'prop-types';

import BoxCard from '../DetailsPage/BoxCard';
import ButtonAvt from '../DetailsPage/ButtonAvt';
import StyleAvt from '../DetailsPage/StyleAvt';
import StyleTheP from '../DetailsPage/StyleTheP';

export default class ItemInfo extends Component {
  showDataInfo = () => {
    const { dataTeacher } = this.props;
    const { value } = this.props;
    if (value) {
      return (
        <React.Fragment>
          <Grid container spacing={2} item xs={12} justify="center">
            <Grid item xs={6}>
              <ButtonAvt>
                <StyleAvt
                  style={{ borderRadius: '50%', marginRight: '20px' }}
                  alt="complex"
                  src={value.avatar}
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 variant="subtitle1">
                    {value.firstName + value.lastName}
                  </h2>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>ID:</b> {value.id}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Email:</b> {value.email}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Phone:</b>
                    {value.phone_number}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Gender:</b> {value.gender}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>date_birth:</b> {value.date_birth}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>address:</b> {value.address}
                  </StyleTheP>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    if (dataTeacher) {
      return (
        <React.Fragment>
          <Grid container spacing={2} item xs={12} justify="center">
            <Grid item xs={6}>
              <ButtonAvt>
                <StyleAvt
                  style={{ borderRadius: '50%', marginRight: '20px' }}
                  alt="complex"
                  src={dataTeacher.avatar}
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 variant="subtitle1">
                    {dataTeacher.firstName + dataTeacher.lastName}
                  </h2>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>ID:</b> {dataTeacher.id}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Email:</b> {dataTeacher.email}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Phone:</b>
                    {dataTeacher.phone_number}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Gender:</b> {dataTeacher.gender}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Description:</b> {dataTeacher.description}
                  </StyleTheP>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return true;
  };

  render() {
    return (
      <BoxCard style={{ boxShadow: 'none' }}>{this.showDataInfo()}</BoxCard>
    );
  }
}

ItemInfo.propTypes = {
  value: PropsTypes.object,
  dataTeacher: PropsTypes.object,
};
