/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link, Redirect } from 'react-router-dom';

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [value, setValues] = React.useState(false);
  // function redireactLogin() {
  //   setValues(true);
  // }
  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }
  // const renderRedirect = () => {
  //   if (value === true) {
  //     localStorage.removeItem('token');
  //     return <Redirect to="/" />;
  //   }
  // };
  return (
    <React.Fragment>
      {/* {value === true ? renderRedirect() : null} */}
      <Button
        aria-controls="menu-list-grow"
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Icon>account_circle</Icon>
      </Button>
      <Popper
        style={{ zIndex: 9, position: 'absolute', right: '95px', top: '55px' }}
        open={open}
        keepMounted
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              {/* <ClickAwayListener> */}
              <MenuList>
                <MenuItem>
                  <Link to="/info/2">My account</Link>
                </MenuItem>
                <MenuItem>
                  <Button>Logout</Button>
                </MenuItem>
              </MenuList>
              {/* </ClickAwayListener> */}
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
