import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from '../../../redux'
import {useHistory} from "react-router-dom";
import {REACT_APP_BACKEND_URL} from '../../../config_urls.js'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../style/login.css';


const useStyles = makeStyles({
    root: {
      height: 38,
      marginTop: '15px',
      width: '100%'
    },
    progress: {
        width: "100%",
    },
    input_code: {
        width: '100%',
        margin: 'auto'
    }
  });

export default function LoginForm() {
        const classes = useStyles();
        const dispatch = useDispatch();
        var connected = useSelector(state => state.auth.connected);
        var loader = useSelector(state => state.auth.loading);

        const [code, setCode] = useState("");
        const [error, setError] = useState("");
        const [pageisLoading, setPageisLoading] = useState(false);

        let history = useHistory();

        useEffect(() => {
            if (connected){
                history.push('/Calendar')
            };
        },);

        function login(event){
            event.preventDefault();
            setPageisLoading(true);
    
            axios.post(REACT_APP_BACKEND_URL + 'auth/', {code: code})
                .then(function (response) {
                    dispatch(connect(response.data.token, response.data.userdata));
                    localStorage.setItem('token', response.data.token);
                    setPageisLoading(false);
                    history.push("/" + response.data.route);
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

  return (
      <div className='lpage_formLogContainer'>
        <div className="lpage_mid">
            <div className="lpage_prog"> 
                {pageisLoading ?    <LinearProgress className={classes.progress} /> : null}
            </div>
            <div><p className="lpage_p"> Veuillez entrer votre code de redirection </p></div>

            
            <form className="formLog" onSubmit={login}>
                    <TextField
                            className={classes.input_code}
                            error={error && !pageisLoading}
                            id="outlined-search"
                            label={error && !pageisLoading ? "Saisissez un code valide": "Votre code"}
                            type="search"
                            variant="outlined"
                            value={code}
                            onChange={handleChange}
                            size="small"
                    />
                    <Button 
                            className={classes.root} 
                            variant="contained" 
                            color="primary" 
                            type='submit'
                    >
                        Valider
                    </Button>

                </form>
                
            </div>
      </div>
  );
}