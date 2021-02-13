import React, { useState } from 'react';
import '../style/login.css'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    col: {
        color: 'white'
    }
  },
}));

export default function Sidelayout() {
    const classes = useStyles();
    return (
        <div className="lpage_Sidelayout">
            <div className="lpage_linkedin">
                <Typography className={classes.root}>
                    <i class="fa fa-linkedin"></i>
                    <Link href="https://www.linkedin.com/in/houssem-adouni" color='inherit'>
                        Rejoignez moi sur linkedin 
                    </Link>
                </Typography>
            </div>
        </div>
    );
}