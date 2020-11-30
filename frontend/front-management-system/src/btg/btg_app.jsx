import React, { useState } from 'react';
import Navbar from './cmpts/navbar.jsx'
import Register from './cmpts/register.jsx'


function Btg(props) {
  return (
    <div>
      <Navbar/>
      <Register validation={props.validation}/>
    </div>
  );
}

export default Btg;
