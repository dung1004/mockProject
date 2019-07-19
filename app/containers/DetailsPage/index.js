/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Section from '../../components/Section';
import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import BoxCard from './BoxCard';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 500,
//   },
//   image: {
//     width: 128,
//     height: 128,
//   },
//   img: {
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
// }));

export default class index extends Component {
  render() {
    return (
      <Section>
        <BoxCard>
          <Grid container spacing={2} xs={12}>
            <Grid item>
              <ButtonAvt>
                <StyleAvt
                  alt="complex"
                  // src="http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg"
                  src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/66511901_352607552306976_236412562093113344_n.jpg?_nc_cat=102&_nc_oc=AQn5U983Zeo7Fu4uLzQVya4NOXzWdL5NVglwKl4FH8pKZa8sAvrO7R_-1ypKBXpi3cI&_nc_ht=scontent.fdad3-1.fna&oh=82bddc50eea6c8c2b4f771d406b17cc9&oe=5DAEB553"
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={8} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 gutterBottom variant="subtitle1">
                    Nguyen Thanh Dung
                  </h2>
                  <Typography variant="body1" color="textSecondary">
                    ID: 1030114
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Email: 1004nguyendung@gmail.com
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Phone: 0898162560
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Address: Chau Hoa Tuyen Hoa Quang Binh
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BoxCard>
      </Section>
    );
  }
}
