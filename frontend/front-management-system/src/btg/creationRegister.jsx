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
            props.history.push('/validation/btg/' + res.data.ntf);
         })
         .catch(function (error) {

             alert("Numero TF doit etre un entier unique");
         })
  }

  return (
    <div>
      <Navbar/>
      <div className="detail_all">
          <form onSubmit={FormSubmit}>
              <div className="detail_row">
                  <label>Numero TF:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, ntf:event.target.value})}} type="text" value={data.ntf}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Serie:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, serie:event.target.value})}} type="text" value={data.serie}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Dernier N de LP affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, lp:event.target.value})}} type="text" value={data.lp}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Dernier N de Plle affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, plle:event.target.value})}} type="text" value={data.plle}></input><br/>
                  </div>
              </div>
              <div className="detail_row">
                  <label>Dernier N de brne affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, brne:event.target.value})}} type="text" value={data.brne}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Observations:</label>
                  <div>
                      <textarea className="detail_txt"  onChange={(event) => {setData({...data, obs:event.target.value})}} type="text" value={data.obs}></textarea><br/>
                  </div>
              </div>
              <div className="detail_buttonse">
                  <button className="a"> Enregistrer </button>
                  <button className="d" type="button" onClick={() => {props.history.push("/btg")}}> Annuler </button>
              </div>
          </form>
      </div>
    </div>
  );
}

export default RegisterCreation;
