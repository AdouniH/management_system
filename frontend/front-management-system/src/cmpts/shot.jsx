import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NavBar from './navbar.jsx'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './style/shot.css'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'
import load from './style/load.gif'


function Teams(props) {
  const [linkexist, setLinkexist] = useState(false)
  useEffect(() => {
    axios.get(REACT_APP_BACKEND_URL + 'calendar/team')
        .then(function (response) {
            props.setLink(response.data.link);
            if (response.data.link){
                setLinkexist(true);
            }

        })
        .catch(function (error) {
            setLinkexist(false);
        })
    return () => { props.setLink(null)}
  }, [])

  return (
      <div>
          <p className="info">
              En confirmant la réunion vous recevez un mail de confirmation
              avec le lien de la reunion TEAMS
          </p>
      </div>
  );
}

function Skype() {

  return (
      <div>
          <p className="info">
              En confirmant la réunion vous recevez un mail de confirmation
              avec le lien de la reunion SKYPE
          </p>
      </div>
  );
}

function Phone() {
  return (
      <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

      <p className="infophone">En confirmant la réunion vous recevez un mail contenant mon numéro de télephone</p>
      <div className="center">
          <input className='phone' type='text' value='0758553568'/>
          <CopyToClipboard text='0758553568'
              onCopy={() => console.log("copied")}>
              <button class="btn" type="button"><i class="fa fa-copy"></i></button>
          </CopyToClipboard>
      </div>
      </div>
  );
}


export default function ShotPicker(props) {
  const history = useHistory();
  let {id} = useParams()
  const token = useSelector(state => state.auth.token);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [duree, setDuree] = useState('30');
  const [toolvalue, setToolValue] = useState('teams');
  const [link, setLink] = useState(null);
  const [tarea, setTarea] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);


  const toolChanged = (event) => {
      setToolValue(event.target.value);
  }

  const SubmitForm = (event) => {
      event.preventDefault();
      setSubmitLoading(true);
      var context = {
          name: name,
          email: email,
          duree: duree,
          tool: toolvalue,
          crenau: id,
          comment: tarea
      }
      axios.post(REACT_APP_BACKEND_URL + 'calendar/rdv', context)
          .then(function (response) {
              console.log(response.data);
              setSubmitLoading(false);
              history.push("/formsucess");
          })
          .catch(function (error) {
              console.log(error.response.data);
              setSubmitLoading(false);
              history.push("/formfail");
          })
  }

  useEffect(() => {
      setInitLoading(true);
      axios.post(REACT_APP_BACKEND_URL + 'auth/userdata_from_token/', {token: token})
          .then(function (response) {
              setName(response.data.name);
              setEmail(response.data.email);
          })
          .catch(function (error) {
          })

      axios.get(REACT_APP_BACKEND_URL + 'calendar/'+ id.toString())
          .then(function (response) {
              setDate(response.data.date);
              setHour(response.data.hour);
              setInitLoading(false);
          })
          .catch(function (error) {
              setInitLoading(false);
              history.push("/Calendar");
          })
  }, [])

  var tool;
  if (toolvalue === 'teams'){
      tool = <Teams link={link} setLink={setLink}/>
  }
  else if (toolvalue === 'skype'){
      tool = <Skype/>;
  }
  else if (toolvalue === 'phone'){
      tool = <Phone/>;
  }

  return (
      <div className="all">
          <NavBar/>
          <form className="forma" onSubmit={SubmitForm}>

              {initLoading
                                    ?
                  <img className="loadimg" src={load}></img>
                                    :
                  <div className='title'>
                      <h4> Veuillez confirmer cet entretien du </h4>
                      <h4> {date} à {hour}</h4>
                  </div>
              }
              <div className='rowform'>
                  <p>Votre Nom</p>
                  <input className='finput'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
              </div>
              <div className='rowform'>
                  <p>Votre Email</p>
                  <input className='finput'
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
              </div>
              <br/>
              <div className='rowform'>
                  <p>Durée de l'entretien</p>
                  <select onChange={(event) => {setDuree(event.target.value)}}>
                      <option value="15">15 minutes</option>
                      <option value="30" selected>30 minutes</option>
                      <option value="60">1 heure</option>
                  </select>
              </div>
              <br/>
              <div className='rowform'>
                  <p>Entretien via:</p>
                  <select onChange={toolChanged}>
                      <option value="teams">Microsoft Teams</option>
                      <option value="skype">Skype</option>
                      <option value="phone">Appel télephonique</option>
                  </select>
              </div>
              <div className='rowform'>
                  {tool}
              </div>
              <div className='rowform'>
                  <p> Commentaire (facultatif)</p>
                  <textarea
                      id="comment"
                      name="comment"
                      value={tarea}
                      onChange={(event) => {setTarea(event.target.value)}}>
                  </textarea>
              </div>
              <br/>
              <div className='rowforma'>
                  {submitLoading ? <img className="loadimg" src={load}></img> : null}
                  <input className='submitf' type='submit' value='confirmer votre rendez vous'/>
                  {submitLoading ? <img className="loadimg" src={load}></img> : null}
              </div>

          </form>
      </div>
  );
}
