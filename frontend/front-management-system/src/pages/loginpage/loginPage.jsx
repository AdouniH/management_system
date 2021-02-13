import React, {useEffect, useState} from 'react';
import LoginForm from './layouts/loginForm.jsx'
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Sidelayout from './layouts/loginside.jsx'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function LoginPage() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    
                    <Hidden only="xs">
                        <Grid item xs={12} sm={8}>
                            <Sidelayout/>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={4}>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </div>
         </div>
        
    )
}


export {LoginPage};
