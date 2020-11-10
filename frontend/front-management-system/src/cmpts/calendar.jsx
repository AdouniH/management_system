import React, {useEffect, useState} from 'react';
import './style/login.css';
import axios from 'axios'
import CheckLocalStorage from './check_storage.jsx'
import NavBar from './navbar.jsx'
import {useHistory} from "react-router-dom";


function Shot(props) {
  const history = useHistory();


  return (
      <div onClick={() => history.push('/Shot/' + props.id)}>
          {props.id} {props.time}
      </div>
  );
}



export default function Calendar() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/calendar/')
        .then(function (response) {
            setData(response.data)
        })
        .catch(function (error) {

        })

  }, []);

  return (
      <div>
          <CheckLocalStorage/>
          <NavBar/>
          <h1> Calendar </h1>
          <div>
          <table>
              {data.map((day) =>
                <tr>
                      <th>{day.date.toString()}</th>
                      {day.times.map((time) =>
                          <td><Shot id={time[0]} time={time[1]}/></td>)}

                </tr>)}
          </table>
          </div>
      </div>
  );
}
