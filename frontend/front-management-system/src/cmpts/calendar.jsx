import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import CheckLocalStorage from './check_storage.jsx'
import NavBar from './navbar.jsx'
import {useHistory} from "react-router-dom";
import './style/calendar.css';
import {REACT_APP_BACKEND_URL} from '../config_urls.js'


function Shot(props) {
  const history = useHistory();

  return (
      <div className='shot' onClick={() => history.push('/Shot/' + props.id)}>
          {props.time}
      </div>
  );
}



export default function Calendar() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
    axios.get(REACT_APP_BACKEND_URL + 'calendar/')
        .then(function (response) {
            setData(response.data);
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);
        })

  }, []);

  return (
      <div>
          <CheckLocalStorage/>
          <NavBar/>

          <div className='main'>

              <table className='cal_table'>
                  {loading ? <p> loading ... </p> : null}
                  {data.map((day) =>
                    <tr className='trdiv cal_tr'>
                          <th className='cal_th'>{day.date.toString()}</th>
                          <div className="wrapper">
                          {day.times.map((time) =>
                              <td className='cal_td'><Shot id={time[0]} time={time[1]} /></td>)}
                          </div>

                    </tr>)}
                    {data.length == 0 && !loading? <p>Il n'existe plus de plage horaire libre. Veuillez recommencer ultérieurement. </p>: null}
              </table>

          </div>
      </div>
  );
}
