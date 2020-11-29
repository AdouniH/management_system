import React, { useState, useEffect} from 'react';
import Navbar from './cmpts/navbar.jsx'
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'


function RegisterDetail(props) {
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
    axios.get(REACT_APP_BACKEND_URL + 'btg/' + ntf)
       .then(res => {
          setData(res.data);
          console.log(res.data);
       })
       .catch(function (error) {
       })
  }, []);

  const FormSubmit = (event) => {

      event.preventDefault();
      axios.put(REACT_APP_BACKEND_URL + 'btg/' + ntf +'/', data)
         .then(res => {
            setData({...data, ntf: res.data.ntf})
            props.history.push('/btg/' + res.data.ntf.toString() +'/');
         })
         .catch(function (error) {
             alert("nok");
         })
  }

  const deleteRegister = () => {
      axios.delete(REACT_APP_BACKEND_URL + 'btg/' + ntf)
         .then(res => {
              props.history.push("/btg/")
         })
         .catch(function (error) {
         })
  }

  const finish = () => {
        props.history.push("/btg/")
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
          <button type="button" onClick={deleteRegister}> Supprimer </button>
          <button type="button" onClick={finish}> Partir </button>
      </form>
    </div>
  );
}

export default RegisterDetail;
