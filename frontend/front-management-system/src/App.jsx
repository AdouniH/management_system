import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connect, checkConnection } from './redux'
import Routing from './routing'


function App() {

  var token = useSelector(state => state.auth.token)
  var userdata = useSelector(state => state.auth.userdata)
  var connected = useSelector(state => state.auth.connected)
  var loading = useSelector(state => state.auth.loading)
  const [userdatas, setUserdatas] = useState(userdata)

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(checkConnection());
  }, []);

  return (
    <div className="App">
        <Routing/>
    </div>
  );
}

export default App;
