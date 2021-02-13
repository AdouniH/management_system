import React, {useEffect, useState} from 'react';

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection, disconnect} from '../redux'
import {useHistory} from "react-router-dom";
import {REACT_APP_BACKEND_URL} from '../config_urls.js'

function CheckLocalStorage(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        axios.post(REACT_APP_BACKEND_URL + 'auth/userdata_from_token/', {token: localStorage.getItem('token')})
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
