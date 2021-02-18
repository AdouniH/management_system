import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../style/data.css'
import { useDispatch } from 'react-redux'
import { disconnect } from '../../../redux'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="tbar">
          <Button color="inherit" onClick={() => {dispatch(disconnect())}}>Se déconnecter</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default NavBar;
