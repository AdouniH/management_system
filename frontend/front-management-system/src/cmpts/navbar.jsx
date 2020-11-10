import React from "react";

import { useSelector, useDispatch} from 'react-redux'
import {disconnect} from '../redux'
import './style/navbar.css';
import {useHistory} from "react-router-dom";

function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch();

  const clicked = () => {
      dispatch(disconnect());
      localStorage.removeItem('token')
  }

  const calendarclicked = () => {
      history.push('/calendar')
  }

  return (
    <div className="bar">
        <ul className="deconnexion">
            <li><div className="dcnx" onClick={clicked}>Se deconnecter</div></li>
            <li><div className="calendar" onClick={calendarclicked}>Calendar</div></li>
        </ul>
    </div>
  )
}

export default NavBar
