
import React, {useEffect} from "react";
import NavBar from './navbar.jsx'


export default function FormSucess(props) {

  return (
      <div>
          <NavBar/>
          <h1>Success</h1>
      </div>
  );
}

export function FormFail(props) {

  return (
      <div>
          <NavBar/>
          <h1>FAIL</h1>
      </div>
  );
}
