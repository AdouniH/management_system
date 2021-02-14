import React, {useEffect, useState} from 'react';
import LoginForm from './layouts/loginForm.jsx'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Sidelayout from './layouts/loginside.jsx'
import {save_ip_address} from './utils/ip_functions.js'


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
    
    useEffect(() => {    
        save_ip_address();
    }, []);

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
