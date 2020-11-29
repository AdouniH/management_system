import React, { useState, useEffect } from 'react';
import './style/register.css'
import {REACT_APP_BACKEND_URL} from '../../config_urls.js'
import axios from 'axios'
import { useHistory } from "react-router-dom";


function Row(props){
  let history = useHistory();
  return (
      <tr onClick={() => {history.push("/btg/" + props.ntf);}} className="reg_tr clickable">
          {props.data.map((subentity) => <td>{subentity}</td>)}
      </tr>
  );
}


function Register() {
  const [tf, setTf] = useState(null);
  const [data, setData] = useState({
      header: [
        'Numero TF',
        'Serie',
        'Dernier N de LP affecté',
        'Dernier N de Plle affecté',
        'Dernier N de brne affecté',
        'Observations'
      ],
      body: []
  })

   useEffect(() => {
     axios.get(REACT_APP_BACKEND_URL + 'btg')
        .then(res => {
           setData({...data, body:res.data});
        })
        .catch(function (error) {
        })
   }, []);

  const refresh = () => {
    setTf("");
    axios.get(REACT_APP_BACKEND_URL + 'btg')
       .then(res => {
          setData({...data, body:res.data});
       })
       .catch(function (error) {
       })
  }

  const submitForm = (event) => {
      event.preventDefault();
      if (tf){
        axios.post(REACT_APP_BACKEND_URL + 'btg/', {ntf: tf})
           .then(res => {
              setData({...data, body:res.data});
           })
           .catch(function (error) {
           })
      }
      else{
        axios.get(REACT_APP_BACKEND_URL + 'btg')
           .then(res => {
              setData({...data, body:res.data});
           })
           .catch(function (error) {
           })
      }

  }

  return (
    <div>
      <h1>{tf}</h1>
      <form className="reg_form">
              <input
                className="reg_in"
                type='number'
                value={tf}
                onChange={(event) => {setTf(event.target.value)}}
              />
              <input
                className="reg_button"
                type='submit'
                value='Chercher'
                onClick={submitForm}
              />
              <button type="button" onClick={() => {refresh()}}>refresh</button>
      </form>
      <table className="reg_table">
              <tr className="reg_tr">
                  {data.header.map((entity) => <th>{entity}</th>)}
              </tr>
              {data.body.map((entity) => <Row data={entity} ntf={entity[0]}/>)}
      </table>
    </div>
  );
}

export default Register;
