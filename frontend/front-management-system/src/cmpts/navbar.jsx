import React from "react";

import { useSelector, useDispatch} from 'react-redux'
import {disconnect} from '../redux'
import './style/navbar.css';

function NavBar() {
  const dispatch = useDispatch();

  const clicked = () => {
      dispatch(disconnect());
      localStorage.removeItem('token')
  }

  return (
    <div className="bar">
        <ul className="deconnexion">
            <li><div className="dcnx" onClick={clicked}>Se deconnecter</div></li>
        </ul>
    </div>
  )
}

export default NavBar
