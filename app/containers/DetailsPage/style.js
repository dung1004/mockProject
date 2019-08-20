import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: 'black!important',
  },
  textFieldSelect: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 200,
  },
  button: {
    backgroundColor: '#3939af',
    margin: 10,
  },
  divBtn: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  buttonUp: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 10,
    color: 'black',
    border: '1px solid blue',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.38)',
    },
  },
  labelUp: {
    display: 'flex',
  },
  boxInfo: {
    marginBottom: 50,
    marginRight: 0,
  },
  titleH2: {
    paddingLeft: 100,
    fontSize: 27,
  },
  loadTitle: {
    paddingLeft: 200,
  },
}));
