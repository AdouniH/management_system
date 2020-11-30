import React, { useState, useEffect} from 'react';
import Navbar from './cmpts/navbar.jsx'
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'
import './style/register_detail.css'
import vald from './style/vald.png'

function RegisterDetail(props) {
  let {ntf} = useParams();
  const history = useHistory();
  const [valid, setValid] = useState(props.validation)
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
            history.push('/validation/btg/' + res.data.ntf.toString() +'/');
            setValid(true)
         })
         .catch(function (error) {
             alert("Numero TF doit etre un entier unique");
         })
  }

  const deleteRegister = () => {
      axios.delete(REACT_APP_BACKEND_URL + 'btg/' + ntf)
         .then(res => {
              history.push("/btg/")
         })
         .catch(function (error) {
         })
  }

  const finish = () => {
        history.push("/btg/")
  }

  return (
    <div>
      <Navbar/>
      <div className="detail_all">
          <form className="detail_form" onSubmit={FormSubmit}>
              <div className="detail_row">
                  <label>Numero TF:</label>
                  <div>
                      <input className="in_row"onChange={(event) => {
                        setData({...data, ntf:event.target.value}); setValid(false)}} type="text" value={data.ntf}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Serie:</label>
                  <div>
                      <input onChange={(event) => {
                        setData({...data, serie:event.target.value});setValid(false)}} type="text" value={data.serie}></input><br/>
                  </div>
              </div>


              <div className="detail_row">
                  <label>Dernier N de LP affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, lp:event.target.value});setValid(false)}} type="text" value={data.lp}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Dernier N de Plle affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, plle:event.target.value});setValid(false)}} type="text" value={data.plle}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Dernier N de brne affecté:</label>
                  <div>
                      <input onChange={(event) => {setData({...data, brne:event.target.value});setValid(false)}} type="text" value={data.brne}></input><br/>
                  </div>
              </div>

              <div className="detail_row">
                  <label>Observations:</label>
                  <div>
                      <textarea className="detail_txt" onChange={(event) => {setData({...data, obs:event.target.value}); setValid(false)}} type="text" value={data.obs}></textarea><br/>
                  </div>
              </div>
              <div className="detail_row">
                  <button className="detail_btn a" > Enregistrer </button>
                  <button className="detail_btn b" type="button" onClick={deleteRegister}> Supprimer </button>
                  <button className="detail_btn c" type="button" onClick={finish}> Partir </button>
              </div>
              <div className="vld">
                  {valid ? <img className="vald" src={vald} alt="Logo" /> : null}
              </div>
          </form>
      </div>
    </div>
  );
}

export default RegisterDetail;
