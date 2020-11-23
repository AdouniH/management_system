import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from '../redux'
import {useHistory} from "react-router-dom";
import logologin from './style/statics/login.jpg'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'


function Error(props) {
    return (
        <div className="tempo1">
            <p>Saisissez un code valide</p>
        </div>
    )
}

function Loading(props) {
    return (
        <div className="tempo2">
            <p>Loading...</p>
        </div>
    )
}


function LoginPage() {
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
        alert(REACT_APP_BACKEND_URL + 'auth/')

        axios.post(REACT_APP_BACKEND_URL + 'auth/', {code: code})
            .then(function (response) {
                dispatch(connect(response.data.token, response.data.userdata));
                localStorage.setItem('token', response.data.token);
                setPageisLoading(false);
                history.push("/Calendar");
            })
            .catch(function (error) {
                alert("yes here")
                setError('erreur');
                setPageisLoading(false);
            })
    }

    function handleChange(event){
        setError(null);
        setCode(event.target.value);
    }

    var tempcomp

    if(error && !pageisLoading){
        tempcomp = <Error/>
    }

    if(pageisLoading){
        tempcomp = <Loading/>
    }
    if (!loader){
        return (
            <div className="body">
                <div className="logwindow">
                         <form className="formLog" onSubmit={login}>
                             <label className="labelLog" for="code">Veuillez saisir votre code</label>
                             <img className='limg' src={logologin}/>
                             <input className="txtLog" autocomplete="off" name="code" type='text' value={code} onChange={handleChange}/>
                             <input className="buttonLog" type='submit' value='Login'/>
                             {tempcomp}
                         </form>
                 </div>
            </div>
        )
    }
    else{return(<Loading/>)}
}


export default LoginPage;
