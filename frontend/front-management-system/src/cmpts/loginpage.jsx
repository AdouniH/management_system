import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from '../redux'
import {useHistory} from "react-router-dom";
import logologin from './style/statics/login.jpg'

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

        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/', {code: code})
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

    var tempcomp
    if(error && !pageisLoading){
        tempcomp = <Error/>
    }

    if(pageisLoading){
        tempcomp = <Loading/>
    }

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


export default LoginPage;
