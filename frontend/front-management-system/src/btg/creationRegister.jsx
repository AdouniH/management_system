import React, { useState, useEffect} from 'react';
import Navbar from './cmpts/navbar.jsx'
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'


function RegisterCreation(props) {
  let {ntf} = useParams();
  const {history} = useHistory();
  const [data, setData] = useState({
      ntf: null,
      serie: null,
      lp: null,
      plle: null,
      brne: null,
      obs: null
  })

  useEffect(() => {
  }, []);

  const FormSubmit = (event) => {
      event.preventDefault();
      axios.post(REACT_APP_BACKEND_URL + 'btg/creation/', data)
         .then(res => {
            console.log(res.data);
            props.history.push('/btg/' + res.data.ntf);
         })
         .catch(function (error) {
             alert("nok");
         })
  }

  return (
    <div>
      <Navbar/>
      {ntf}
      <form onSubmit={FormSubmit}>
          <label>Numero TF:</label>
          <input onChange={(event) => {setData({...data, ntf:event.target.value})}} type="text" value={data.ntf}></input><br/>
          <label>Serie:</label>
          <input onChange={(event) => {setData({...data, serie:event.target.value})}} type="text" value={data.serie}></input><br/>
          <label>Dernier N de LP affecté:</label>
          <input onChange={(event) => {setData({...data, lp:event.target.value})}} type="text" value={data.lp}></input><br/>
          <label>Dernier N de Plle affecté:</label>
          <input onChange={(event) => {setData({...data, plle:event.target.value})}} type="text" value={data.plle}></input><br/>
          <label>Dernier N de brne affecté:</label>
          <input onChange={(event) => {setData({...data, brne:event.target.value})}} type="text" value={data.brne}></input><br/>
          <label>Observations:</label>
          <input onChange={(event) => {setData({...data, obs:event.target.value})}} type="text" value={data.obs}></input><br/>

          <button> Enregistrer </button>


      </form>
    </div>
  );
}

export default RegisterCreation;
