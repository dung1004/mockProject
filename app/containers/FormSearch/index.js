import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Section from '../../components/Section';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  rootInput: {
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
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 15,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    search: '',
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Section className={classes.root}>
      {console.log(state)}
      <Paper className={classes.rootInput}>
        <InputBase
          className={classes.input}
          placeholder="Search ..."
          name="search"
          inputProps={{ 'aria-label': 'search ...' }}
          value={state.search}
          onChange={handleChange}
        />
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="item-native-simple">Item</InputLabel>
        <Select native value={state} onChange={handleChange} name="item">
          <option value="" />
          <option value="staff">Nhân viên</option>
          <option value="teacher">Giáo viên</option>
          <option value="student">Học viên</option>
          <option value="class">Lớp học</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="item-native-simple">{state.item}</InputLabel>
        <Select native value={state} onChange={handleChange} name={state.item}>
          <option value="" />
        </Select>
      </FormControl>
    </Section>
  );
}
