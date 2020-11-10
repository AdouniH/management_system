import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from '../redux'
import {useHistory} from "react-router-dom";


function Error(props) {
    return (
        <p>ERROR</p>
    )
}

function Loading(props) {
    return (
        <p>Loading</p>
    )
}


function LoginPage() {
    const dispatch = useDispatch();
    var connected = useSelector(state => state.auth.connected);

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [pageisLoading, setPageisLoading] = useState(false);

    let history = useHistory();


    useEffect(() => {
        if (connected){history.push('/Calendar')}
    },);

    function login(event){
        event.preventDefault();
        setPageisLoading(true);

        axios.post('http://localhost:8000/auth/', {code: code})
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
        setCode(event.target.value);
    }

    var error_cmpt
    if(error && !pageisLoading){
        error_cmpt = <Error/>
    }

    var loading_cmpt
    if(pageisLoading){
        loading_cmpt = <Loading/>
    }

    return (
        <div>
        <div className="logwindow">
             <div>
                 <form className="formLog" onSubmit={login}>
                     <label className="labelLog" for="code">Veuillez saisir votre code</label>
                     <input className="txtLog" name="code" type='text' value={code} onChange={handleChange}/>
                     <input className="buttonLog" type='submit' value='Login'/>
                     {error_cmpt}
                     {loading_cmpt}
                 </form>
             </div>
         </div>
        </div>
    )
}


export default LoginPage;
