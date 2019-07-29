import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Box component="span" m={5}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
