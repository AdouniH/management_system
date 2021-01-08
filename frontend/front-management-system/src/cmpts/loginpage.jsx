import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from '../redux'
import {useHistory} from "react-router-dom";
import logologin from './style/statics/login.jpg'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import bienvenue from './style/statics/bienvenue.png'
import LinearProgress from '@material-ui/core/LinearProgress';


function Loading(props) {
    return (
        <div className="tempo2">
            <p>Loading...</p>
        </div>
    )
}

const useStyles = makeStyles({
  root: {
    height: 38,
    marginTop: '15px'
  },
  progress: {
    marginTop: 10
  }
});


function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    var connected = useSelector(state => state.auth.connected);
    var loader = useSelector(state => state.auth.loading);

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [pageisLoading, setPageisLoading] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if (connected){history.push('/Calendar')};
    },);

    function login(event){
        event.preventDefault();
        setPageisLoading(true);

        axios.post(REACT_APP_BACKEND_URL + 'auth/', {code: code})
            .then(function (response) {
                dispatch(connect(response.data.token, response.data.userdata));
                localStorage.setItem('token', response.data.token);
                setPageisLoading(false);
                history.push("/Calendar");
            })
            .catch(function (error) {
                setError('erreur');
                setPageisLoading(false);
            })
    }

    function handleChange(event){
        setError(null);
        setCode(event.target.value);
    }

    if (!loader){
        return (
            <div className="body">
              <div className="logwindow">
                 <form className="formLog" onSubmit={login}>
                    <img className="t" src={bienvenue} alt="bienvenue" />
                    <TextField
                         error={error && !pageisLoading}
                         id="outlined-search"
                         label={error && !pageisLoading ? "Saisissez un code valide": "Votre code"}
                         type="search"
                         variant="outlined"
                         value={code}
                         onChange={handleChange}
                         size="small"
                     />
                     <Button className={classes.root} variant="contained" color="primary" type='submit'>
                        Login
                     </Button>
                     <div className='h'>
                        {pageisLoading ?    <LinearProgress className={classes.progress} /> : null}
                     </div>
                 </form>
               </div>
            </div>
        )
    }
    else{return(<Loading/>)}
}

export default LoginPage;
