import {CONNECT, DISCONNECT, LOAD} from './authTypes'
import axios from 'axios'


export const checkConnection = () => {
  return (dispatch) => {
      var token = localStorage.getItem('token');
      dispatch(load());
      axios.post('http://localhost:8000/auth/userdata_from_token/', {token: token})
        .then(response => {
            dispatch(connect(token, response.data.userdata))
        })
        .catch(error => {
            dispatch(disconnect())
      })
  }
}


export const connect = (token, userdata) => {
  return {
      type: CONNECT,
      token: token,
      userdata: userdata
  }
}

export const disconnect = () => {
  return {
      type: DISCONNECT,
  }
}

export const load = () => {
  return {
      type: LOAD,
  }
}
