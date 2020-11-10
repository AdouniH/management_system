import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NavBar from './navbar.jsx'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';


function Teams(props) {
  useEffect(() => {
    axios.get('http://localhost:8000/calendar/team')
        .then(function (response) {
            props.setLink(response.data.link)
        })
        .catch(function (error) {
        })
  }, [])

  return (
      <div>
          <h4>TEAMS</h4>
          <input type='text' value={props.link}/>
          <CopyToClipboard text={props.link}
              onCopy={() => console.log("copied")}>
              <button>COPY</button>
          </CopyToClipboard>
      </div>
  );
}

function Skype() {
  return (
      <div>
          <h4>SKYPE</h4>
          <input type='text' value='adounih@skype.fr'/>
          <CopyToClipboard text='adounih@skype.fr'
              onCopy={() => console.log("copied")}>
              <button>COPY</button>
          </CopyToClipboard>
      </div>
  );
}

function Phone() {
  return (
      <div>
      <h4>PHONE</h4>
      <input type='text' value='0758553568'/>
      <CopyToClipboard text='0758553568'
          onCopy={() => console.log("copied")}>
          <button>COPY</button>
      </CopyToClipboard>
      </div>
  );
}


export default function ShotPicker(props) {
  const history = useHistory();
  let {id} = useParams()
  const token = useSelector(state => state.auth.token);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [duree, setDuree] = useState('15');
  const [toolvalue, setToolValue] = useState('teams');
  const [link, setLink] = useState(null);
  const [tarea, setTarea] = useState('hello');


  const toolChanged = (event) => {
      setToolValue(event.target.value);
  }

  const SubmitForm = (event) => {
      event.preventDefault();
      console.log(username);
      console.log(email);
      console.log(duree);
      console.log(toolvalue);
      console.log(id)
      console.log(tarea)
      console.log(link)
  }

  useEffect(() => {
      axios.post('http://localhost:8000/auth/userdata_from_token/', {token: token})
          .then(function (response) {
              setUsername(response.data.userdata.username)
              setEmail(response.data.userdata.email)
          })
          .catch(function (error) {
          })
  }, [])

  var tool;
  if (toolvalue === 'teams'){
      tool = <Teams link={link} setLink={setLink}/>
  }
  else if (toolvalue === 'skype'){
      tool = <Skype />;
  }
  else if (toolvalue === 'phone'){
      tool = <Phone />;
  }

  return (
      <div>
          <NavBar/>
          <p>{id}</p>
          <p>{username}</p>
          <p>{email}</p>
          <p>{duree}</p>
          <button onClick={() => {history.push('/calendar')}}> Back </button>

          <form onSubmit={SubmitForm}>
              <h1>Hello username : {username} email : {email}</h1>
              <p>Votre Nom</p>
              <input
                type='text'
                name='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <p>Votre Email</p>
              <input
                type='text'
                name='age'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br/>
              <p>duree</p>
              <select onChange={(event) => {setDuree(event.target.value)}}>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
              </select>
              <br/>
              <p>Choisir outil </p>
              <select onChange={toolChanged}>
                  <option value="teams">Teams</option>
                  <option value="skype">Skype</option>
                  <option value="phone">Phone</option>
              </select>

              {tool}

              <p> Comment (facultatif)</p>
              <textarea
                  id="comment"
                  name="comment"
                  value={tarea}
                  onChange={(event) => {setTarea(event.target.value)}}>
              </textarea>
              <br/>
              <input type='submit' value='yes'/>
          </form>
      </div>
  );
}
