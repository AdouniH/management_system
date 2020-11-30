import React, { useState, useEffect } from 'react';
import './style/register.css'
import {REACT_APP_BACKEND_URL} from '../../config_urls.js'
import axios from 'axios'
import { useHistory } from "react-router-dom";


function Row(props){
  let history = useHistory();
  return (
      <tr className="reg_tr" onClick={() => {history.push("/btg/" + props.ntf);}} className="reg_tr clickable">
          {props.data.map((subentity) => <td className="reg_td"><div className="op">{subentity}</div></td>)}
      </tr>
  );
}


function Register() {
  const [tf, setTf] = useState(null);
  const [loading, setLoading] = useState(false);
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
     setLoading(true)
     axios.get(REACT_APP_BACKEND_URL + 'btg')
        .then(res => {
           setLoading(false)
           setData({...data, body:res.data});
        })
        .catch(function (error) {
          setLoading(false)
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
      setLoading(true)
      if (tf){
        axios.post(REACT_APP_BACKEND_URL + 'btg/', {ntf: tf})
           .then(res => {
              setData({...data, body:res.data});
              setLoading(false)
           })
           .catch(function (error) {
              setData({...data, body:[]});
              setLoading(false)
           })
      }
      else{
        axios.get(REACT_APP_BACKEND_URL + 'btg')
           .then(res => {
              setData({...data, body:res.data});
              setLoading(false)
           })
           .catch(function (error) {
               setLoading(false)
           })
      }
  }

  return (
    <div>
      <form className="reg_form">
              <button className="reg_button_refresh" type="button" onClick={refresh}>rafraichir</button>
              <input
                className="reg_in"
                type='text'
                placeholder="Chercher"
                value={tf}
                onChange={(event) => {setTf(event.target.value)}}
              />
              <input
                className="reg_button"
                type='submit'
                value='Chercher'
                onClick={submitForm}
              />
      </form>
          <div className="reg_loading">
              {loading ? "Loading ..."  : null}
          </div>
      <div className="reg_table_div">
          <table className="reg_table">
                  <tr className="reg_tr">
                      {data.header.map((entity) => <th className="reg_th">{entity}</th>)}
                  </tr>
                  {data.body.map((entity) => <Row data={entity} ntf={entity[0]}/>)}
          </table>
      </div>
    </div>
  );
}

export default Register;
