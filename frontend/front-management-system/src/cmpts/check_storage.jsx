import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection, disconnect} from '../redux'
import {useHistory} from "react-router-dom";


function CheckLocalStorage(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/userdata_from_token/', {token: localStorage.getItem('token')})
            .then(function (response){
            })
            .catch(function (error){
                dispatch(disconnect())
                history.push("/LoginPage");
            })
    });
    return <div></div>
}

export default CheckLocalStorage;
