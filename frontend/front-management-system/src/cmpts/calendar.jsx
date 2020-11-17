import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import CheckLocalStorage from './check_storage.jsx'
import NavBar from './navbar.jsx'
import {useHistory} from "react-router-dom";
import './style/calendar.css';


function Shot(props) {
  const history = useHistory();

  return (
      <div className='shot' onClick={() => history.push('/Shot/' + props.id)}>
          {props.time}
      </div>
  );
}



export default function Calendar() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + 'calendar/')
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {

        })

  }, []);

  return (
      <div>
          <CheckLocalStorage/>
          <NavBar/>

          <div className='main'>
          <table>
              {data.map((day) =>
                <tr className='trdiv'>
                      <th>{day.date.toString()}</th>
                      <div className="wrapper">
                      {day.times.map((time) =>
                          <td><Shot id={time[0]} time={time[1]} /></td>)}
                      </div>

                </tr>)}
          </table>
          </div>
      </div>
  );
}
