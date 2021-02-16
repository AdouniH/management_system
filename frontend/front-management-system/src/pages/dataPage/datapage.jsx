import React, { useState } from 'react';
import NavBar from './layouts/navbar.jsx'
import DataLayout from './layouts/datalayout.jsx'


function DataPage() {

  return (
    <div>
      <NavBar/>
      <DataLayout/>
    </div>
  );
}

export {DataPage};
