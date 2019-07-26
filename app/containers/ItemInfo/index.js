/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import BoxCard from '../DetailsPage/BoxCard';
import ButtonAvt from '../DetailsPage/ButtonAvt';
import StyleAvt from '../DetailsPage/StyleAvt';
import StyleTheP from '../DetailsPage/StyleTheP';

export default class ItemInfo extends Component {
  render() {
    return (
      <BoxCard style={{boxShadow:"none"}}>
        <Grid container spacing={2} item xs={12} justify="center">
          <Grid item xs={6}>
            <ButtonAvt>
              <StyleAvt style={{borderRadius: '50%', marginRight: '20px'}}
                alt="complex"
                src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/66511901_352607552306976_236412562093113344_n.jpg?_nc_cat=102&_nc_oc=AQn5U983Zeo7Fu4uLzQVya4NOXzWdL5NVglwKl4FH8pKZa8sAvrO7R_-1ypKBXpi3cI&_nc_ht=scontent.fdad3-1.fna&oh=82bddc50eea6c8c2b4f771d406b17cc9&oe=5DAEB553"
              />
            </ButtonAvt>
          </Grid>
          <Grid item xs={6} container justify="center">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h2 variant="subtitle1">
                  Nguyen Thanh Dung
                </h2>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>ID:</b> 1030114
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Email:</b> 1004nguyendung@gmail.com
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Phone:</b>0898162560
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Ngày Sinh:</b> 2019-07-18
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b> Chức vụ: </b> Học viên
                </StyleTheP>
                <StyleTheP variant="body1" color="textSecondary">
                  <b>Address:</b> hau Hoa Tuyen Hoa Quang Binh
                </StyleTheP>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BoxCard>
    );
  }
}
