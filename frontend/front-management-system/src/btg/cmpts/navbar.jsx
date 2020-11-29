import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style/navbar.css'

function Navbar(props) {
  let history = useHistory();
  return (
    <div className="reg_nav_all">
        <a href="/btg"><div className="reg_nav_links">Registre</div></a>
        <Link to="/btg/to/creation"><div className="reg_nav_links">Creation</div></Link>
    </div>
  );
}


export default Navbar;
